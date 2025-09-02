import React from 'react';
import { 
  DollarSign, 
  MinusCircle, 
  PiggyBank 
} from 'lucide-react';

interface ManualActionsProps {
  onAction: (action: string, description: string) => void;
}

export const ManualActions: React.FC<ManualActionsProps> = ({ onAction }) => {
  const actions = [
    {
      id: 'sellAll',
      icon: DollarSign,
      title: 'Sprzedaj Wszystko',
      description: 'Manual sell all tokens',
      color: 'bg-red-600 hover:bg-red-700',
      action: 'Sprzedaż wszystkich tokenów',
      actionDesc: 'Sprzedawanie wszystkich tokenów z portfeli volume'
    },
    {
      id: 'removeLiquidity',
      icon: MinusCircle,
      title: 'Usuń Likwidność',
      description: 'Remove LP tokens',
      color: 'bg-orange-600 hover:bg-orange-700',
      action: 'Usuwanie likwidności',
      actionDesc: 'Usuwanie likwidności z puli'
    },
    {
      id: 'gatherSol',
      icon: PiggyBank,
      title: 'Zbierz SOL',
      description: 'Gather from volume wallets',
      color: 'bg-yellow-600 hover:bg-yellow-700',
      action: 'Zbieranie SOL',
      actionDesc: 'Zbieranie SOL z portfeli volume'
    }
  ];

  return (
    <div className="bg-gray-800 rounded-xl p-6 mb-8">
      <h3 className="text-xl font-semibold mb-4 text-orange-400">Akcje Manualne</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions.map((action) => {
          const IconComponent = action.icon;
          
          return (
            <button
              key={action.id}
              onClick={() => onAction(action.action, action.actionDesc)}
              className={`${action.color} p-4 rounded-lg transition-colors card-hover`}
            >
              <IconComponent className="w-6 h-6 mx-auto mb-2" />
              <div className="font-medium">{action.title}</div>
              <div className="text-xs text-gray-300">{action.description}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};