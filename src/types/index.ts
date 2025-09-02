export interface BotStatus {
  isRunning: boolean;
  currentStep: number;
  totalSteps: number;
}

export interface WalletInfo {
  address: string;
  solBalance: number;
  volumeWallets: number;
}

export interface TokenInfo {
  name: string;
  symbol: string;
  supply: string;
  decimals: number;
  marketId?: string;
  poolId?: string;
  mint?: string;
}

export interface ProcessStep {
  id: number;
  name: string;
  description: string;
  icon: string;
  progress: number;
  status: 'pending' | 'active' | 'completed' | 'error';
}

export interface TradingStats {
  totalProfit: number;
  totalTrades: number;
  activeWallets: number;
  poolLiquidity: number;
}

export interface SecurityThreat {
  type: 'critical' | 'warning' | 'info';
  message: string;
  icon: string;
}

export interface ActivityLog {
  id: string;
  timestamp: Date;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

export interface BotConfig {
  volSolAmount: number;
  volWalletNum: number;
  quoteMintAmount: number;
  liquidityThreshold: number;
  buyAmount: number;
  buyInterval: number;
  slippage: number;
}