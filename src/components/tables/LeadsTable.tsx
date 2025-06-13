import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Diff } from "lucide-react";

export interface Lead {
  date: string;
  prospect: string;
  incomeGoal: string;
  currentIncome: string;
  moneySetAside: string;
  creditScore: string;
  phone: string;
  email: string;
}

export function LeadsTable({ leads }: { leads: Lead[] }) {
  return (
    <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-lg hover:shadow-xl rounded-2xl p-6">
      <CardHeader className="flex items-center gap-2 pb-0">
        <CardTitle className="text-white text-md">Leads Table</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-800">
            <thead className="bg-[#232533]">
              <tr>
                <th className="px-6 py-3 text-base font-semibold uppercase tracking-wide text-white text-left">Date</th>
                <th className="px-6 py-3 text-base font-semibold uppercase tracking-wide text-white text-left">Prospect</th>
                <th className="px-6 py-3 text-base font-semibold uppercase tracking-wide text-white text-left">Income Goal</th>
                <th className="px-6 py-3 text-base font-semibold uppercase tracking-wide text-white text-left">Current Income</th>
                <th className="px-6 py-3 text-base font-semibold uppercase tracking-wide text-white text-left">Money Set Aside</th>
                <th className="px-6 py-3 text-base font-semibold uppercase tracking-wide text-white text-left">Credit Score</th>
                <th className="px-6 py-3 text-base font-semibold uppercase tracking-wide text-white text-left">Phone</th>
                <th className="px-6 py-3 text-base font-semibold uppercase tracking-wide text-white text-left">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 text-sm">
              {leads.map((row, idx) => (
                <tr key={idx} className="even:bg-[#232533] hover:bg-[#fff]/80 text-white hover:text-black transition">
                  <td className="px-2 py-4 whitespace-nowrap font-medium">{row.date}</td>
                  <td className="px-2 py-4 whitespace-nowrap font-medium">{row.prospect}</td>
                  <td className="px-2 py-4 whitespace-nowrap font-medium">{row.incomeGoal}</td>
                  <td className="px-2 py-4 whitespace-nowrap font-medium">{row.currentIncome}</td>
                  <td className="px-2 py-4 whitespace-nowrap font-medium">{row.moneySetAside}</td>
                  <td className="px-2 py-4 font-medium">{row.creditScore}</td>
                  <td className="px-2 py-4 whitespace-nowrap font-medium">{row.phone}</td>
                  <td className="px-2 py-4 whitespace-nowrap font-medium">{row.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
} 