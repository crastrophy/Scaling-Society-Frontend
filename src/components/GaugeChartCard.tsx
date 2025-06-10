import React from 'react';

interface GaugeChartCardProps {
  value: number; // 0 to 1
  valueLabel: string;
  label: string;
  gradientFrom: string;
  gradientTo: string;
}

export const GaugeChartCard: React.FC<GaugeChartCardProps> = ({ value, valueLabel, label, gradientFrom, gradientTo }) => {
  // Arc math
  const r = 48;
  const cx = 60;
  const cy = 60;
  // Start at bottom right (108, 60)
  const startAngle = Math.PI;
  const endAngle = Math.PI + Math.PI * value;
  const x1 = cx + r * Math.cos(startAngle);
  const y1 = cy + r * Math.sin(startAngle);
  const x2 = cx + r * Math.cos(endAngle);
  const y2 = cy + r * Math.sin(endAngle);
  const largeArcFlag = value > 0.5 ? 1 : 0;
  const arcPath = `M ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2}`;

  return (
    <div className="bg-[#1E1E24] border-2 border-[#3A3A45] rounded-2xl p-6 shadow-md flex flex-col items-center w-full">
      <svg width={120} height={72} viewBox="0 0 120 72" className="mb-2">
        <defs>
          <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={gradientFrom} />
            <stop offset="100%" stopColor={gradientTo} />
          </linearGradient>
        </defs>
        {/* Background arc */}
        <path d="M 108 60 A 48 48 0 1 0 12 60" fill="none" stroke="#232533" strokeWidth="12" />
        {/* Value arc */}
        <path d={arcPath} fill="none" stroke="url(#gauge-gradient)" strokeWidth="12" strokeLinecap="round" />
      </svg>
      <div className="text-xl font-bold text-white mb-1">{valueLabel}</div>
      <div className="text-sm text-[#BDBDBD]">{label}</div>
    </div>
  );
}; 