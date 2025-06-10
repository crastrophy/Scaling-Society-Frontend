import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { CommissionData } from '../types/dashboard';
import { motion } from 'framer-motion';
import { DollarSign, Users, TrendingUp } from 'lucide-react';

interface CommissionTableProps {
  data: CommissionData[];
}

export const CommissionTable: React.FC<CommissionTableProps> = ({ data }) => {
  const totalSetterCommission = data.reduce((sum, item) => sum + item.setterCommission, 0);
  const totalCloserCommission = data.reduce((sum, item) => sum + item.closerCommission, 0);
  const totalDeals = data.reduce((sum, item) => sum + item.totalDeals, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            Commission Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-500/20 rounded-lg p-4 text-center">
              <DollarSign className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-white">
                ${totalSetterCommission.toLocaleString()}
              </div>
              <div className="text-sm text-gray-300">Total Setter Commission</div>
            </div>
            <div className="bg-green-500/20 rounded-lg p-4 text-center">
              <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-white">
                ${totalCloserCommission.toLocaleString()}
              </div>
              <div className="text-sm text-gray-300">Total Closer Commission</div>
            </div>
            <div className="bg-purple-500/20 rounded-lg p-4 text-center">
              <Users className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-white">{totalDeals}</div>
              <div className="text-sm text-gray-300">Total Deals</div>
            </div>
          </div>

          {/* Commission Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Setter</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-medium">Closer</th>
                  <th className="text-right py-3 px-4 text-gray-300 font-medium">Deals</th>
                  <th className="text-right py-3 px-4 text-gray-300 font-medium">Setter Commission</th>
                  <th className="text-right py-3 px-4 text-gray-300 font-medium">Closer Commission</th>
                  <th className="text-right py-3 px-4 text-gray-300 font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <motion.tr
                    key={item.setterName}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="py-3 px-4 text-white font-medium">{item.setterName}</td>
                    <td className="py-3 px-4 text-gray-300">{item.closerName}</td>
                    <td className="py-3 px-4 text-right text-blue-400 font-medium">
                      {item.totalDeals}
                    </td>
                    <td className="py-3 px-4 text-right text-green-400 font-medium">
                      ${item.setterCommission.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right text-green-400 font-medium">
                      ${item.closerCommission.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-right text-white font-bold">
                      ${(item.setterCommission + item.closerCommission).toLocaleString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};