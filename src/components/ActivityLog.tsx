import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ActivityLog as ActivityLogType } from '../types';

interface ActivityLogProps {
  logs: ActivityLogType[];
}

export const ActivityLog: React.FC<ActivityLogProps> = ({ logs }) => {
  const getLogColor = (type: ActivityLogType['type']) => {
    switch (type) {
      case 'success': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-blue-400';
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-4">Aktywność na Żywo</h3>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        <AnimatePresence>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="text-sm p-2 bg-gray-700 rounded"
            >
              <span className={getLogColor(log.type)}>
                [{log.timestamp.toLocaleTimeString()}]
              </span>{' '}
              {log.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};