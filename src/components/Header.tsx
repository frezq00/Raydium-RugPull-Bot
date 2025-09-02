import React from 'react';
import { Bot, AlertTriangle, Square } from 'lucide-react';
import { BotStatus } from '../types';

interface HeaderProps {
  botStatus: BotStatus;
  onEmergencyStop: () => void;
}

export const Header: React.FC<HeaderProps> = ({ botStatus, onEmergencyStop }) => {
  return (
    <header className="gradient-bg shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bot className="w-8 h-8 text-white" />
            <h1 className="text-2xl font-bold">Solana Rugpull Bot</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <span className="status-dot status-active"></span>
              <span className="text-sm">DEVNET</span>
            </div>
            <button 
              onClick={onEmergencyStop}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
            >
              <Square className="w-4 h-4" />
              <span>Emergency Stop</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};