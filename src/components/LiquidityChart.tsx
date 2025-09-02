import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TradingStats } from '../types';

interface LiquidityChartProps {
  stats: TradingStats;
  isRunning: boolean;
}

interface ChartData {
  time: string;
  liquidity: number;
}

export const LiquidityChart: React.FC<LiquidityChartProps> = ({ stats, isRunning }) => {
  const [chartData, setChartData] = useState<ChartData[]>([
    { time: new Date().toLocaleTimeString(), liquidity: 0.2 }
  ]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        const now = new Date().toLocaleTimeString();
        setChartData(prev => {
          const newData = [...prev, { time: now, liquidity: stats.poolLiquidity }];
          return newData.slice(-20); // Keep only last 20 points
        });
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isRunning, stats.poolLiquidity]);

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-4">Wykres Likwidności</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="time" 
              stroke="#9ca3af"
              fontSize={12}
            />
            <YAxis 
              stroke="#9ca3af"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#ffffff'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="liquidity" 
              stroke="#10b981" 
              strokeWidth={2}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};