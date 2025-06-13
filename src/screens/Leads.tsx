import { useState, useEffect, useMemo } from "react";
import { LineChartApplicants, LineChartApplicantsDatum } from "../components/charts/LineChartApplicants";
import { BarChartMoneyOnHand, MoneyOnHandDatum } from "../components/charts/BarChartMoneyOnHand";
import { BarChartCreditScore, CreditScoreDatum } from "../components/charts/BarChartCreditScore";
import { StatSeriousYes } from "../components/stats/StatSeriousYes";
import { LeadsTable, Lead } from "../components/tables/LeadsTable";
import { motion } from "framer-motion";
import { useAuth } from "../auth/useAuth";
import {
  fetchData,
  calculateApplicantsOverTime,
  calculateSeriousYesRate,
  GoogleSheetData,
  calculateMoneyOnHandDistribution,
  calculateCreditScoreDistribution,
  calculateLeadsTableData,
  LeadApplicationRecord,
} from "../data/googleSheetService";
import { isThisWeek, isThisMonth, parseISO } from "date-fns";

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
  {
    date: "4/28/2025",
    prospect: "Divyesh",
    incomeGoal: "N/A",
    currentIncome: "N/A",
    moneySetAside: "N/A",
    creditScore: "N/A",
  },
];

export default function Leads() {
  const auth = useAuth();
  const [rawData, setRawData] = useState<GoogleSheetData | null>(null);
  const [timeFilter, setTimeFilter] = useState<"all" | "week" | "month">("all");

  useEffect(() => {
    const loadData = async () => {
      if (auth && auth.getAuthToken) {
        try {
          const token = await auth.getAuthToken();
          if (token) {
            const data = await fetchData(token);
            setRawData(data);
          }
        } catch (error) {
          console.error("Could not fetch data:", error);
        }
      }
    };
    loadData();
  }, [auth]);

  const filteredLeads = useMemo(() => {
    if (!rawData || !rawData[1]) {
      return [];
    }
    const leadsSheet: LeadApplicationRecord[] = rawData[1];
    if (timeFilter === "all") {
      return leadsSheet;
    }

    const now = new Date();
    return leadsSheet.filter((lead) => {
      if (!lead["Submitted At"]) {
        return false;
      }
      try {
        const leadDate = new Date(lead["Submitted At"]);
        if (isNaN(leadDate.getTime())) {
          return false;
        }

        if (timeFilter === "week") {
          return isThisWeek(leadDate, { weekStartsOn: 1 });
        }
        if (timeFilter === "month") {
          return isThisMonth(leadDate);
        }
      } catch (e) {
        return false;
      }
      return false;
    });
  }, [rawData, timeFilter]);

  const applicantsData = useMemo<LineChartApplicantsDatum[]>(() => {
    if (!filteredLeads) return [];
    return calculateApplicantsOverTime(filteredLeads);
  }, [filteredLeads]);

  const seriousYesRate = useMemo<{ value: string; change: string }>(() => {
    if (!filteredLeads) return { value: "0%", change: "" };
    return calculateSeriousYesRate(filteredLeads);
  }, [filteredLeads]);

  const moneyOnHandData = useMemo<MoneyOnHandDatum[]>(() => {
    if (!filteredLeads) return [];
    return calculateMoneyOnHandDistribution(filteredLeads);
  }, [filteredLeads]);

  const creditScoreData = useMemo<CreditScoreDatum[]>(() => {
    if (!filteredLeads) return [];
    return calculateCreditScoreDistribution(filteredLeads);
  }, [filteredLeads]);

  const leadsTableData = useMemo<Lead[]>(() => {
    if (!filteredLeads) return [];
    return calculateLeadsTableData(filteredLeads);
  }, [filteredLeads]);

  const getButtonClass = (filter: "all" | "week" | "month") => {
    return `text-white text-sm font-medium px-4 py-2 rounded-2xl transition-all duration-300 ${
      timeFilter === filter ? "bg-blue-600" : "bg-darkCard hover:bg-gray-800"
    }`;
  };

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
        <button className={getButtonClass("all")} onClick={() => setTimeFilter("all")}>
          All
        </button>
        <button className={getButtonClass("week")} onClick={() => setTimeFilter("week")}>
          This Week
        </button>
        <button className={getButtonClass("month")} onClick={() => setTimeFilter("month")}>
          This Month
        </button>
      </div>

      <section>
        <motion.div className="bg-darkCard rounded-2xl shadow-lg p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <LineChartApplicants data={applicantsData} />
        </motion.div>
      </section>

      <section>
        <motion.div className="bg-darkCard rounded-2xl shadow-lg p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <StatSeriousYes value={seriousYesRate.value} change={seriousYesRate.change} />
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
          <LeadsTable leads={leadsTableData} />
        </motion.div>
      </section>
    </motion.div>
  );
} 