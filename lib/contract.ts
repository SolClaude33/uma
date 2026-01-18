// Contract configuration
export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000";
export const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID || "56"; // 56 = BSC, 1 = Ethereum

// BSC Mainnet RPC
export const BSC_RPC_URL = "https://bsc-dataseed.binance.org/";

// ABI mínimo para leer variables públicas comunes
// TODO: Actualizar con el ABI completo de tu contrato
export const CONTRACT_ABI = [
  // Ejemplo de funciones/variables que necesitamos leer
  // Ajusta estos según tu contrato real
  {
    name: "totalFeesCollected",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "liquidityAdded",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  // Si usas variables públicas en lugar de funciones:
  {
    name: "totalFees",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "totalLiquidity",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
] as const;
