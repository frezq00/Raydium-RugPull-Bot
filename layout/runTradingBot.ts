import {
  createAssociatedTokenAccountIdempotentInstruction,
  createCloseAccountInstruction,
  createSyncNativeInstruction,
  getAssociatedTokenAddress,
  getMint,
  NATIVE_MINT,
  TOKEN_PROGRAM_ID,
  unpackMint,
} from "@solana/spl-token";
import {
  Keypair,
  PublicKey,
  LAMPORTS_PER_SOL,
  TransactionMessage,
  VersionedTransaction,
  TransactionInstruction,
  ComputeBudgetProgram,
  SystemProgram,
} from "@solana/web3.js";
import base58 from "bs58";
import {
  ADDITIONAL_FEE,
  BUY_AMOUNT,
  BUY_INTERVAL_MAX,
  BUY_INTERVAL_MIN,
  BUY_LOWER_AMOUNT,
  BUY_UPPER_AMOUNT,
  IS_RANDOM,
  liquidityCheckingAmount,
  liquidityCheckingTime,
  quote_Mint_amount,
  SWAP_ROUTING,
  volumeWalletName,
  volWalletNum,
} from "../settings";
import { outputBalance, readBundlerWallets, readJson, sleep } from "../src/utils";
import { cluster, connection, LP_wallet_keypair, SLIPPAGE } from "../config";
import {
  CurrencyAmount,
  DEVNET_PROGRAM_ID,
  jsonInfo2PoolKeys,
  Liquidity,
  LiquidityPoolKeys,
  LiquidityPoolKeysV4,
  MAINNET_PROGRAM_ID,
  MARKET_STATE_LAYOUT_V3,
  Percent,
  SOL,
  Token,
} from "@raydium-io/raydium-sdk";
import BN from "bn.js";
import { executeVersionedTx } from "../src/execute";
import { remove_liquidity } from "./removeLiquidity";
import { gather_volume } from "../gather";
import { tipAccount } from "../src/poolAll";
import { sendBundle } from "../src/bundle";
import { getBuyTx, getBuyTxWithJupiter } from "../src/swapOnlyAmm";

const programId = cluster == "devnet" ? DEVNET_PROGRAM_ID : MAINNET_PROGRAM_ID;
let poolKeys: LiquidityPoolKeysV4;

// Missing variable declarations
let checked = 0;
let totalInsiderSol = 0;
let checkInterval = 10; // 10 seconds interval
let quoteVault: PublicKey;
let baseMint: PublicKey;
let newLpProviderKeypair: Keypair;
let walletKPs: Keypair[];

// Buy function implementation
async function buy(wallet: Keypair, baseMint: PublicKey, buyAmount: number, index: number): Promise<boolean> {
  try {
    const data = readJson();
    if (!data.poolId) {
      console.log("Pool ID not found");
      return false;
    }

    const poolId = new PublicKey(data.poolId);
    const poolKeys = jsonInfo2PoolKeys(data.poolKeys) as LiquidityPoolKeysV4;
    
    if (SWAP_ROUTING) {
      const tx = await getBuyTxWithJupiter(wallet, baseMint, buyAmount);
      if (tx) {
        const sig = await executeVersionedTx(tx);
        return !!sig;
      }
    } else {
      const tx = await getBuyTx(connection, wallet, baseMint, NATIVE_MINT, buyAmount, poolId.toString());
      if (tx) {
        const sig = await executeVersionedTx(tx);
        return !!sig;
      }
    }
    return false;
  } catch (error) {
    console.log("Buy error:", error);
    return false;
  }
}

export const run_trading_bot = async () => {
  // Initialize missing variables
  const data = readJson();
  if (!data.marketId) {
    console.log("Market ID not found");
    return;
  }

  const marketId = new PublicKey(data.marketId);
  const marketBufferInfo = await connection.getAccountInfo(marketId);
  if (!marketBufferInfo) {
    console.log("Market info not found");
    return;
  }

  const {
    baseMint: marketBaseMint,
    quoteMint: marketQuoteMint,
    quoteVault: marketQuoteVault,
  } = MARKET_STATE_LAYOUT_V3.decode(marketBufferInfo.data);

  baseMint = marketBaseMint;
  quoteVault = marketQuoteVault;

  const newLpProvider = (readBundlerWallets("newLpWallet"))[0];
  newLpProviderKeypair = Keypair.fromSecretKey(base58.decode(newLpProvider));

  const savedWallets = readBundlerWallets(volumeWalletName);
  walletKPs = savedWallets.map((wallet: string) =>
    Keypair.fromSecretKey(base58.decode(wallet))
  );

  if (data.poolKeys) {
    poolKeys = jsonInfo2PoolKeys(data.poolKeys) as LiquidityPoolKeysV4;
  }

  const intervalId = setInterval(async () => {
    checked++
    const wsolBal = (await connection.getTokenAccountBalance(quoteVault)).value.uiAmount;
    console.log(`Current Liquidity of your pool is ${wsolBal}Sol and Total insider tx is ${totalInsiderSol}Sol.`);
    if (checked > liquidityCheckingTime || liquidityCheckingAmount < (wsolBal! - quote_Mint_amount - totalInsiderSol)) {
      try {
        if (checked > liquidityCheckingTime) {
          console.log(`Liquidity checking time exceeds the limit to remove liquidity`)
        }
        else {
          console.log(
            `Liquidity of your pool exceeds the point to remove liquidity`
          );
        }

        clearInterval(intervalId);

        console.log(`\nRemoving liquidity from your pool`);
        await remove_liquidity(poolKeys);

        console.log("It is gathering Sol from volume bot wallets.")
        await gather_volume()
        await sleep(10000)

        await outputBalance(LP_wallet_keypair.publicKey)
        await outputBalance(newLpProviderKeypair.publicKey)

        process.exit(1)
      } catch (err) {
        console.log(err)
      }
    }
  }, checkInterval * 1000)

  await sleep(5000)

  walletKPs.map(async (kp, i) => {
    await sleep(((BUY_INTERVAL_MAX + BUY_INTERVAL_MIN) * i) / 2);
    while (true) {
      // buy part
      const BUY_INTERVAL = Math.round(
        Math.random() * (BUY_INTERVAL_MAX - BUY_INTERVAL_MIN) + BUY_INTERVAL_MIN
      );

      const solBalance = (await connection.getBalance(walletKPs[i].publicKey)) / LAMPORTS_PER_SOL;

      let buyAmount: number;
      if (IS_RANDOM)
        buyAmount = Number(
          (
            Math.random() * (BUY_UPPER_AMOUNT - BUY_LOWER_AMOUNT) + BUY_LOWER_AMOUNT
          ).toFixed(6)
        );
      else buyAmount = BUY_AMOUNT;

      if (solBalance < ADDITIONAL_FEE) {
        // console.log("Balance is not enough: ", solBalance, "SOL");
        // continue;
      }

      // try buying until success
      let j = 0;
      while (true) {
        try {
          if (j > 10) {
            // console.log("Error in buy transaction")
            return;
          }
  
          const result = await buy(walletKPs[i], baseMint, buyAmount, i);
          if (result) {
            totalInsiderSol = totalInsiderSol + buyAmount
            break;
          } else {
            j++;
            // console.log("Buy failed, try again")
            await sleep(2000);
          }
        } catch (err) {
          console.log(".")
        }
      }

      await sleep(BUY_INTERVAL_MIN * volWalletNum);

    }
  });
};
