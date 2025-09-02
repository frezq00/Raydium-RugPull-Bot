import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from './components/Header';
import { WarningBanner } from './components/WarningBanner';
import { BotControls } from './components/BotControls';
import { WalletInfo } from './components/WalletInfo';
import { TokenInfo } from './components/TokenInfo';
import { ProcessFlow } from './components/ProcessFlow';
import { ConfigurationPanel } from './components/ConfigurationPanel';
import { SecurityAnalysis } from './components/SecurityAnalysis';
import { ActivityLog } from './components/ActivityLog';
import { TradingStats } from './components/TradingStats';
import { AdvancedControls } from './components/AdvancedControls';
import { ManualActions } from './components/ManualActions';
import { LiquidityChart } from './components/LiquidityChart';
import { useBotSimulation } from './hooks/useBotSimulation';
import { BotConfig } from './types';

function App() {
  const {
    botStatus,
    processSteps,
    tradingStats,
    activityLogs,
    tokenInfo,
    startBot,
    stopBot,
    executeManualAction,
    addLog
  } = useBotSimulation();

  const [config, setConfig] = useState<BotConfig>({
    volSolAmount: 0.08,
    volWalletNum: 10,
    quoteMintAmount: 0.2,
    liquidityThreshold: 1,
    buyAmount: 0.01,
    buyInterval: 3000,
    slippage: 100
  });

  const walletInfo = {
    address: 'Demo...Wallet',
    solBalance: 10.5432,
    volumeWallets: config.volWalletNum
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header 
        botStatus={botStatus} 
        onEmergencyStop={stopBot} 
      />
      
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <WarningBanner />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
        >
          <BotControls 
            botStatus={botStatus}
            onStart={startBot}
            onStop={stopBot}
          />
          <WalletInfo walletInfo={walletInfo} />
          <TokenInfo tokenInfo={tokenInfo} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ProcessFlow steps={processSteps} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <AdvancedControls 
            onAction={executeManualAction}
            disabled={botStatus.isRunning}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <ManualActions onAction={executeManualAction} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="space-y-6"
          >
            <ConfigurationPanel 
              config={config}
              onConfigChange={setConfig}
              onLog={addLog}
            />
            <SecurityAnalysis />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="space-y-6"
          >
            <ActivityLog logs={activityLogs} />
            <TradingStats stats={tradingStats} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-8"
        >
          <LiquidityChart 
            stats={tradingStats}
            isRunning={botStatus.isRunning}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default App;