import { Connection, Keypair, clusterApiUrl } from "@solana/web3.js";
import bs58 from "bs58";
import dotenv from "dotenv";
import { sleep } from "./src/utils";
import { getWalletTokenAccount } from "./src/get_balance";

import { create_token } from "./layout/createToken";
import { create_market } from "./layout/createMarket";
import { revokeMintAuthority } from "./src/revokeMintAuthority";
import { revokeFreezeAuthority } from "./src/revokeFreezeAuthority";
import { bundle_pool_buy } from "./layout/poolBuy";
import { distribute_sol } from "./layout/solDistribute";
import { run_trading_bot } from "./layout/runTradingBot";
import {
  quote_Mint_amount,
  volSolAmount,
  volWalletNum,
} from "./settings";

// Load environment variables
dotenv.config();

type WalletTokenAccounts = Awaited<ReturnType<typeof getWalletTokenAccount>>;

// Configuration exports
export const cluster = process.env.CLUSTER || "devnet";
export const connection = new Connection(clusterApiUrl(cluster as any), "confirmed");

// Generate demo private key if not provided
const demoKeypair = Keypair.generate();
export const LP_wallet_private_key = process.env.LP_wallet_private_key || bs58.encode(demoKeypair.secretKey);
export const LP_wallet_keypair = process.env.LP_wallet_private_key 
  ? Keypair.fromSecretKey(bs58.decode(process.env.LP_wallet_private_key))
  : demoKeypair;

export const pinataApiKey = process.env.PINATA_API_KEY || "demo_key";
export const pinataSecretApiKey = process.env.PINATA_SECRET_API_KEY || "demo_secret_key";
export const BLOCKENGINE_URL = "https://mainnet.block-engine.jito.wtf";
export const JITO_FEE = 0.0001;
export const SLIPPAGE = 100;
export const sell_remove_fees = 0.01;
export const addLookupTableInfo = true;
export const makeTxVersion = 0;
export const lookupTableCache = new Map();
export const delay_pool_open_time = 0;

let solAmount = volSolAmount * volWalletNum + 1 + quote_Mint_amount;

export const init = async () => {
  console.clear();
  console.log("Raydium Trading Bot started.\n");

  await sleep(3000);

  console.log(
    "\n***************************************************************\n"
  );
  console.log(`Distributing ${solAmount} Sol to ${volWalletNum} wallets.`);
  await distribute_sol();
  console.log("Distributing part completed!!!");

  await sleep(3000);

  console.log(
    "\n***************************************************************\n"
  );
  console.log(`Pool creation step started.\n`);
  await pool_create();
  console.log(`Pool creation step finished.`);

  await sleep(5000);

  console.log(
    "\n***************************************************************\n"
  );
  console.log(`Running the volume bot.`);
  console.log(`Volume bot is running successfully.`);
  await run_trading_bot();
};

export const pool_create = async () => {
  console.log("It is minting new token now.");
  await create_token();
  console.log("New token created.");

  await sleep(3000);

  console.log(
    "\n***************************************************************\n"
  );
  console.log("It is creating market now.");
  await create_market();
  console.log("New market is created.");

  await sleep(5000);

  console.log(
    "\n***************************************************************\n"
  );
  console.log("It is checking the security of the token.");
  await security_checks();
  console.log("Security checking ends.");

  await sleep(2000);

  console.log(
    "\n***************************************************************\n"
  );
  console.log("It is creating new Pool.\n");
  await bundle_pool_buy();
  console.log("Pool creation ends.");
};

export const security_checks = async () => {
  console.log("It is revoking Mint Authority.");
  await revokeMintAuthority();
  console.log("Revoking Mint Authority ends.");

  console.log("It is revoking Freeze Authority.");
  await revokeFreezeAuthority();
  console.log("Revoking Freeze Authority ends.");
};

init();