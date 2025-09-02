import React from 'react';
import { TokenInfo as TokenInfoType } from '../types';

interface TokenInfoProps {
  tokenInfo: TokenInfoType;
}

export const TokenInfo: React.FC<TokenInfoProps> = ({ tokenInfo }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 card-hover">
      <h3 className="text-lg font-semibold mb-4">Aktualny Token</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-400">Symbol:</span>
          <span className="font-mono">{tokenInfo.symbol}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Nazwa:</span>
          <span className="font-mono">{tokenInfo.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Supply:</span>
          <span className="font-mono">{tokenInfo.supply}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Market ID:</span>
          <span className="font-mono text-xs text-blue-400">
            {tokenInfo.marketId || 'Nie utworzono'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Pool ID:</span>
          <span className="font-mono text-xs text-blue-400">
            {tokenInfo.poolId || 'Nie utworzono'}
          </span>
        </div>
      </div>
    </div>
  );
};