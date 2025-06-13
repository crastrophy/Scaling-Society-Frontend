import { LineChartApplicants, LineChartApplicantsDatum } from "../components/charts/LineChartApplicants";
import { BarChartMoneyOnHand, MoneyOnHandDatum } from "../components/charts/BarChartMoneyOnHand";
import { BarChartCreditScore, CreditScoreDatum } from "../components/charts/BarChartCreditScore";
import { StatSeriousYes } from "../components/stats/StatSeriousYes";
import { LeadsTable, Lead } from "../components/tables/LeadsTable";
import { motion } from "framer-motion";

const applicantsData: LineChartApplicantsDatum[] = [
  { date: "4/28", applicants: 5 },
  { date: "4/29", applicants: 8 },
  { date: "4/30", applicants: 12 },
  { date: "5/1", applicants: 7 },
];

const moneyOnHandData: MoneyOnHandDatum[] = [
  { range: "$0–$500", count: 10 },
  { range: "$500–$1K", count: 5 },
  { range: "$1K–$3K", count: 3 },
  { range: "$3K+", count: 2 },
];

const creditScoreData: CreditScoreDatum[] = [
  { score: "Poor", count: 1 },
  { score: "Fair (600-650)", count: 4 },
  { score: "Good (650-700)", count: 7 },
  { score: "Excellent (720+)", count: 5 },
];

const leads: Lead[] = [
  { date: "4/28/2025", prospect: "Divyesh", closer: "Daniel", setter: "Alex", outcome: "No Show", cashCollected: "$0" },
];

export default function Leads() {
  return (
    <motion.div
      className="max-w-7xl mx-auto px-6 py-10 space-y-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold text-white">Leads Overview</h1>
        <p className="text-sm text-gray-500">Track applicant behavior, interest levels, and financial readiness.</p>
      </header>

      <div className="flex gap-4">
        <button className="bg-darkCard text-white text-sm font-medium px-4 py-2 rounded-2xl hover:bg-gray-800 transition-all duration-300">All</button>
        <button className="bg-darkCard text-white text-sm font-medium px-4 py-2 rounded-2xl hover:bg-gray-800 transition-all duration-300">This Week</button>
        <button className="bg-darkCard text-white text-sm font-medium px-4 py-2 rounded-2xl hover:bg-gray-800 transition-all duration-300">This Month</button>
      </div>

      <section>
        <motion.div className="bg-darkCard rounded-2xl shadow-lg p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <LineChartApplicants data={applicantsData} />
        </motion.div>
      </section>

      <section>
        <motion.div className="bg-darkCard rounded-2xl shadow-lg p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <StatSeriousYes value="78%" change="+4% this week" />
        </motion.div>
      </section>

      <section>
        <motion.div className="bg-darkCard rounded-2xl shadow-lg p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <BarChartMoneyOnHand data={moneyOnHandData} />
        </motion.div>
      </section>

      <section>
        <motion.div className="bg-darkCard rounded-2xl shadow-lg p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <BarChartCreditScore data={creditScoreData} />
        </motion.div>
      </section>

      <section>
        <motion.div className="bg-darkCard rounded-2xl shadow-lg p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <LeadsTable leads={leads} />
        </motion.div>
      </section>
    </motion.div>
  );
} 