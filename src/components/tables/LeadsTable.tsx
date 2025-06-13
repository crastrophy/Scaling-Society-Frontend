import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { Diff } from "lucide-react";

export interface Lead {
  date: string;
  prospect: string;
  closer: string;
  setter: string;
  outcome: string;
  cashCollected: string | number;
}

export function LeadsTable({ leads }: { leads: Lead[] }) {
  return (
    <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 shadow-lg hover:shadow-xl rounded-2xl p-6">
      <CardHeader className="flex items-center gap-2 pb-0">
        <Diff className="w-5 h-5 text-white" />
        <CardTitle className="text-white text-lg">Leads Table</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-[#232533]">
              <tr>
                <th className="px-6 py-3 text-base font-semibold uppercase tracking-wide text-white text-left">Date</th>
                <th className="px-6 py-3 text-base font-semibold uppercase tracking-wide text-white text-left">Prospect</th>
                <th className="px-6 py-3 text-base font-semibold uppercase tracking-wide text-white text-left">Closer</th>
                <th className="px-6 py-3 text-base font-semibold uppercase tracking-wide text-white text-left">Setter</th>
                <th className="px-6 py-3 text-base font-semibold uppercase tracking-wide text-white text-left">Outcome</th>
                <th className="px-6 py-3 text-base font-semibold uppercase tracking-wide text-white text-left">Cash Collected</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {leads.map((row, idx) => (
                <tr key={idx} className="even:bg-[#232533] hover:bg-[#232533]/80 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-white">{row.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-white">{row.prospect}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-white">{row.closer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-white">{row.setter}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-white">{row.outcome}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-white">{row.cashCollected}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
} 