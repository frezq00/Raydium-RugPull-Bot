import { Connection, PublicKey, Keypair } from "@solana/web3.js";
import {
  TxVersion,
  Token,
  Currency,
  TOKEN_PROGRAM_ID,
  SOL,
  LOOKUP_TABLE_CACHE,
} from "@raydium-io/raydium-sdk";
import bs58 from "bs58";

import dotenv from "dotenv";

dotenv.config();

// Demo mode flag
export const DEMO_MODE = process.env.DEMO_MODE === "true" || !process.env.LP_wallet_private_key;
const retrieveEnvVariable = (variableName: string) => {
  const variable = process.env[variableName] || "";
  if (!variable && !DEMO_MODE) {
    console.log(`${variableName} is not set`);
    process.exit(1);
  }
  return variable;
};

// Generate demo keypair for testing
const generateDemoKeypair = () => {
  return Keypair.generate();
};
// Main wallet to create token and pool, and so on
export const LP_wallet_private_key = DEMO_MODE 
  ? bs58.encode(generateDemoKeypair().secretKey)
  : retrieveEnvVariable("LP_wallet_private_key");

export const LP_wallet_keypair = DEMO_MODE
  ? generateDemoKeypair()
  : Keypair.fromSecretKey(new Uint8Array(bs58.decode(LP_wallet_private_key)));

export const BLOCKENGINE_URL = DEMO_MODE ? "demo.block-engine.jito.wtf" : retrieveEnvVariable("BLOCKENGINE_URL");
export const SLIPPAGE = DEMO_MODE ? "2" : retrieveEnvVariable("SLIPPAGE");
export const cluster = DEMO_MODE ? "devnet" : retrieveEnvVariable("CLUSTER");
export const mainnetRpc = DEMO_MODE ? "https://api.devnet.solana.com" : retrieveEnvVariable("MAINNET_RPC_URL");
export const mainnetWebsocket = DEMO_MODE ? "wss://api.devnet.solana.com" : retrieveEnvVariable("MAINNET_WEBSOCKET_URL");
export const devnetRpc = DEMO_MODE ? "https://api.devnet.solana.com" : retrieveEnvVariable("DEVNET_RPC_URL");
export const connection =
  cluster == "mainnet"
    ? new Connection(mainnetRpc, { wsEndpoint: mainnetWebsocket })
    : new Connection(devnetRpc);
export const pinataApiKey = DEMO_MODE ? "demo_api_key" : retrieveEnvVariable("PINATA_API_KEY");
export const pinataSecretApiKey = DEMO_MODE ? "demo_secret_key" : retrieveEnvVariable("PINATA_SECRET_API_KEY");
export const JITO_FEE = Number(retrieveEnvVariable("JITO_FEE"));

// define these
export const delay_pool_open_time = Number(0); //dont change it because then you wont be able to perform swap in bundle.

// swap sell and remove lp fees in lamports.
export const sell_remove_fees = 5000000;

export const lookupTableCache =
  cluster == "devnet" ? undefined : LOOKUP_TABLE_CACHE;
export const makeTxVersion = TxVersion.V0; // LEGACY
export const addLookupTableInfo = undefined; // only mainnet. other = undefined

export const DEFAULT_TOKEN = {
  SOL: SOL,
  SOL1: new Currency(9, "USDC", "USDC"),
  WSOL: new Token(
    TOKEN_PROGRAM_ID,
    new PublicKey("So11111111111111111111111111111111111111112"),
    9,
    "WSOL",
    "WSOL"
  ),
  USDC: new Token(
    TOKEN_PROGRAM_ID,
    new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
    6,
    "USDC",
    "USDC"
  ),
};
