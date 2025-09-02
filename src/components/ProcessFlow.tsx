import React from 'react';
import { motion } from 'framer-motion';
import { 
  Coins, 
  Plus, 
  Store, 
  Shield, 
  Waves, 
  TrendingUp 
} from 'lucide-react';
import { ProcessStep } from '../types';

interface ProcessFlowProps {
  steps: ProcessStep[];
}

const iconMap = {
  Coins,
  Plus,
  Store,
  Shield,
  Waves,
  TrendingUp
};

export const ProcessFlow: React.FC<ProcessFlowProps> = ({ steps }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 mb-8">
      <h3 className="text-xl font-semibold mb-6">Proces Rugpull</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {steps.map((step, index) => {
          const IconComponent = iconMap[step.icon as keyof typeof iconMap];
          
          return (
            <motion.div
              key={step.id}
              className={`p-4 rounded-lg text-center transition-all duration-500 ${
                step.status === 'completed' ? 'bg-green-700' :
                step.status === 'active' ? 'bg-blue-700' :
                'bg-gray-700'
              }`}
              initial={{ scale: 0.9, opacity: 0.7 }}
              animate={{ 
                scale: step.status === 'active' ? 1.05 : 1,
                opacity: 1
              }}
              transition={{ duration: 0.3 }}
            >
              <IconComponent 
                className={`w-8 h-8 mx-auto mb-2 ${
                  step.status === 'completed' ? 'text-green-300' :
                  step.status === 'active' ? 'text-blue-300' :
                  'text-gray-400'
                }`} 
              />
              <h4 className="font-medium text-sm mb-2">{step.name}</h4>
              <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-blue-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${step.progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="text-xs text-gray-400 mt-1">{step.progress}%</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};