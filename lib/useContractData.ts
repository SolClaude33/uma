"use client";

import { useEffect, useState } from "react";
import { createPublicClient, http, formatEther, PublicClient } from "viem";
import { bsc, mainnet } from "viem/chains";
import { CONTRACT_ADDRESS, CONTRACT_ABI, CHAIN_ID } from "./contract";

// Configurar el cliente público según la red
const getChain = () => {
  switch (CHAIN_ID) {
    case "56":
      return bsc;
    case "1":
      return mainnet;
    default:
      return bsc;
  }
};

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
        // Crear cliente público para leer del contrato
        const publicClient: PublicClient = createPublicClient({
          chain: getChain(),
          transport: http(),
        });

        // Intentar leer las funciones/variables del contrato
        // Ajusta estos nombres según tu contrato real
        let totalFees = 0n;
        let liquidity = 0n;

        try {
          // Intento 1: Leer como función
          totalFees = (await publicClient.readContract({
            address: CONTRACT_ADDRESS as `0x${string}`,
            abi: CONTRACT_ABI,
            functionName: "totalFeesCollected",
          })) as bigint;
        } catch (e) {
          try {
            // Intento 2: Leer como variable pública "totalFees"
            totalFees = (await publicClient.readContract({
              address: CONTRACT_ADDRESS as `0x${string}`,
              abi: CONTRACT_ABI,
              functionName: "totalFees",
            })) as bigint;
          } catch (e2) {
            console.warn("No se pudo leer totalFees del contrato:", e2);
          }
        }

        try {
          // Intento 1: Leer como función
          liquidity = (await publicClient.readContract({
            address: CONTRACT_ADDRESS as `0x${string}`,
            abi: CONTRACT_ABI,
            functionName: "liquidityAdded",
          })) as bigint;
        } catch (e) {
          try {
            // Intento 2: Leer como variable pública "totalLiquidity"
            liquidity = (await publicClient.readContract({
              address: CONTRACT_ADDRESS as `0x${string}`,
              abi: CONTRACT_ABI,
              functionName: "totalLiquidity",
            })) as bigint;
          } catch (e2) {
            console.warn("No se pudo leer liquidity del contrato:", e2);
          }
        }

        // Convertir de Wei a BNB/ETH
        const feesInBNB = formatEther(totalFees);
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
        console.error("Error leyendo datos del contrato:", error);
        setData({
          totalFeesCollected: "0.00",
          liquidityAdded: "0.00",
          horsesHelped: "-",
          isLoading: false,
          error: error instanceof Error ? error.message : "Error desconocido",
        });
      }
    }

    // Solo intentar leer si la dirección del contrato es válida
    if (CONTRACT_ADDRESS && CONTRACT_ADDRESS !== "0x0000000000000000000000000000000000000000") {
      fetchContractData();

      // Actualizar cada 30 segundos
      const interval = setInterval(fetchContractData, 30000);
      return () => clearInterval(interval);
    } else {
      setData({
        totalFeesCollected: "0.00",
        liquidityAdded: "0.00",
        horsesHelped: "-",
        isLoading: false,
        error: "Dirección del contrato no configurada",
      });
    }
  }, []);

  return data;
}
