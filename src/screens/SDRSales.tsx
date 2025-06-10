import React, { useState } from 'react';
import { format } from 'date-fns';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, Legend } from 'recharts';
import { Calendar } from 'lucide-react';
import { Button } from "../components/ui/button";
import { DateRangePickerButton } from "../components/DateRangePickerButton";

const mockSDRData = [
  { name: 'John Doe', calls: 50, connects: 30, shows: 20, showRate: 40, commission: 200 },
  { name: 'Jane Smith', calls: 40, connects: 25, shows: 15, showRate: 37.5, commission: 150 },
];

const barChartData = [
  { day: 'Mon', calls: 20 },
  { day: 'Tue', calls: 35 },
  { day: 'Wed', calls: 30 },
  { day: 'Thu', calls: 25 },
  { day: 'Fri', calls: 40 },
];

const pieChartData = [
  { source: 'Instagram', value: 40 },
  { source: 'TikTok', value: 30 },
  { source: 'YouTube', value: 20 },
  { source: 'Other', value: 10 },
];

const PIE_COLORS = ['#E1306C', '#69C9D0', '#FF0000', '#828282'];

const lineChartData = [
  { date: 'Mon', showRate: 60 },
  { date: 'Tue', showRate: 65 },
  { date: 'Wed', showRate: 70 },
  { date: 'Thu', showRate: 68 },
  { date: 'Fri', showRate: 75 },
];

export const SDRSales: React.FC = () => {
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});

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
          {mockSDRData.map((sdr, idx) => (
            <div key={idx} className="bg-[#171821] rounded-lg shadow-sm p-6 flex flex-col gap-2">
              <div className="text-[#F3F4F6] text-lg font-bold">{sdr.name}</div>
              <div className="text-[#F3F4F6]">Calls: <span className="font-semibold">{sdr.calls}</span></div>
              <div className="text-[#F3F4F6]">Connects: <span className="font-semibold">{sdr.connects}</span></div>
              <div className="text-[#F3F4F6]">Shows: <span className="font-semibold">{sdr.shows}</span></div>
              <div className="text-[#F3F4F6]">Show Rate: <span className="font-semibold">{sdr.showRate}%</span></div>
              <div className="text-green-400 font-semibold">Commission: ${sdr.commission}</div>
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
              <BarChart data={barChartData}>
                <CartesianGrid stroke="#232533" vertical={false} />
                <XAxis dataKey="day" stroke="#BDBDBD" tick={{ fill: '#F3F4F6', fontSize: 14 }} axisLine={{ stroke: '#232533' }} />
                <YAxis stroke="#BDBDBD" tick={{ fill: '#F3F4F6', fontSize: 14 }} axisLine={{ stroke: '#232533' }} />
                <Tooltip contentStyle={{ background: '#171821', border: '1px solid #232533', color: '#F3F4F6', fontSize: 14 }} />
                <Bar dataKey="calls" fill="#2F80ED" radius={[8, 8, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Pie Chart Card */}
          <div className="bg-[#171821] rounded-lg shadow-sm p-6 flex flex-col">
            <h3 className="text-[#F3F4F6] font-medium mb-2">Lead Source Breakdown</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={pieChartData} dataKey="value" nameKey="source" cx="50%" cy="50%" outerRadius={70} labelLine={false}>
                  {pieChartData.map((entry, i) => (
                    <Cell key={`cell-${i}`} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#171821', border: '1px solid #232533', color: '#F3F4F6', fontSize: 14 }} />
                <Legend iconType="circle" formatter={(value) => <span style={{ color: '#F3F4F6', fontSize: 14 }}>{value}</span>} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Line Chart Card */}
          <div className="bg-[#171821] rounded-lg shadow-sm p-6 flex flex-col">
            <h3 className="text-[#F3F4F6] font-medium mb-2">Show Rate Trend</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={lineChartData}>
                <CartesianGrid stroke="#232533" vertical={false} />
                <XAxis dataKey="date" stroke="#BDBDBD" tick={{ fill: '#F3F4F6', fontSize: 14 }} axisLine={{ stroke: '#232533' }} />
                <YAxis stroke="#BDBDBD" tick={{ fill: '#F3F4F6', fontSize: 14 }} axisLine={{ stroke: '#232533' }} />
                <Tooltip contentStyle={{ background: '#171821', border: '1px solid #232533', color: '#F3F4F6', fontSize: 14 }} />
                <Line type="monotone" dataKey="showRate" stroke="#56CCF2" strokeWidth={3} dot={{ r: 4, fill: '#56CCF2' }} />
              </LineChart>
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
                <th className="text-left px-4 py-4">Calls</th>
                <th className="text-left px-4 py-4">Connects</th>
                <th className="text-left px-4 py-4">Shows</th>
                <th className="text-left px-4 py-4">Show Rate</th>
                <th className="text-left px-4 py-4">Commission</th>
              </tr>
            </thead>
            <tbody className="text-[#F3F4F6]">
              {mockSDRData.map((sdr, idx) => (
                <tr key={idx} className="border-b border-[#232533] last:border-b-0">
                  <td className="px-4 py-4 whitespace-nowrap">{sdr.name}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{sdr.calls}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{sdr.connects}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{sdr.shows}</td>
                  <td className="px-4 py-4 whitespace-nowrap">{sdr.showRate}%</td>
                  <td className="px-4 py-4 whitespace-nowrap text-green-400 font-semibold">${sdr.commission}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SDRSales; 