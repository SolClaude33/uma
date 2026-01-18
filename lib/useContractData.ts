"use client";

import { useEffect, useState } from "react";
import { createPublicClient, http, formatEther, PublicClient, decodeEventLog } from "viem";
import { bsc } from "viem/chains";
import { FLAP_PORTAL_ADDRESS, FLAP_PORTAL_ABI, TOKEN_ADDRESS, DIVIDEND_ADDRESS, DIVIDEND_ABI, TAX_PROCESSOR_ADDRESS, TAX_PROCESSOR_ABI, TOKEN_ABI } from "./flapContract";

// BSC Mainnet - fixed chain
const CHAIN = bsc;

export interface DashboardData {
  totalFeesCollected: string;
  liquidityAdded: string;
  horsesHelped: string;
  isLoading: boolean;
  error: string | null;
}

export function useContractData(): DashboardData {
  const [data, setData] = useState<DashboardData>({
    totalFeesCollected: "0.00",
    liquidityAdded: "0.00",
    horsesHelped: "-",
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchContractData() {
      try {
        // Log para debugging
        console.log("🔍 Dashboard - Configuración:", {
          FLAP_PORTAL_ADDRESS,
          TOKEN_ADDRESS,
        });

        // Crear cliente público para leer del contrato (BSC Mainnet)
        const publicClient: PublicClient = createPublicClient({
          chain: CHAIN,
          transport: http(),
        });

        // Leer el estado del token desde el contrato Portal de Flap usando getTokenV7
        if (!FLAP_PORTAL_ADDRESS || FLAP_PORTAL_ADDRESS === "0x0000000000000000000000000000000000000000" ||
            !TOKEN_ADDRESS || TOKEN_ADDRESS === "0x0000000000000000000000000000000000000000") {
          console.warn("⚠️ Dashboard - Direcciones de contrato no configuradas");
          setData({
            totalFeesCollected: "0.00",
            liquidityAdded: "0.00",
            horsesHelped: "-",
            isLoading: false,
            error: "Direcciones de contrato no configuradas. Verifica NEXT_PUBLIC_CONTRACT_ADDRESS en Vercel.",
          });
          return;
        }

        console.log("📡 Dashboard - Leyendo datos del contrato Flap...");
        
        // Leer estado del token
        const tokenState = await publicClient.readContract({
          address: FLAP_PORTAL_ADDRESS as `0x${string}`,
          abi: FLAP_PORTAL_ABI,
          functionName: "getTokenV7",
          args: [TOKEN_ADDRESS as `0x${string}`],
        }) as any;

        const reserve = BigInt(tokenState.reserve?.toString() || "0");
        const pool = tokenState.pool || "0x0000000000000000000000000000000000000000";
        const taxRateBps = BigInt(tokenState.taxRate?.toString() || "300"); // 300 = 3%
        
        let liquidity = reserve || 0n;

        // Obtener dirección del TaxProcessor desde el token (automático)
        let taxProcessorAddress: string | null = null;
        try {
          taxProcessorAddress = await publicClient.readContract({
            address: TOKEN_ADDRESS as `0x${string}`,
            abi: TOKEN_ABI,
            functionName: "taxProcessor",
          }) as string;
          
          if (taxProcessorAddress && taxProcessorAddress !== "0x0000000000000000000000000000000000000000") {
            console.log(`🔗 Dashboard - TaxProcessor obtenido desde token: ${taxProcessorAddress}`);
          } else {
            console.log("⚠️ Dashboard - Token no tiene taxProcessor configurado");
            // Usar dirección de variable de entorno como fallback
            taxProcessorAddress = TAX_PROCESSOR_ADDRESS;
          }
        } catch (tokenError) {
          console.warn("⚠️ Dashboard - No se pudo leer taxProcessor desde token:", tokenError);
          // Usar dirección de variable de entorno como fallback
          taxProcessorAddress = TAX_PROCESSOR_ADDRESS;
        }

        // INTENTAR LEER DESDE CONTRATO TAX_PROCESSOR (más eficiente y preciso)
        if (taxProcessorAddress && taxProcessorAddress !== "0x0000000000000000000000000000000000000000") {
          try {
            console.log("💰 Dashboard - Intentando leer desde contrato TaxProcessor...");
            
            // Leer todos los totales acumulados del TaxProcessor
            const [totalLiquidityAdded, totalMarketingSent, pendingLiquidity, pendingMarketing] = await Promise.all([
              publicClient.readContract({
                address: taxProcessorAddress as `0x${string}`,
                abi: TAX_PROCESSOR_ABI,
                functionName: "totalQuoteAddedToLiquidity",
              }) as Promise<bigint>,
              publicClient.readContract({
                address: taxProcessorAddress as `0x${string}`,
                abi: TAX_PROCESSOR_ABI,
                functionName: "totalQuoteSentToMarketing",
              }) as Promise<bigint>,
              publicClient.readContract({
                address: taxProcessorAddress as `0x${string}`,
                abi: TAX_PROCESSOR_ABI,
                functionName: "lpQuoteBalance",
              }) as Promise<bigint>,
              publicClient.readContract({
                address: taxProcessorAddress as `0x${string}`,
                abi: TAX_PROCESSOR_ABI,
                functionName: "marketQuoteBalance",
              }) as Promise<bigint>,
            ]);

            // Total de fees distribuidas + pendientes
            // marketQuoteBalance + totalQuoteSentToMarketing = total para donaciones (Marketing)
            // lpQuoteBalance + totalQuoteAddedToLiquidity = total para liquidez (Liquidity)
            const totalMarketingAll = totalMarketingSent + pendingMarketing;
            const totalLiquidityAll = totalLiquidityAdded + pendingLiquidity;

            console.log(`✅ Dashboard - Total desde TaxProcessor:`);
            console.log(`   - Marketing (distribuido): ${formatEther(totalMarketingSent)} BNB`);
            console.log(`   - Marketing (pendiente): ${formatEther(pendingMarketing)} BNB`);
            console.log(`   - Liquidity (distribuido): ${formatEther(totalLiquidityAdded)} BNB`);
            console.log(`   - Liquidity (pendiente): ${formatEther(pendingLiquidity)} BNB`);
            console.log(`   - Total Marketing (Donations): ${formatEther(totalMarketingAll)} BNB`);
            console.log(`   - Total Liquidity: ${formatEther(totalLiquidityAll)} BNB`);

            // Usar marketing para Donations y liquidity para Liquidity
            const feesInBNB = formatEther(totalMarketingAll);
            const liquidityInBNB = formatEther(totalLiquidityAll);

            const formattedFees = parseFloat(feesInBNB).toFixed(2);
            const formattedLiquidity = parseFloat(liquidityInBNB).toFixed(2);

            setData({
              totalFeesCollected: formattedFees,
              liquidityAdded: formattedLiquidity,
              horsesHelped: "-",
              isLoading: false,
              error: null,
            });

            return; // Salir temprano si se leyó exitosamente desde TaxProcessor
          } catch (taxProcessorError) {
            console.warn("⚠️ Dashboard - No se pudo leer desde TaxProcessor, intentando Dividend:", taxProcessorError);
            // Intentar Dividend como fallback
          }
        }

        // INTENTAR LEER DESDE CONTRATO DIVIDEND (fallback)
        if (DIVIDEND_ADDRESS && DIVIDEND_ADDRESS !== "0x0000000000000000000000000000000000000000") {
          try {
            console.log("💰 Dashboard - Intentando leer desde contrato Dividend...");
            const totalDividendsDistributed = await publicClient.readContract({
              address: DIVIDEND_ADDRESS as `0x${string}`,
              abi: DIVIDEND_ABI,
              functionName: "totalDividendsDistributed",
            }) as bigint;

            console.log(`✅ Dashboard - Total dividendos desde contrato Dividend: ${formatEther(totalDividendsDistributed)} BNB`);

            // Distribución 70/30
            const totalFeesForHorses = (totalDividendsDistributed * 70n) / 100n;
            const totalFeesForLiquidity = (totalDividendsDistributed * 30n) / 100n;

            const feesInBNB = formatEther(totalFeesForHorses);
            const liquidityInBNB = formatEther(totalFeesForLiquidity);

            const formattedFees = parseFloat(feesInBNB).toFixed(2);
            const formattedLiquidity = parseFloat(liquidityInBNB).toFixed(2);

            setData({
              totalFeesCollected: formattedFees,
              liquidityAdded: formattedLiquidity,
              horsesHelped: "-",
              isLoading: false,
              error: null,
            });

            return; // Salir temprano si se leyó exitosamente desde Dividend
          } catch (dividendError) {
            console.warn("⚠️ Dashboard - No se pudo leer desde Dividend, usando eventos:", dividendError);
            // Continuar con lectura de eventos como fallback
          }
        }

        // Leer eventos históricos para calcular fees acumuladas (fallback)
        console.log("📜 Dashboard - Leyendo eventos históricos para calcular fees...");
        
        // Obtener el bloque actual
        const currentBlock = await publicClient.getBlockNumber();
        
        // Buscar desde el bloque 0 (o desde un bloque razonable para BSC)
        // BSC Mainnet empezó en el bloque ~0, pero podemos usar un bloque más reciente
        // para optimizar. Usaremos el último año aproximado: ~20,000,000 bloques al año
        // con ~3 segundos por bloque
        const blocksPerYear = 20_000_000n;
        const startBlock = currentBlock > blocksPerYear ? currentBlock - blocksPerYear : 0n;
        
        // IMPORTANTE: El RPC tiene un límite de 1000 bloques por solicitud
        // Necesitamos dividir la lectura en lotes de máximo 1000 bloques
        const maxBlocksPerRequest = 1000n;
        
        console.log(`📊 Dashboard - Buscando eventos desde bloque ${startBlock.toString()} hasta ${currentBlock.toString()}`);
        
        try {
          // Filtrar logs por topic[1] que contiene el token address (primer parámetro indexado)
          // topic[1] en eventos TokenBought/TokenSold es el token address (indexed)
          const tokenAddressTopic = `0x${TOKEN_ADDRESS.slice(2).toLowerCase().padStart(64, '0')}`;
          
          // Leer logs en lotes de máximo 1000 bloques
          const allLogs: any[] = [];
          let fromBlock = startBlock;
          
          console.log(`📦 Dashboard - Leyendo eventos en lotes de ${maxBlocksPerRequest.toString()} bloques...`);
          
          while (fromBlock < currentBlock) {
            const toBlock = fromBlock + maxBlocksPerRequest > currentBlock 
              ? currentBlock 
              : fromBlock + maxBlocksPerRequest - 1n;
            
            try {
              const batchLogs = await publicClient.getLogs({
                address: FLAP_PORTAL_ADDRESS as `0x${string}`,
                fromBlock: fromBlock,
                toBlock: toBlock,
              });
              
              allLogs.push(...batchLogs);
              
              console.log(`   ✓ Bloque ${fromBlock.toString()} - ${toBlock.toString()}: ${batchLogs.length} logs encontrados`);
              
              fromBlock = toBlock + 1n;
              
              // Pequeña pausa entre lotes para evitar rate limiting
              await new Promise(resolve => setTimeout(resolve, 100));
            } catch (batchError) {
              console.error(`⚠️ Error en lote ${fromBlock.toString()}-${toBlock.toString()}:`, batchError);
              // Continuar con el siguiente lote
              fromBlock = toBlock + 1n;
            }
          }
          
          console.log(`📊 Dashboard - Total logs encontrados: ${allLogs.length}`);
          
          // Filtrar y decodificar eventos TokenBought y TokenSold
          let totalFeesFromBought = 0n;
          let totalFeesFromSold = 0n;
          let boughtCount = 0;
          let soldCount = 0;
          
          for (const log of allLogs) {
            // Verificar que el topic[1] coincida con nuestro token address (si está presente)
            // Esto filtra logs antes de decodificarlos, optimizando el rendimiento
            if (log.topics.length > 1 && log.topics[1]?.toLowerCase() !== tokenAddressTopic.toLowerCase()) {
              continue;
            }
            
            try {
              // Intentar decodificar como TokenBought o TokenSold
              const decodedLog = decodeEventLog({
                abi: FLAP_PORTAL_ABI,
                data: log.data,
                topics: log.topics,
              });
              
              // Verificar que el evento sea para nuestro token
              if (decodedLog.eventName === "TokenBought" || decodedLog.eventName === "TokenSold") {
                const eventArgs = decodedLog.args as any;
                
                // Verificar que el token del evento coincida con nuestro token
                if (eventArgs.token?.toLowerCase() === TOKEN_ADDRESS.toLowerCase()) {
                  const fee = BigInt(eventArgs.fee?.toString() || "0");
                  
                  if (decodedLog.eventName === "TokenBought") {
                    totalFeesFromBought += fee;
                    boughtCount++;
                  } else if (decodedLog.eventName === "TokenSold") {
                    totalFeesFromSold += fee;
                    soldCount++;
                  }
                }
              }
            } catch (decodeError) {
              // Si no se puede decodificar, no es un evento que nos interese
              // Continuar con el siguiente log
              continue;
            }
          }
          
          console.log(`📈 Dashboard - Eventos procesados: ${boughtCount} compras, ${soldCount} ventas`);
          
          // Total de fees acumuladas (3% de todas las transacciones)
          const totalFeesCollected = totalFeesFromBought + totalFeesFromSold;
          
          console.log(`💰 Dashboard - Fees calculadas desde eventos:`);
          console.log(`   - Fees de compras: ${formatEther(totalFeesFromBought)} BNB`);
          console.log(`   - Fees de ventas: ${formatEther(totalFeesFromSold)} BNB`);
          console.log(`   - Total fees acumuladas (3%): ${formatEther(totalFeesCollected)} BNB`);
          
          // Distribución de las fees:
          // - 70% va a "Total Fees" (fees destinadas a ayudar caballos)
          // - 30% va a "Liquidity" (fees que van a la liquidez del token)
          const totalFeesForHorses = (totalFeesCollected * 70n) / 100n; // 70% para caballos
          const totalFeesForLiquidity = (totalFeesCollected * 30n) / 100n; // 30% para liquidez
          
          console.log(`📊 Dashboard - Distribución de fees:`);
          console.log(`   - 70% para caballos (Total Fees): ${formatEther(totalFeesForHorses)} BNB`);
          console.log(`   - 30% para liquidez (Liquidity): ${formatEther(totalFeesForLiquidity)} BNB`);
          
          // Convertir de Wei a BNB
          const feesInBNB = formatEther(totalFeesForHorses);
          const liquidityInBNB = formatEther(totalFeesForLiquidity);

          // Formatear a 2 decimales
          const formattedFees = parseFloat(feesInBNB).toFixed(2);
          const formattedLiquidity = parseFloat(liquidityInBNB).toFixed(2);

          setData({
            totalFeesCollected: formattedFees,
            liquidityAdded: formattedLiquidity,
            horsesHelped: "-", // TODO: Implementar lógica para calcular/leer esto
            isLoading: false,
            error: null,
          });
        } catch (eventsError) {
          console.error("⚠️ Dashboard - Error leyendo eventos históricos:", eventsError);
          
          // Si falla la lectura de eventos, usar estimación basada en reserve
          // Pero aplicar la distribución 70/30 también
          const estimatedFeesTotal = liquidity > 0n ? (liquidity * taxRateBps) / 10000n : 0n;
          const estimatedFeesForHorses = (estimatedFeesTotal * 70n) / 100n; // 70% para caballos
          const estimatedFeesForLiquidity = (estimatedFeesTotal * 30n) / 100n; // 30% para liquidez
          
          const feesInBNB = formatEther(estimatedFeesForHorses);
          const liquidityInBNB = formatEther(estimatedFeesForLiquidity);
          const formattedFees = parseFloat(feesInBNB).toFixed(2);
          const formattedLiquidity = parseFloat(liquidityInBNB).toFixed(2);
          
          setData({
            totalFeesCollected: formattedFees,
            liquidityAdded: formattedLiquidity,
            horsesHelped: "-",
            isLoading: false,
            error: `Error leyendo eventos: ${eventsError instanceof Error ? eventsError.message : "Error desconocido"}. Mostrando estimación.`,
          });
        }
      } catch (error) {
        console.error("❌ Dashboard - Error leyendo datos del contrato Flap:", error);
        
        // Log detallado del error
        if (error instanceof Error) {
          console.error("Error message:", error.message);
          console.error("Error stack:", error.stack);
        }
        
        setData({
          totalFeesCollected: "0.00",
          liquidityAdded: "0.00",
          horsesHelped: "-",
          isLoading: false,
          error: error instanceof Error ? `Error: ${error.message}` : "Error desconocido al leer del contrato",
        });
      }
    }

    fetchContractData();

        // Actualizar cada 1 minuto (60 segundos)
        const interval = setInterval(fetchContractData, 60000);
    return () => clearInterval(interval);
  }, []);

  return data;
}
