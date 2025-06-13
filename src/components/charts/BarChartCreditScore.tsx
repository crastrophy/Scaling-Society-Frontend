import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export interface CreditScoreDatum {
  score: string;
  count: number;
}

export function BarChartCreditScore({ data }: { data: CreditScoreDatum[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-[#F3F4F6] text-lg">Credit Score Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="score" stroke="#F3F4F6" tick={{ fill: '#F3F4F6', fontSize: 12 }} axisLine={{ stroke: '#374151' }} />
                <YAxis stroke="#F3F4F6" tick={{ fill: '#F3F4F6', fontSize: 12 }} axisLine={{ stroke: '#374151' }} />
                <Tooltip contentStyle={{ background: '#232533', border: '1px solid #374151', color: '#F3F4F6', fontSize: 14 }} />
                <Bar dataKey="count" fill="#22C55E" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
} 