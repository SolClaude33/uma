// Flap Portal Contract ABI - Partial ABI for reading token state
export const FLAP_PORTAL_ABI = [
  {
    "type": "function",
    "name": "getTokenV7",
    "inputs": [
      {
        "name": "token",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "state",
        "type": "tuple",
        "internalType": "struct IPortalTypes.TokenStateV7",
        "components": [
          {
            "name": "status",
            "type": "uint8",
            "internalType": "enum IPortalTypes.TokenStatus"
          },
          {
            "name": "reserve",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "circulatingSupply",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "price",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "tokenVersion",
            "type": "uint8",
            "internalType": "enum IPortalTypes.TokenVersion"
          },
          {
            "name": "r",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "h",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "k",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "dexSupplyThresh",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "quoteTokenAddress",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "nativeToQuoteSwapEnabled",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "extensionID",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          {
            "name": "taxRate",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "pool",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "progress",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "lpFeeProfile",
            "type": "uint8",
            "internalType": "enum IPortalTypes.V3LPFeeProfile"
          },
          {
            "name": "dexId",
            "type": "uint8",
            "internalType": "enum IPortalTypes.DEXId"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "event",
    "name": "TokenBought",
    "inputs": [
      {
        "name": "token",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "buyer",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "quoteAmount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "tokenAmount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "fee",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ]
  },
  {
    "type": "event",
    "name": "TokenSold",
    "inputs": [
      {
        "name": "token",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "seller",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "tokenAmount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "quoteAmount",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "name": "fee",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ]
  }
] as const;

// Flap Portal contract address on BSC Mainnet
export const FLAP_PORTAL_ADDRESS = process.env.NEXT_PUBLIC_FLAP_PORTAL_ADDRESS || "0xe2cE6ab80874Fa9Fa2aAE65D277Dd6B8e65C9De0";

// Your token address created on Flap
export const TOKEN_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000";
