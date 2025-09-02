import React from 'react';
import { 
  Share, 
  Coins, 
  Store, 
  Waves 
} from 'lucide-react';

interface AdvancedControlsProps {
  onAction: (action: string, description: string) => void;
  disabled: boolean;
}

export const AdvancedControls: React.FC<AdvancedControlsProps> = ({ onAction, disabled }) => {
  const controls = [
    {
      id: 'distribute',
      icon: Share,
      title: 'Dystrybuuj SOL',
      description: 'Do portfeli volume',
      color: 'bg-blue-600 hover:bg-blue-700',
      action: 'Dystrybucja SOL',
      actionDesc: 'Dystrybuowanie SOL do portfeli volume'
    },
    {
      id: 'createToken',
      icon: Coins,
      title: 'Utwórz Token',
      description: 'Z metadanymi',
      color: 'bg-purple-600 hover:bg-purple-700',
      action: 'Tworzenie tokena',
      actionDesc: 'Tworzenie tokena AIHorse'
    },
    {
      id: 'createMarket',
      icon: Store,
      title: 'Utwórz Market',
      description: 'OpenBook DEX',
      color: 'bg-indigo-600 hover:bg-indigo-700',
      action: 'Tworzenie marketu',
      actionDesc: 'Tworzenie marketu OpenBook'
    },
    {
      id: 'createPool',
      icon: Waves,
      title: 'Utwórz Pulę',
      description: 'Raydium AMM',
      color: 'bg-green-600 hover:bg-green-700',
      action: 'Tworzenie puli',
      actionDesc: 'Tworzenie puli Raydium'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {controls.map((control) => {
        const IconComponent = control.icon;
        
        return (
          <button
            key={control.id}
            onClick={() => onAction(control.action, control.actionDesc)}
            disabled={disabled}
            className={`${control.color} disabled:bg-gray-600 p-4 rounded-lg transition-colors card-hover disabled:cursor-not-allowed`}
          >
            <IconComponent className="w-6 h-6 mx-auto mb-2" />
            <div className="font-medium">{control.title}</div>
            <div className="text-xs text-gray-300">{control.description}</div>
          </button>
        );
      })}
    </div>
  );
};