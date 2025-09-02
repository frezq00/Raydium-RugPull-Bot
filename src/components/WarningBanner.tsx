import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const WarningBanner: React.FC = () => {
  return (
    <div className="bg-red-900 border border-red-700 rounded-lg p-4 mb-8">
      <div className="flex items-center">
        <AlertTriangle className="text-red-400 w-6 h-6 mr-3" />
        <div>
          <h3 className="font-bold text-red-300">OSTRZEŻENIE BEZPIECZEŃSTWA</h3>
          <p className="text-red-200 text-sm">
            Ten bot jest przeznaczony wyłącznie do celów edukacyjnych. Używanie na mainnet może prowadzić do strat finansowych.
          </p>
        </div>
      </div>
    </div>
  );
};