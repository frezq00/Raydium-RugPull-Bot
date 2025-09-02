import React from 'react';
import { WalletInfo as WalletInfoType } from '../types';

interface WalletInfoProps {
  walletInfo: WalletInfoType;
}

export const WalletInfo: React.FC<WalletInfoProps> = ({ walletInfo }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 card-hover">
      <h3 className="text-lg font-semibold mb-4">Portfel Główny</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-400">Saldo SOL:</span>
          <span className="font-mono">{walletInfo.solBalance.toFixed(4)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Portfele Volume:</span>
          <span className="font-mono">{walletInfo.volumeWallets}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Adres:</span>
          <span className="font-mono text-xs text-blue-400">{walletInfo.address}</span>
        </div>
      </div>
    </div>
  );
};