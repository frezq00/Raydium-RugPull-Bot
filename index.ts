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

type WalletTokenAccounts = Awaited<ReturnType<typeof getWalletTokenAccount>>;

let solAmount = volSolAmount * volWalletNum + 1 + quote_Mint_amount;

export const init = async () => {
  console.clear();
  console.log("🚀 Raydium Trading Bot started in DEMO MODE.\n");
  console.log("⚠️  UWAGA: Bot działa w trybie demonstracyjnym na devnet");
  console.log("💡 Żadne prawdziwe środki nie będą używane\n");

  await sleep(3000);

  if (process.env.DEMO_MODE === "true") {
    console.log("📊 DEMO MODE - Symulacja procesu:");
    console.log("✅ Generowanie demo walletów...");
    await sleep(2000);
    console.log("✅ Symulacja dystrybucji SOL...");
    await sleep(2000);
    console.log("✅ Symulacja tworzenia tokena...");
    await sleep(2000);
    console.log("✅ Symulacja tworzenia marketu...");
    await sleep(2000);
    console.log("✅ Symulacja sprawdzania bezpieczeństwa...");
    await sleep(2000);
    console.log("✅ Symulacja tworzenia puli...");
    await sleep(2000);
    console.log("🎯 Demo zakończone pomyślnie!");
    console.log("\n📋 RAPORT BEZPIECZEŃSTWA:");
    console.log("🔴 Znalezione zagrożenia:");
    console.log("  - Podejrzana biblioteka: basic-validator-pro");
    console.log("  - Niezaszyfrowane klucze prywatne");
    console.log("  - Brak walidacji zewnętrznych danych");
    console.log("🟡 Ostrzeżenia:");
    console.log("  - Połączenia z zewnętrznymi API");
    console.log("  - Automatyczne transfery środków");
    console.log("💡 Zalecenia:");
    console.log("  - Audyt bezpieczeństwa przed użyciem");
    console.log("  - Testowanie tylko na devnet");
    console.log("  - Szyfrowanie kluczy prywatnych");
    return;
  }

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
