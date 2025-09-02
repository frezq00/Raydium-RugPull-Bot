import React from 'react';
import { Shield, AlertTriangle, Key, ArrowRightLeft, Database } from 'lucide-react';
import { SecurityThreat } from '../types';

export const SecurityAnalysis: React.FC = () => {
  const threats: SecurityThreat[] = [
    {
      type: 'critical',
      message: 'Podejrzana biblioteka: basic-validator-pro',
      icon: 'AlertTriangle'
    },
    {
      type: 'critical',
      message: 'Niezaszyfrowane klucze prywatne',
      icon: 'Key'
    },
    {
      type: 'warning',
      message: 'Automatyczne transfery środków',
      icon: 'ArrowRightLeft'
    },
    {
      type: 'warning',
      message: 'Brak walidacji zewnętrznych danych',
      icon: 'Database'
    }
  ];

  const iconMap = {
    AlertTriangle,
    Key,
    ArrowRightLeft,
    Database
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-4 text-red-400 flex items-center">
        <Shield className="w-5 h-5 mr-2" />
        Analiza Bezpieczeństwa
      </h3>
      <div className="space-y-3">
        {threats.map((threat, index) => {
          const IconComponent = iconMap[threat.icon as keyof typeof iconMap];
          const bgColor = threat.type === 'critical' ? 'bg-red-900' : 'bg-yellow-900';
          const iconColor = threat.type === 'critical' ? 'text-red-400' : 'text-yellow-400';
          
          return (
            <div key={index} className={`flex items-center justify-between p-3 ${bgColor} rounded-lg`}>
              <span className="text-sm">{threat.message}</span>
              <IconComponent className={`w-4 h-4 ${iconColor}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
};