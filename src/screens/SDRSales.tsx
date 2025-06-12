import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, Legend } from 'recharts';
import { Calendar } from 'lucide-react';
import { Button } from "../components/ui/button";
import { DateRangePickerButton } from "../components/DateRangePickerButton";
import {
  GoogleSheetData,
  fetchData,
  SDRMetricData,
  calculateSDRMetrics,
  SDRChartData,
  calculateSDRChartData
} from '../data/googleSheetService';

const PIE_COLORS = ['#FF0000', '#69C9D0', '#E1306C', '#828282'];

export const SDRSales: React.FC = () => {
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [rawData, setRawData] = useState<GoogleSheetData | null>(null);
  const [sdrMetrics, setSdrMetrics] = useState<SDRMetricData[]>([]);
  const [chartData, setChartData] = useState<SDRChartData | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchData();
      setRawData(data);
    } catch (error) {
      console.error("Failed to fetch SDR sales data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (rawData) {
      const metrics = calculateSDRMetrics(rawData, dateRange);
      setSdrMetrics(metrics);
      const charts = calculateSDRChartData(rawData, dateRange);
      setChartData(charts);
    }
  }, [rawData, dateRange]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-[#232533] px-0 py-4">
      <div className="space-y-10">
        {/* Date Picker */}
        <div className="flex justify-start items-center ml-0 mb-4">
          <DateRangePickerButton
            value={dateRange}
            onChange={(range) => setDateRange(range)}
          />
        </div>

        {/* KPIs Section */}
        <h2 className="text-[#F3F4F6] text-lg font-semibold mb-2">Key Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? <p className="text-white col-span-full">Loading...</p> : sdrMetrics.map((sdr, idx) => (
            <div key={idx} className="bg-[#171821] rounded-lg shadow-sm p-6 flex flex-col gap-2">
              <div className="text-[#F3F4F6] text-lg font-bold">{sdr.name}</div>
              <div className="text-[#F3F4F6]">Shows: <span className="font-semibold">{sdr.shows}</span></div>
              <div className="text-[#F3F4F6]">Show Rate: <span className="font-semibold">{sdr.showRate.toFixed(1)}%</span></div>
              <div className="text-green-400 font-semibold">Commission: ${sdr.commission.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <h2 className="text-[#F3F4F6] text-lg font-semibold mb-2">Charts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bar Chart Card */}
          <div className="bg-[#171821] rounded-lg shadow-sm p-6 flex flex-col">
            <h3 className="text-[#F3F4F6] font-medium mb-2">Calls by Day</h3>
            <ResponsiveContainer width="100%" height={200}>
              {isLoading || !chartData ? <div className="text-white flex items-center justify-center h-full">Loading...</div> : (
                <BarChart data={chartData.callsByDay}>
                  <CartesianGrid stroke="#232533" vertical={false} />
                  <XAxis dataKey="day" stroke="#BDBDBD" tick={{ fill: '#F3F4F6', fontSize: 14 }} axisLine={{ stroke: '#232533' }} />
                  <YAxis stroke="#BDBDBD" tick={{ fill: '#F3F4F6', fontSize: 14 }} axisLine={{ stroke: '#232533' }} />
                  <Tooltip contentStyle={{ background: '#171821', border: '1px solid #232533', color: '#F3F4F6', fontSize: 14 }} />
                  <Bar dataKey="calls" fill="#2F80ED" radius={[8, 8, 0, 0]} barSize={32} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
          {/* Pie Chart Card */}
          <div className="bg-[#171821] rounded-lg shadow-sm p-6 flex flex-col">
            <h3 className="text-[#F3F4F6] font-medium mb-2">Lead Source Breakdown</h3>
            <ResponsiveContainer width="100%" height={200}>
              {isLoading || !chartData ? <div className="text-white flex items-center justify-center h-full">Loading...</div> : (
                <PieChart>
                  <Pie data={chartData.leadSourceBreakdown} dataKey="value" nameKey="source" cx="50%" cy="50%" outerRadius={70} labelLine={false}>
                    {chartData.leadSourceBreakdown.map((entry, i) => (
                      <Cell key={`cell-${i}`} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: '#171821', border: '1px solid #232533', color: '#F3F4F6', fontSize: 14 }} />
                  <Legend iconType="circle" formatter={(value) => <span style={{ color: '#F3F4F6', fontSize: 14 }}>{value}</span>} />
                </PieChart>
              )}
            </ResponsiveContainer>
          </div>
          {/* Line Chart Card */}
          <div className="bg-[#171821] rounded-lg shadow-sm p-6 flex flex-col">
            <h3 className="text-[#F3F4F6] font-medium mb-2">Show Rate Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              {isLoading || !chartData ? <div className="text-white flex items-center justify-center h-full">Loading...</div> : (
                <LineChart data={chartData.showRateTrend}>
                  <CartesianGrid stroke="#232533" vertical={false} />
                  <XAxis dataKey="date" stroke="#BDBDBD" tick={{ fill: '#F3F4F6', fontSize: 14 }} axisLine={{ stroke: '#232533' }} />
                  <YAxis stroke="#BDBDBD" tick={{ fill: '#F3F4F6', fontSize: 14 }} axisLine={{ stroke: '#232533' }} domain={[0, 100]} />
                  <Tooltip contentStyle={{ background: '#171821', border: '1px solid #232533', color: '#F3F4F6', fontSize: 14 }} />
                  <Line type="monotone" dataKey="showRate" stroke="#56CCF2" strokeWidth={3} dot={{ r: 4, fill: '#56CCF2' }} />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table Section */}
        <h2 className="text-[#F3F4F6] text-lg font-semibold mb-2">Detailed Breakdown</h2>
        <div className="bg-[#171821] rounded-lg shadow-lg overflow-auto">
          <table className="min-w-full text-xs">
            <thead className="bg-[#23283b] text-[#F3F4F6] font-bold text-sm tracking-wide">
              <tr className="border-b border-[#232533]">
                <th className="text-left px-4 py-4">Name</th>
                <th className="text-left px-4 py-4">Shows</th>
                <th className="text-left px-4 py-4">Show Rate</th>
                <th className="text-left px-4 py-4">Commission</th>
              </tr>
            </thead>
            <tbody className="text-[#F3F4F6]">
              {isLoading ? (
                <tr><td colSpan={4} className="text-center py-4">Loading...</td></tr>
              ) : (
                sdrMetrics.map((sdr, idx) => (
                  <tr key={idx} className="border-b border-[#232533] last:border-b-0">
                    <td className="px-4 py-4 whitespace-nowrap">{sdr.name}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{sdr.shows}</td>
                    <td className="px-4 py-4 whitespace-nowrap">{sdr.showRate.toFixed(1)}%</td>
                    <td className="px-4 py-4 whitespace-nowrap text-green-400 font-semibold">${sdr.commission.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SDRSales; 