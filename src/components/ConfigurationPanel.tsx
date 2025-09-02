import React, { useState } from 'react';
import { BotConfig } from '../types';

interface ConfigurationPanelProps {
  config: BotConfig;
  onConfigChange: (config: BotConfig) => void;
  onLog: (message: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
}

export const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({ 
  config, 
  onConfigChange, 
  onLog 
}) => {
  const [localConfig, setLocalConfig] = useState(config);

  const handleChange = (field: keyof BotConfig, value: number) => {
    const newConfig = { ...localConfig, [field]: value };
    setLocalConfig(newConfig);
    onConfigChange(newConfig);
    onLog(`Zmieniono ${field}: ${value}`, 'info');
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-4">Konfiguracja</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Ilość SOL na portfel volume</label>
          <input 
            type="number" 
            value={localConfig.volSolAmount}
            onChange={(e) => handleChange('volSolAmount', parseFloat(e.target.value))}
            step="0.01" 
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Liczba portfeli volume</label>
          <input 
            type="number" 
            value={localConfig.volWalletNum}
            onChange={(e) => handleChange('volWalletNum', parseInt(e.target.value))}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">SOL do puli likwidności</label>
          <input 
            type="number" 
            value={localConfig.quoteMintAmount}
            onChange={(e) => handleChange('quoteMintAmount', parseFloat(e.target.value))}
            step="0.01" 
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Próg likwidności (SOL)</label>
          <input 
            type="number" 
            value={localConfig.liquidityThreshold}
            onChange={(e) => handleChange('liquidityThreshold', parseFloat(e.target.value))}
            step="0.1" 
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Kwota kupna (SOL)</label>
          <input 
            type="number" 
            value={localConfig.buyAmount}
            onChange={(e) => handleChange('buyAmount', parseFloat(e.target.value))}
            step="0.001" 
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Slippage (%)</label>
          <input 
            type="number" 
            value={localConfig.slippage}
            onChange={(e) => handleChange('slippage', parseFloat(e.target.value))}
            step="1" 
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};