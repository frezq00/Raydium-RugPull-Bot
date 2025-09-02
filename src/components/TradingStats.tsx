import React from 'react';
import { motion } from 'framer-motion';
import { TradingStats as TradingStatsType } from '../types';

interface TradingStatsProps {
  stats: TradingStatsType;
}

export const TradingStats: React.FC<TradingStatsProps> = ({ stats }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-4">Statystyki</h3>
      <div className="grid grid-cols-2 gap-4">
        <motion.div 
          className="text-center"
          whileHover={{ scale: 1.05 }}
        >
          <motion.div 
            className="text-2xl font-bold text-green-400"
            key={stats.totalProfit}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {stats.totalProfit.toFixed(4)}
          </motion.div>
          <div className="text-sm text-gray-400">Zysk (SOL)</div>
        </motion.div>
        <motion.div 
          className="text-center"
          whileHover={{ scale: 1.05 }}
        >
          <motion.div 
            className="text-2xl font-bold text-blue-400"
            key={stats.totalTrades}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {stats.totalTrades}
          </motion.div>
          <div className="text-sm text-gray-400">Transakcje</div>
        </motion.div>
        <motion.div 
          className="text-center"
          whileHover={{ scale: 1.05 }}
        >
          <motion.div 
            className="text-2xl font-bold text-purple-400"
            key={stats.activeWallets}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {stats.activeWallets}
          </motion.div>
          <div className="text-sm text-gray-400">Aktywne Portfele</div>
        </motion.div>
        <motion.div 
          className="text-center"
          whileHover={{ scale: 1.05 }}
        >
          <motion.div 
            className="text-2xl font-bold text-yellow-400"
            key={stats.poolLiquidity}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {stats.poolLiquidity.toFixed(4)}
          </motion.div>
          <div className="text-sm text-gray-400">Likwidność (SOL)</div>
        </motion.div>
      </div>
    </div>
  );
};