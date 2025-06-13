import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { 
  DollarSign, 
  PhoneCall, 
  PhoneIncoming, 
  PhoneOutgoing,
  TrendingUp,
  Users,
  FileText,
  CheckCircle,
  Info,
  Calendar,
  Check,
  X,
  BarChart,
  LayoutList,
  UserPlus,
  BarChart2,
  Briefcase
} from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, Legend } from 'recharts';

import { MetricCard } from '../../components/MetricCard';
import { LeadSourceChart } from '../../components/LeadSourceChart';
import { RevenueChart } from '../../components/RevenueChart';
import { CommissionTable } from '../../components/CommissionTable';
import { MetricSummaryCard } from '../../components/MetricSummaryCard';
import { GaugeChartCard } from '../../components/GaugeChartCard';
import { Tile } from '../../components/Tile';
import { colors, spacing, type } from '../../theme';
import { Button } from "../../components/ui/button";
import { DateRangePickerButton } from "../../components/DateRangePickerButton";

import { 
  mockCallData, 
  calculateMetrics, 
  getLeadSourceData, 
  getCommissionData 
} from '../../data/mockData';
import { 
  KpiData, 
  GoogleSheetData, 
  fetchData, 
  calculateKpis, 
  ChartData, 
  calculateChartData,
  DetailedTableRowData,
  calculateTableData
} from '../../data/googleSheetService';
import { useAuth } from '../../auth/useAuth';

// Example pie chart data
const pieData = [
  { source: 'Instagram', count: 40 },
  { source: 'TikTok', count: 30 },
  { source: 'YouTube', count: 20 },
  { source: 'Other', count: 10 },
];
const PIE_COLORS = ['#FF0000', '#69C9D0', '#E1306C', '#828282'];

// Example bar chart data
const barData = [
  { closer: 'Karan', revenue: 40000 },
  { closer: 'Joey', revenue: 35000 },
  { closer: 'Lisa', revenue: 20000 },
];

// Example table data
const tableRows = [
  { name: 'John Doe', source: 'Instagram', qualified: 'Yes', showedUp: 'Yes', sdr: 'Ava', closer: 'Joey', commission: '$450' },
  { name: 'Jane Smith', source: 'TikTok', qualified: 'No', showedUp: 'No', sdr: 'Ava', closer: 'Karan', commission: '$0' },
  { name: 'Sam Lee', source: 'YouTube', qualified: 'Yes', showedUp: 'Yes', sdr: 'Blake', closer: 'Lisa', commission: '$300' },
  { name: 'Alex Kim', source: 'Instagram', qualified: 'Yes', showedUp: 'No', sdr: 'Ava', closer: 'Joey', commission: '$0' },
  { name: 'Chris Ray', source: 'Other', qualified: 'No', showedUp: 'No', sdr: 'Blake', closer: 'Lisa', commission: '$0' },
];

const barChartData = [
  { closer: 'Karan', revenue: 40000 },
  { closer: 'Joey', revenue: 35000 },
  { closer: 'Lisa', revenue: 20000 },
];
const pieChartData = [
  { source: 'Instagram', value: 40 },
  { source: 'TikTok', value: 30 },
  { source: 'YouTube', value: 20 },
  { source: 'Other', value: 10 },
];
const lineChartData = [
  { date: 'Mon', showRate: 60 },
  { date: 'Tue', showRate: 65 },
  { date: 'Wed', showRate: 70 },
  { date: 'Thu', showRate: 68 },
  { date: 'Fri', showRate: 75 },
];

export const Dashboard: React.FC = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [rawData, setRawData] = useState<GoogleSheetData | null>(null);
  const [kpiData, setKpiData] = useState<KpiData | null>(null);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [tableData, setTableData] = useState<DetailedTableRowData[] | null>(null);
  const { getAuthToken } = useAuth();

  // Date range state
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});

  const metrics = calculateMetrics(mockCallData);
  const leadSourceData = getLeadSourceData(mockCallData);
  const commissionData = getCommissionData(mockCallData);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const token = await getAuthToken();
      if (!token) throw new Error("No auth token found");
      const data = await fetchData(token);
      setRawData(data);
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (rawData) {
      const calculatedKpis = calculateKpis(rawData, dateRange);
      setKpiData(calculatedKpis);
      const calculatedCharts = calculateChartData(rawData, dateRange);
      setChartData(calculatedCharts);
      const calculatedTableData = calculateTableData(rawData, dateRange);
      setTableData(calculatedTableData);
      setLastUpdated(new Date());
    }
  }, [rawData, dateRange]);

  const handleRefresh = async () => {
    await loadData();
  };

  // Handler for date changes
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({ ...prev, [name]: value }));
    // Optionally, trigger data refresh here
  };

  return (
    <div className="h-full bg-[#21222D] px-0 py-4">
      <div className="max-w-7xl mx-auto space-y-10 px-0">
        {/* Date Picker */}
        <div className="flex justify-start items-center ml-0">
          <DateRangePickerButton
            value={dateRange}
            onChange={(range) => setDateRange(range)}
            className="mb-4"
          />
        </div>
        <div className="space-y-10">
          {/* Key Metrics Section */}
          <Tile>
            <h2 className={`${type.h2} ${spacing.titleSpacing}`}>Today's Sales</h2>
            <p className={`${type.label} mb-6`}>Sales Summary</p>
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 ${spacing.tileGap}`}>
              <Tile>
                <BarChart2 className="text-[#FBBF24] w-8 h-8 mb-3" />
                <p className={`${type.stat}`}>{isLoading || !kpiData ? '...' : `$${kpiData.cashCollected.toLocaleString()}`}</p>
                <p className={`${type.label} mt-1`}>Cash Collected</p>
                {/* <p className="text-xs mt-1 text-[#FBBF24]">+10% from yesterday</p> */}
              </Tile>
              <Tile>
                <DollarSign className="text-[#67E8F9] w-8 h-8 mb-3" />
                <p className={`${type.stat}`}>{isLoading || !kpiData ? '...' : `$${kpiData.revenueGenerated.toLocaleString()}`}</p>
                <p className={`${type.label} mt-1`}>Revenue Generated</p>
                {/* <p className="text-xs mt-1 text-[#67E8F9]">+8% from yesterday</p> */}
              </Tile>
              <Tile>
                <PhoneIncoming className="text-[#34D399] w-8 h-8 mb-3" />
                <p className={`${type.stat}`}>{isLoading || !kpiData ? '...' : kpiData.callsDue}</p>
                <p className={`${type.label} mt-1`}>Calls Due</p>
                {/* <p className="text-xs mt-1 text-[#34D399]">+8% from yesterday</p> */}
              </Tile>
              <Tile>
                <Briefcase className="text-[#F9A8D4] w-8 h-8 mb-3" />
                <p className={`${type.stat}`}>{isLoading || !kpiData ? '...' : kpiData.callsTaken}</p>
                <p className={`${type.label} mt-1`}>Calls Taken</p>
                {/* <p className="text-xs mt-1 text-[#F9A8D4]">+2% from yesterday</p> */}
              </Tile>
              <Tile>
                <UserPlus className="text-[#60A5FA] w-8 h-8 mb-3" />
                <p className={`${type.stat}`}>{isLoading || !kpiData ? '...' : kpiData.callsClosed}</p>
                <p className={`${type.label} mt-1`}>Calls Closed</p>
                {/* <p className="text-xs mt-1 text-[#60A5FA]">+3% from yesterday</p> */}
              </Tile>
            </div>
          </Tile>
          {/* Gauges */}
          <Tile>
            <h2 className={`${type.h2} ${spacing.titleSpacing}`}>Gauges</h2>
            <div className={`flex justify-center mt-10 ${spacing.tileGap}`}>
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl w-full ${spacing.tileGap}`}>
                {isLoading || !kpiData ? (
                  <>
                    <GaugeChartCard value={0} valueLabel={`...%`} label="Show Rate" gradientFrom="#8B5CF6" gradientTo="#4F46E5" />
                    <GaugeChartCard value={0} valueLabel={`...%`} label="Close Rate" gradientFrom="#34D399" gradientTo="#10B981" />
                  </>
                ) : (
                  <>
                    <GaugeChartCard value={kpiData.showRate / 100} valueLabel={`${kpiData.showRate.toFixed(1)}%`} label="Show Rate" gradientFrom="#8B5CF6" gradientTo="#4F46E5" />
                    <GaugeChartCard value={kpiData.closeRate / 100} valueLabel={`${kpiData.closeRate.toFixed(1)}%`} label="Close Rate" gradientFrom="#34D399" gradientTo="#10B981" />
                  </>
                )}
              </div>
            </div>
          </Tile>
          {/* Charts Section */}
          <Tile>
            <h2 className={`${type.h2} ${spacing.titleSpacing}`}>Charts</h2>
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${spacing.tileGap}`}>
              {/* Bar Chart Card */}
              <Tile>
                <h3 className={`${type.h3} ${spacing.titleSpacing}`}>Revenue by Closer <Info className="w-4 h-4 text-[#BDBDBD] ml-2 cursor-pointer" /></h3>
                <ResponsiveContainer width="100%" height={160}>
                  {isLoading || !chartData ? <div className="flex items-center justify-center h-full">Loading...</div> : (
                    <RechartsBarChart data={chartData.revenueByCloser}>
                      <CartesianGrid stroke="#232533" vertical={false} />
                      <XAxis dataKey="closer" stroke="#BDBDBD" tick={{ fill: '#F3F4F6', fontSize: 14 }} axisLine={{ stroke: '#232533' }} />
                      <YAxis stroke="#BDBDBD" tick={{ fill: '#F3F4F6', fontSize: 14 }} axisLine={{ stroke: '#232533' }} />
                      <Tooltip contentStyle={{ background: '#171821', border: '1px solid #232533', color: '#F3F4F6', fontSize: 14 }} />
                      <Bar dataKey="revenue" fill="#2F80ED" radius={[8, 8, 0, 0]} barSize={32} />
                    </RechartsBarChart>
                  )}
                </ResponsiveContainer>
              </Tile>
              {/* Pie Chart Card */}
              <Tile>
                <h3 className={`${type.h3} ${spacing.titleSpacing}`}>Lead Source Breakdown <Info className="w-4 h-4 text-[#BDBDBD] ml-2 cursor-pointer" /></h3>
                <ResponsiveContainer width="100%" height={160}>
                  {isLoading || !chartData ? <div className="flex items-center justify-center h-full">Loading...</div> : (
                    <PieChart>
                      <Pie data={chartData.leadSourceBreakdown} dataKey="value" nameKey="source" cx="50%" cy="50%" outerRadius={60} labelLine={false}>
                        {chartData.leadSourceBreakdown.map((entry, i) => (
                          <Cell key={`cell-${i}`} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ background: '#171821', border: '1px solid #232533', color: '#F3F4F6', fontSize: 14 }} />
                      <Legend iconType="circle" formatter={(value) => <span style={{ color: '#F3F4F6', fontSize: 14 }}>{value}</span>} />
                    </PieChart>
                  )}
                </ResponsiveContainer>
              </Tile>
              {/* Line Chart Card */}
              <Tile>
                <h3 className={`${type.h3} ${spacing.titleSpacing}`}>Show Rate Trend <Info className="w-4 h-4 text-[#BDBDBD] ml-2 cursor-pointer" /></h3>
                <ResponsiveContainer width="100%" height={160}>
                  {isLoading || !chartData ? <div className="flex items-center justify-center h-full">Loading...</div> : (
                    <LineChart data={chartData.showRateTrend}>
                      <CartesianGrid stroke="#232533" vertical={false} />
                      <XAxis dataKey="date" stroke="#BDBDBD" tick={{ fill: '#F3F4F6', fontSize: 14 }} axisLine={{ stroke: '#232533' }} />
                      <YAxis stroke="#BDBDBD" tick={{ fill: '#F3F4F6', fontSize: 14 }} axisLine={{ stroke: '#232533' }} domain={[0, 100]} />
                      <Tooltip contentStyle={{ background: '#171821', border: '1px solid #232533', color: '#F3F4F6', fontSize: 14 }} />
                      <Line type="monotone" dataKey="showRate" stroke="#56CCF2" strokeWidth={3} dot={{ r: 4, fill: '#56CCF2' }} />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </Tile>
            </div>
          </Tile>
          {/* Table Section */}
          <Tile>
            <h2 className={`${type.h2} ${spacing.titleSpacing}`}>Detailed Breakdown</h2>
            <div className={`bg-[#1E1E24] border-2 border-[#3A3A45] rounded-2xl p-6 shadow-md overflow-auto ${spacing.tileGap}`}>
              <table className="min-w-full text-sm">
                <thead className="bg-[#2A2A32] text-white font-bold text-sm tracking-wide sticky top-0 z-10">
                  <tr>
                    <th className="text-left px-4 py-4">Prospect</th>
                    <th className="text-left px-4 py-4">Source</th>
                    <th className="text-left px-4 py-4">Date Call Taken</th>
                    <th className="text-left px-4 py-4">Setter</th>
                    <th className="text-left px-4 py-4">Closer</th>
                    <th className="text-left px-4 py-4">Call Outcome</th>
                    <th className="text-left px-4 py-4">Cash Collected</th>
                    <th className="text-left px-4 py-4">Show-Rate % (Setter)</th>
                    <th className="text-left px-4 py-4">Close-Rate % (Closer)</th>
                    <th className="text-left px-4 py-4">Avg Deal Size (Closer)</th>
                  </tr>
                </thead>
                <tbody className="text-[#F3F4F6]">
                  {isLoading || !tableData ? (
                    <tr><td colSpan={10} className="text-center py-4">Loading...</td></tr>
                  ) : (
                    tableData.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-[#1E1E24]' : 'bg-[#23232D]'}>
                        <td className="px-4 py-4 whitespace-nowrap">{row.prospect}</td>
                        <td className="px-4 py-4 whitespace-nowrap">{row.source}</td>
                        <td className="px-4 py-4 whitespace-nowrap">{row.dateCallTaken}</td>
                        <td className="px-4 py-4 whitespace-nowrap">{row.setter}</td>
                        <td className="px-4 py-4 whitespace-nowrap">{row.closer}</td>
                        <td className="px-4 py-4 whitespace-nowrap">{row.callOutcome}</td>
                        <td className="px-4 py-4 whitespace-nowrap">{row.cashCollected}</td>
                        <td className="px-4 py-4 whitespace-nowrap">{row.setterShowRate}</td>
                        <td className="px-4 py-4 whitespace-nowrap">{row.closerCloseRate}</td>
                        <td className="px-4 py-4 whitespace-nowrap">{row.avgDealSize}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Tile>
        </div>
      </div>
    </div>
  );
};