import React from 'react';
import { Card, CardContent } from './ui/card';
import { motion } from 'framer-motion';

interface MetricCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  change?: string;
  changeColor?: string;
  trend?: 'up' | 'down' | 'neutral';
  delay?: number;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  value,
  label,
  change,
  changeColor = 'text-green-400',
  trend = 'up',
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      className="w-full"
    >
      <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-gray-600 transition-all duration-300 shadow-lg hover:shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                  {icon}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-white">
                  {typeof value === 'number' ? value.toLocaleString() : value}
                </div>
                <div className="text-sm text-gray-300">{label}</div>
                {change && (
                  <div className={`text-xs font-medium ${changeColor} flex items-center gap-1`}>
                    <span className={`inline-block w-2 h-2 rounded-full ${
                      trend === 'up' ? 'bg-green-400' : 
                      trend === 'down' ? 'bg-red-400' : 'bg-gray-400'
                    }`}></span>
                    {change}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};