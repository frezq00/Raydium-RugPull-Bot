import { useState, useEffect, useCallback } from 'react';
import { BotStatus, ProcessStep, TradingStats, ActivityLog, TokenInfo } from '../types';

export const useBotSimulation = () => {
  const [botStatus, setBotStatus] = useState<BotStatus>({
    isRunning: false,
    currentStep: 0,
    totalSteps: 6
  });

  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([
    { id: 1, name: 'Dystrybucja SOL', description: 'Rozprowadzanie SOL do portfeli volume', icon: 'Coins', progress: 0, status: 'pending' },
    { id: 2, name: 'Tworzenie Tokena', description: 'Mintowanie nowego tokena AIHorse', icon: 'Plus', progress: 0, status: 'pending' },
    { id: 3, name: 'Tworzenie Marketu', description: 'Utworzenie marketu OpenBook DEX', icon: 'Store', progress: 0, status: 'pending' },
    { id: 4, name: 'Revoke Authority', description: 'Usuwanie uprawnień mint/freeze', icon: 'Shield', progress: 0, status: 'pending' },
    { id: 5, name: 'Tworzenie Puli', description: 'Utworzenie puli Raydium AMM', icon: 'Waves', progress: 0, status: 'pending' },
    { id: 6, name: 'Volume Trading', description: 'Uruchomienie bota volume', icon: 'TrendingUp', progress: 0, status: 'pending' }
  ]);

  const [tradingStats, setTradingStats] = useState<TradingStats>({
    totalProfit: 0,
    totalTrades: 0,
    activeWallets: 0,
    poolLiquidity: 0.2
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([
    {
      id: '1',
      timestamp: new Date(),
      message: 'Dashboard załadowany. Gotowy do demonstracji.',
      type: 'info'
    },
    {
      id: '2',
      timestamp: new Date(),
      message: '⚠️ TRYB DEMO - Żadne prawdziwe transakcje nie będą wykonane',
      type: 'warning'
    }
  ]);

  const [tokenInfo, setTokenInfo] = useState<TokenInfo>({
    name: 'AIHorse',
    symbol: 'AH',
    supply: '1,000,000,000',
    decimals: 9
  });

  const addLog = useCallback((message: string, type: ActivityLog['type'] = 'info') => {
    const newLog: ActivityLog = {
      id: Date.now().toString(),
      timestamp: new Date(),
      message,
      type
    };
    setActivityLogs(prev => [newLog, ...prev.slice(0, 19)]);
  }, []);

  const updateStepProgress = useCallback((stepId: number, progress: number) => {
    setProcessSteps(prev => prev.map(step => {
      if (step.id === stepId) {
        let status: ProcessStep['status'] = 'active';
        if (progress === 100) status = 'completed';
        else if (progress === 0) status = 'pending';
        
        return { ...step, progress, status };
      }
      return step;
    }));
  }, []);

  const simulateStep = useCallback(async (stepIndex: number, duration: number) => {
    const step = processSteps[stepIndex];
    addLog(`Rozpoczęcie: ${step.name}`, 'info');
    
    for (let progress = 0; progress <= 100; progress += 10) {
      updateStepProgress(step.id, progress);
      await new Promise(resolve => setTimeout(resolve, duration / 10));
    }
    
    addLog(`Zakończono: ${step.name}`, 'success');
    
    // Update token info based on step
    if (stepIndex === 1) {
      setTokenInfo(prev => ({ ...prev, mint: 'Demo123...ABC' }));
    }
    if (stepIndex === 2) {
      setTokenInfo(prev => ({ ...prev, marketId: 'Market456...DEF' }));
    }
    if (stepIndex === 4) {
      setTokenInfo(prev => ({ ...prev, poolId: 'Pool789...GHI' }));
    }
  }, [processSteps, addLog, updateStepProgress]);

  const startBot = useCallback(async () => {
    if (botStatus.isRunning) return;
    
    setBotStatus(prev => ({ ...prev, isRunning: true }));
    addLog('🚀 Bot uruchomiony w trybie DEMO', 'success');

    const steps = [
      { duration: 3000 },
      { duration: 4000 },
      { duration: 5000 },
      { duration: 2000 },
      { duration: 6000 },
      { duration: 2000 }
    ];

    for (let i = 0; i < steps.length; i++) {
      setBotStatus(prev => ({ ...prev, currentStep: i + 1 }));
      await simulateStep(i, steps[i].duration);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Start volume simulation
    startVolumeSimulation();
  }, [botStatus.isRunning, addLog, simulateStep]);

  const startVolumeSimulation = useCallback(() => {
    const interval = setInterval(() => {
      if (!botStatus.isRunning) {
        clearInterval(interval);
        return;
      }

      const tradeAmount = +(Math.random() * 0.01 + 0.001).toFixed(4);
      const isProfit = Math.random() > 0.3;
      
      setTradingStats(prev => ({
        totalTrades: prev.totalTrades + 1,
        totalProfit: prev.totalProfit + (isProfit ? tradeAmount * 0.1 : 0),
        poolLiquidity: Math.max(0, prev.poolLiquidity + (isProfit ? tradeAmount : -tradeAmount * 0.5)),
        activeWallets: Math.floor(Math.random() * 10) + 1
      }));

      const action = isProfit ? 'Kupno' : 'Sprzedaż';
      const color = isProfit ? 'success' : 'warning';
      addLog(`${action}: ${tradeAmount} SOL | Portfel ${Math.floor(Math.random() * 10) + 1}`, color);

      // Check liquidity threshold for rugpull
      if (tradingStats.poolLiquidity > 1.2) {
        addLog(`Próg likwidności przekroczony! Rozpoczęcie rugpull...`, 'error');
        setTimeout(() => {
          executeRugpull();
        }, 2000);
        clearInterval(interval);
      }
    }, 1000 + Math.random() * 2000);
  }, [botStatus.isRunning, addLog, tradingStats.poolLiquidity]);

  const executeRugpull = useCallback(() => {
    addLog('🚨 RUGPULL WYKONANY! Usuwanie likwidności...', 'error');
    
    setTimeout(() => {
      addLog('Likwidność usunięta. Zbieranie SOL z portfeli volume...', 'warning');
      setTradingStats(prev => ({ ...prev, poolLiquidity: 0 }));
      
      setTimeout(() => {
        const finalProfit = +(Math.random() * 5 + 2).toFixed(4);
        setTradingStats(prev => ({ ...prev, totalProfit: finalProfit }));
        addLog(`✅ Rugpull zakończony. Zysk: ${finalProfit} SOL`, 'success');
        stopBot();
      }, 3000);
    }, 2000);
  }, [addLog]);

  const stopBot = useCallback(() => {
    setBotStatus(prev => ({ ...prev, isRunning: false, currentStep: 0 }));
    setProcessSteps(prev => prev.map(step => ({ ...step, progress: 0, status: 'pending' })));
    addLog('⏹️ Bot zatrzymany', 'warning');
  }, [addLog]);

  const executeManualAction = useCallback((action: string, description: string) => {
    addLog(`${description}...`, 'info');
    setTimeout(() => {
      addLog(`${action} wykonane pomyślnie`, 'success');
      if (action === 'Usuwanie likwidności') {
        setTradingStats(prev => ({ ...prev, poolLiquidity: 0 }));
      }
    }, 2000);
  }, [addLog]);

  return {
    botStatus,
    processSteps,
    tradingStats,
    activityLogs,
    tokenInfo,
    startBot,
    stopBot,
    executeManualAction,
    addLog,
    updateStepProgress
  };
};