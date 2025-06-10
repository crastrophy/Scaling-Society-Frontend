import React from 'react';

interface MetricSummaryCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  delta: string;
  deltaType: 'positive' | 'negative' | 'neutral';
}

export const MetricSummaryCard: React.FC<MetricSummaryCardProps> = ({ icon, value, label, delta, deltaType }) => (
  <div className="bg-[#1E1E24] border-2 border-[#3A3A45] rounded-2xl p-6 shadow-md flex flex-col items-center">
    <div className="mb-2">{icon}</div>
    <p className="text-2xl font-semibold text-white mt-2">{value}</p>
    <p className="text-sm text-[#BDBDBD] mt-1 tracking-wide">{label}</p>
    <p className={`text-xs pt-1 font-medium ${
      deltaType === 'positive' ? 'text-[#22C55E]' : deltaType === 'negative' ? 'text-[#EF4444]' : 'text-[#F59E0B]'
    }`}>{delta}</p>
  </div>
); 