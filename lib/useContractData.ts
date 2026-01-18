"use client";

import { useEffect, useState } from "react";
import { createPublicClient, http, formatEther, PublicClient } from "viem";
import { bsc } from "viem/chains";
import { FLAP_PORTAL_ADDRESS, FLAP_PORTAL_ABI, TOKEN_ADDRESS } from "./flapContract";

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
        const tokenState = await publicClient.readContract({
          address: FLAP_PORTAL_ADDRESS as `0x${string}`,
          abi: FLAP_PORTAL_ABI,
          functionName: "getTokenV7",
          args: [TOKEN_ADDRESS as `0x${string}`],
        }) as {
          reserve: bigint;
          circulatingSupply: bigint;
          price: bigint;
          taxRate: bigint;
          progress: bigint;
        };

        console.log("✅ Dashboard - Datos recibidos:", {
          reserve: tokenState.reserve.toString(),
          circulatingSupply: tokenState.circulatingSupply.toString(),
          price: tokenState.price.toString(),
          taxRate: tokenState.taxRate.toString(),
        });

        // El reserve es la liquidez en el bonding curve (en BNB)
        const liquidity = tokenState.reserve || 0n;

        // Para fees: calcular basándose en progress o usar taxRate
        // Por ahora usamos una aproximación: reserve * 0.03 (3% fee estimado)
        // TODO: Calcular fees reales desde eventos TokenBought/TokenSold
        const estimatedFees = (liquidity * 3n) / 100n; // 3% estimate

        // Convertir de Wei a BNB
        const feesInBNB = formatEther(estimatedFees);
        const liquidityInBNB = formatEther(liquidity);

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

    // Actualizar cada 30 segundos
    const interval = setInterval(fetchContractData, 30000);
    return () => clearInterval(interval);
  }, []);

  return data;
}
