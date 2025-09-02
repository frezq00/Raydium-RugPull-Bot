import React from 'react';
import { Play, Square } from 'lucide-react';
import { BotStatus } from '../types';

interface BotControlsProps {
  botStatus: BotStatus;
  onStart: () => void;
  onStop: () => void;
}

export const BotControls: React.FC<BotControlsProps> = ({ botStatus, onStart, onStop }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 card-hover">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Status Bota</h3>
        <div className="flex items-center">
          <span className={`status-dot ${botStatus.isRunning ? 'status-active' : 'status-pending'}`}></span>
          <span className="text-sm">{botStatus.isRunning ? 'Aktywny' : 'Gotowy'}</span>
        </div>
      </div>
      <div className="space-y-3">
        <button 
          onClick={onStart}
          disabled={botStatus.isRunning}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <Play className="w-4 h-4" />
          <span>Uruchom Bota</span>
        </button>
        <button 
          onClick={onStop}
          disabled={!botStatus.isRunning}
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <Square className="w-4 h-4" />
          <span>Zatrzymaj Bota</span>
        </button>
      </div>
    </div>
  );
};