export interface CloserRecord {
  "Call Notes": string;
  "Call Outcome": string;
  "Cash Collected": string;
  "Closer Name": string;
  "Date Call Was Taken": string;
  "Fathom Link": string;
  "Offer Made": string;
  "Prospect Name": string;
  "Revenue Generated\nThe total value of the contract (ex: 3000, 4000)\nYour answer": string;
  "Setter Name": string;
  "Timestamp": string;
}

export type GoogleSheetData = [CloserRecord[], unknown[], unknown[]];

export interface KpiData {
    cashCollected: number;
    revenueGenerated: number;
    callsDue: number;
    callsTaken: number;
    callsClosed: number;
    showRate: number;
    closeRate: number;
}

export interface RevenueByCloserData {
  closer: string;
  revenue: number;
}

export interface LeadSourceData {
  source: string;
  value: number;
}

export interface ShowRateTrendData {
  date: string;
  showRate: number;
}

export interface DetailedTableRowData {
  prospect: string;
  source: string;
  dateCallTaken: string;
  setter: string;
  closer: string;
  callOutcome: string;
  cashCollected: string;
  setterShowRate: string;
  closerCloseRate: string;
  avgDealSize: string;
}

export interface CloserMetricData {
  name: string;
  calls: number;
  closes: number;
  closeRate: number;
  revenue: number;
  commission: number;
}

export interface DealStatusData {
  source: string;
  value: number;
}

export interface CloseRateTrendData {
  date: string;
  closeRate: number;
}

export interface SDRMetricData {
  name: string;
  shows: number;
  showRate: number;
  commission: number;
}

export interface SDRChartData {
  callsByDay: { day: string; calls: number }[];
  leadSourceBreakdown: { source: string; value: number }[];
  showRateTrend: { date: string; showRate: number }[];
}

export interface CloserChartData {
    revenueByCloser: RevenueByCloserData[];
    dealStatusBreakdown: DealStatusData[];
    closeRateTrend: CloseRateTrendData[];
}

export interface ChartData {
    revenueByCloser: RevenueByCloserData[];
    leadSourceBreakdown: LeadSourceData[];
    showRateTrend: ShowRateTrendData[];
}

const revenueKey = "Revenue Generated\nThe total value of the contract (ex: 3000, 4000)\nYour answer";

export const fetchData = async (): Promise<GoogleSheetData> => {
  const response = await fetch('http://localhost:5000/data');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const calculateKpis = (
    data: GoogleSheetData, 
    dateRange?: { from?: Date; to?: Date }
): KpiData => {
  const initialKpis: KpiData = { cashCollected: 0, revenueGenerated: 0, callsDue: 0, callsTaken: 0, callsClosed: 0, showRate: 0, closeRate: 0 };
  if (!data || !Array.isArray(data) || !data[0] || !Array.isArray(data[0])) {
    return initialKpis;
  }
  
  const closerData: CloserRecord[] = data[0];

  const filteredData = closerData.filter(record => {
    if (!dateRange || (!dateRange.from && !dateRange.to)) {
      return true; // No filter applied
    }
    try {
        const recordDate = new Date(record["Date Call Was Taken"]);
        if (isNaN(recordDate.getTime())) return false; // Invalid date in record

        if (dateRange.from && recordDate < dateRange.from) {
            return false;
        }
        if (dateRange.to && recordDate > dateRange.to) {
            return false;
        }
        return true;
    } catch (e) {
        return false;
    }
  });

  const cashCollected = filteredData.reduce((sum, record) => {
    const cash = parseFloat(String(record["Cash Collected"] || "0").replace(/[^0-9.-]+/g,"")) || 0;
    return sum + cash;
  }, 0);

  const revenueGenerated = filteredData.reduce((sum, record) => {
    const revenueStr = record[revenueKey as keyof CloserRecord] as string;
    const revenue = parseFloat(String(revenueStr || "0").replace(/[^0-9.-]+/g,"")) || 0;
    return sum + revenue;
  }, 0);

  const callsDue = filteredData.filter(r => r["Call Outcome"] !== "Cancelled" && r["Call Outcome"] !== "Rescheduled").length;

  const callsTaken = filteredData.filter(r => {
    const outcome = r["Call Outcome"];
    return outcome !== "Cancelled" && outcome !== "Rescheduled" && outcome !== "No Show";
  }).length;

  const callsClosed = filteredData.filter(r => r["Call Outcome"] === "Closed").length;

  const showRate = callsDue > 0 ? (callsTaken / callsDue) * 100 : 0;
  const closeRate = callsTaken > 0 ? (callsClosed / callsTaken) * 100 : 0;

  return {
    cashCollected,
    revenueGenerated,
    callsDue,
    callsTaken,
    callsClosed,
    showRate,
    closeRate
  };
};

export const calculateChartData = (
    data: GoogleSheetData, 
    dateRange?: { from?: Date; to?: Date }
): ChartData => {
  const initialChartData: ChartData = { revenueByCloser: [], leadSourceBreakdown: [], showRateTrend: [] };
  if (!data || !Array.isArray(data) || !data[0] || !Array.isArray(data[0])) {
    return initialChartData;
  }
  
  const closerData: CloserRecord[] = data[0];

  const filteredData = closerData.filter(record => {
    if (!dateRange || (!dateRange.from && !dateRange.to)) {
      return true;
    }
    try {
        const recordDate = new Date(record["Date Call Was Taken"]);
        if (isNaN(recordDate.getTime())) return false;

        if (dateRange.from && recordDate < dateRange.from) return false;
        if (dateRange.to && recordDate > dateRange.to) return false;
        return true;
    } catch (e) {
        return false;
    }
  });

  // Revenue By Closer
  const revenueByCloserMap = new Map<string, number>();
  filteredData.forEach(record => {
    const closer = record["Closer Name"] || "Unknown";
    const revenueStr = record[revenueKey as keyof CloserRecord] as string;
    const revenue = parseFloat(String(revenueStr || "0").replace(/[^0-9.-]+/g,"")) || 0;
    if (revenue > 0) {
        revenueByCloserMap.set(closer, (revenueByCloserMap.get(closer) || 0) + revenue);
    }
  });
  const revenueByCloser = Array.from(revenueByCloserMap.entries()).map(([closer, revenue]) => ({ closer, revenue }));

  // Lead Source Breakdown
  const leadSourceBreakdown: LeadSourceData[] = [
    { source: 'YouTube', value: 100 },
  ];

  // Show Rate Trend
  const dailyData = new Map<string, { callsDue: number; callsTaken: number }>();
  filteredData.forEach(record => {
    try {
        const recordDate = new Date(record["Date Call Was Taken"]);
        if (isNaN(recordDate.getTime())) return;
        const dateKey = recordDate.toISOString().split('T')[0]; // YYYY-MM-DD

        if (!dailyData.has(dateKey)) {
            dailyData.set(dateKey, { callsDue: 0, callsTaken: 0 });
        }
        const day = dailyData.get(dateKey)!;
        const outcome = record["Call Outcome"];

        const isDue = outcome !== "Cancelled" && outcome !== "Rescheduled";
        if (isDue) {
            day.callsDue++;
        }

        const isTaken = isDue && outcome !== "No Show";
        if (isTaken) {
            day.callsTaken++;
        }
    } catch(e) {}
  });

  const showRateTrend = Array.from(dailyData.entries())
    .map(([date, { callsDue, callsTaken }]) => ({
        date,
        showRate: callsDue > 0 ? (callsTaken / callsDue) * 100 : 0,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(item => ({...item, date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}));


  return {
    revenueByCloser,
    leadSourceBreakdown,
    showRateTrend
  };
};

export const calculateTableData = (
    data: GoogleSheetData, 
    dateRange?: { from?: Date; to?: Date }
): DetailedTableRowData[] => {
  if (!data || !Array.isArray(data) || !data[0] || !Array.isArray(data[0])) {
    return [];
  }
  
  const closerData: CloserRecord[] = data[0];

  const filteredData = closerData.filter(record => {
    if (!dateRange || (!dateRange.from && !dateRange.to)) return true;
    try {
        const recordDate = new Date(record["Date Call Was Taken"]);
        if (isNaN(recordDate.getTime())) return false;
        if (dateRange.from && recordDate < dateRange.from) return false;
        if (dateRange.to && recordDate > dateRange.to) return false;
        return true;
    } catch (e) {
        return false;
    }
  });

  const setterStats = new Map<string, { callsDue: number, callsTaken: number }>();
  const closerStats = new Map<string, { callsTaken: number, callsClosed: number, totalRevenue: number }>();

  filteredData.forEach(record => {
    const setter = record["Setter Name"] || "Unknown";
    const closer = record["Closer Name"] || "Unknown";
    const outcome = record["Call Outcome"];

    if (!setterStats.has(setter)) setterStats.set(setter, { callsDue: 0, callsTaken: 0 });
    if (!closerStats.has(closer)) closerStats.set(closer, { callsTaken: 0, callsClosed: 0, totalRevenue: 0 });

    const setterStat = setterStats.get(setter)!;
    const closerStat = closerStats.get(closer)!;

    const isDue = outcome !== "Cancelled" && outcome !== "Rescheduled";
    const isTaken = isDue && outcome !== "No Show";
    const isClosed = outcome === "Closed";

    if (isDue) setterStat.callsDue++;
    if (isTaken) {
      setterStat.callsTaken++;
      closerStat.callsTaken++;
    }
    if (isClosed) {
      closerStat.callsClosed++;
      const revenue = parseFloat(String(record[revenueKey as keyof CloserRecord] || "0").replace(/[^0-9.-]+/g,"")) || 0;
      closerStat.totalRevenue += revenue;
    }
  });

  return filteredData.map((record): DetailedTableRowData => {
    const setter = record["Setter Name"] || "Unknown";
    const closer = record["Closer Name"] || "Unknown";

    const setterStat = setterStats.get(setter) || { callsDue: 0, callsTaken: 0 };
    const closerStat = closerStats.get(closer) || { callsTaken: 0, callsClosed: 0, totalRevenue: 0 };

    const setterShowRate = setterStat.callsDue > 0 ? (setterStat.callsTaken / setterStat.callsDue) * 100 : 0;
    const closerCloseRate = closerStat.callsTaken > 0 ? (closerStat.callsClosed / closerStat.callsTaken) * 100 : 0;
    const avgDealSize = closerStat.callsClosed > 0 ? closerStat.totalRevenue / closerStat.callsClosed : 0;
    const cashCollected = parseFloat(String(record["Cash Collected"] || "0").replace(/[^0-9.-]+/g,"")) || 0;

    return {
      prospect: record["Prospect Name"] || "N/A",
      source: 'Youtube',
      dateCallTaken: record["Date Call Was Taken"] ? new Date(record["Date Call Was Taken"]).toLocaleDateString() : 'N/A',
      setter,
      closer,
      callOutcome: record["Call Outcome"] || 'N/A',
      cashCollected: `$${cashCollected.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      setterShowRate: `${setterShowRate.toFixed(1)}%`,
      closerCloseRate: `${closerCloseRate.toFixed(1)}%`,
      avgDealSize: `$${avgDealSize.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    };
  });
};

export const calculateCloserMetrics = (
    data: GoogleSheetData, 
    dateRange?: { from?: Date; to?: Date }
): CloserMetricData[] => {
    if (!data || !Array.isArray(data) || !data[0] || !Array.isArray(data[0])) {
        return [];
    }
  
    const closerData: CloserRecord[] = data[0];

    const filteredData = closerData.filter(record => {
        if (!dateRange || (!dateRange.from && !dateRange.to)) return true;
        try {
            const recordDate = new Date(record["Date Call Was Taken"]);
            if (isNaN(recordDate.getTime())) return false;
            if (dateRange.from && recordDate < dateRange.from) return false;
            if (dateRange.to && recordDate > dateRange.to) return false;
            return true;
        } catch (e) {
            return false;
        }
    });

    const closerStats = new Map<string, { calls: number, closes: number, totalRevenue: number, totalCashCollected: number }>();
    const revenueKey = "Revenue Generated\nThe total value of the contract (ex: 3000, 4000)\nYour answer";

    filteredData.forEach(record => {
        const closerName = record["Closer Name"];
        if (!closerName || closerName.trim() === "") return;

        if (!closerStats.has(closerName)) {
            closerStats.set(closerName, { calls: 0, closes: 0, totalRevenue: 0, totalCashCollected: 0 });
        }
        const stats = closerStats.get(closerName)!;

        const outcome = record["Call Outcome"];
        const isTaken = outcome !== "Cancelled" && outcome !== "Rescheduled" && outcome !== "No Show";
        const isClosed = outcome === "Closed";

        if (isTaken) {
            stats.calls++;
        }

        if (isClosed) {
            stats.closes++;
            const revenue = parseFloat(String(record[revenueKey as keyof CloserRecord] || "0").replace(/[^0-9.-]+/g,"")) || 0;
            stats.totalRevenue += revenue;
        }

        const cashCollected = parseFloat(String(record["Cash Collected"] || "0").replace(/[^0-9.-]+/g,"")) || 0;
        if(isTaken) {
          stats.totalCashCollected += cashCollected;
        }
    });

    const result: CloserMetricData[] = [];
    closerStats.forEach((stats, name) => {
        const closeRate = stats.calls > 0 ? (stats.closes / stats.calls) * 100 : 0;
        const commission = stats.totalCashCollected * 0.1;
        result.push({
            name,
            calls: stats.calls,
            closes: stats.closes,
            closeRate: closeRate,
            revenue: stats.totalRevenue,
            commission: commission
        });
    });

    return result;
};

export const calculateCloserChartData = (
    data: GoogleSheetData,
    dateRange?: { from?: Date; to?: Date }
): CloserChartData => {
    const initialChartData: CloserChartData = { revenueByCloser: [], dealStatusBreakdown: [], closeRateTrend: [] };
    if (!data || !Array.isArray(data) || !data[0] || !Array.isArray(data[0])) {
        return initialChartData;
    }

    const closerData: CloserRecord[] = data[0];

    const filteredData = closerData.filter(record => {
        if (!dateRange || (!dateRange.from && !dateRange.to)) return true;
        try {
            const recordDate = new Date(record["Date Call Was Taken"]);
            if (isNaN(recordDate.getTime())) return false;
            if (dateRange.from && recordDate < dateRange.from) return false;
            if (dateRange.to && recordDate > dateRange.to) return false;
            return true;
        } catch (e) {
            return false;
        }
    });

    // Revenue by Closer
    const revenueByCloserMap = new Map<string, number>();
    filteredData.forEach(record => {
        const closer = record["Closer Name"] || "Unknown";
        if (closer === "Unknown") return;
        const revenueStr = record[revenueKey as keyof CloserRecord] as string;
        const revenue = parseFloat(String(revenueStr || "0").replace(/[^0-9.-]+/g,"")) || 0;
        if (revenue > 0) {
            revenueByCloserMap.set(closer, (revenueByCloserMap.get(closer) || 0) + revenue);
        }
    });
    const revenueByCloser = Array.from(revenueByCloserMap.entries()).map(([closer, revenue]) => ({ closer, revenue }));

    // Deal Status Breakdown
    const dealStatusMap = new Map<string, number>();
    filteredData.forEach(record => {
        const outcome = record["Call Outcome"] || "Unknown";
        dealStatusMap.set(outcome, (dealStatusMap.get(outcome) || 0) + 1);
    });
    const dealStatusBreakdown = Array.from(dealStatusMap.entries()).map(([source, value]) => ({ source, value }));

    // Close Rate Trend
    const dailyData = new Map<string, { callsTaken: number; callsClosed: number }>();
    filteredData.forEach(record => {
        try {
            const recordDate = new Date(record["Date Call Was Taken"]);
            if (isNaN(recordDate.getTime())) return;
            const dateKey = recordDate.toISOString().split('T')[0];

            if (!dailyData.has(dateKey)) {
                dailyData.set(dateKey, { callsTaken: 0, callsClosed: 0 });
            }
            const day = dailyData.get(dateKey)!;
            const outcome = record["Call Outcome"];

            const isTaken = outcome !== "Cancelled" && outcome !== "Rescheduled" && outcome !== "No Show";
            if (isTaken) day.callsTaken++;

            const isClosed = outcome === "Closed";
            if (isClosed) day.callsClosed++;
        } catch(e) {}
    });

    const closeRateTrend = Array.from(dailyData.entries())
        .map(([date, { callsTaken, callsClosed }]) => ({
            date,
            closeRate: callsTaken > 0 ? (callsClosed / callsTaken) * 100 : 0,
        }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map(item => ({...item, date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}));

    return {
        revenueByCloser,
        dealStatusBreakdown,
        closeRateTrend
    };
}

export const calculateSDRMetrics = (
    data: GoogleSheetData,
    dateRange?: { from?: Date; to?: Date }
): SDRMetricData[] => {
    if (!data || !Array.isArray(data) || !data[0] || !Array.isArray(data[0])) {
        return [];
    }

    const closerData: CloserRecord[] = data[0];

    const filteredData = closerData.filter(record => {
        if (!dateRange || (!dateRange.from && !dateRange.to)) return true;
        try {
            const recordDate = new Date(record["Date Call Was Taken"]);
            if (isNaN(recordDate.getTime())) return false;
            if (dateRange.from && recordDate < dateRange.from) return false;
            if (dateRange.to && recordDate > dateRange.to) return false;
            return true;
        } catch (e) {
            return false;
        }
    });

    const sdrStats = new Map<string, { callsDue: number, callsTaken: number, totalCashCollected: number }>();

    filteredData.forEach(record => {
        const sdrName = record["Setter Name"];
        if (!sdrName || sdrName.trim() === "") return;

        if (!sdrStats.has(sdrName)) {
            sdrStats.set(sdrName, { callsDue: 0, callsTaken: 0, totalCashCollected: 0 });
        }
        const stats = sdrStats.get(sdrName)!;

        const outcome = record["Call Outcome"];
        const isDue = outcome !== "Cancelled" && outcome !== "Rescheduled";
        const isTaken = isDue && outcome !== "No Show";

        if (isDue) {
            stats.callsDue++;
        }

        if (isTaken) {
            stats.callsTaken++;
        }

        const cashCollected = parseFloat(String(record["Cash Collected"] || "0").replace(/[^0-9.-]+/g,"")) || 0;
        stats.totalCashCollected += cashCollected;
    });

    const result: SDRMetricData[] = [];
    sdrStats.forEach((stats, name) => {
        const showRate = stats.callsDue > 0 ? (stats.callsTaken / stats.callsDue) * 100 : 0;
        const commission = stats.totalCashCollected * 0.05;
        result.push({
            name,
            shows: stats.callsTaken,
            showRate,
            commission
        });
    });

    return result;
};

export const calculateSDRChartData = (
    data: GoogleSheetData,
    dateRange?: { from?: Date; to?: Date }
): SDRChartData => {
    const initialChartData: SDRChartData = { callsByDay: [], leadSourceBreakdown: [], showRateTrend: [] };
    if (!data || !Array.isArray(data) || !data[0] || !Array.isArray(data[0])) {
        return initialChartData;
    }

    const closerData: CloserRecord[] = data[0];

    const filteredData = closerData.filter(record => {
        if (!dateRange || (!dateRange.from && !dateRange.to)) return true;
        try {
            const recordDate = new Date(record["Date Call Was Taken"]);
            if (isNaN(recordDate.getTime())) return false;
            if (dateRange.from && recordDate < dateRange.from) return false;
            if (dateRange.to && recordDate > dateRange.to) return false;
            return true;
        } catch (e) {
            return false;
        }
    });

    // Calls by Day
    const callsByDayMap = new Map<string, number>();
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    daysOfWeek.forEach(day => callsByDayMap.set(day, 0));

    filteredData.forEach(record => {
        const outcome = record["Call Outcome"];
        const isTaken = outcome !== "Cancelled" && outcome !== "Rescheduled" && outcome !== "No Show";
        if (isTaken) {
            try {
                const recordDate = new Date(record["Date Call Was Taken"]);
                if (!isNaN(recordDate.getTime())) {
                    const dayOfWeek = daysOfWeek[recordDate.getDay()];
                    callsByDayMap.set(dayOfWeek, (callsByDayMap.get(dayOfWeek) || 0) + 1);
                }
            } catch (e) {}
        }
    });
    const callsByDay = daysOfWeek.map(day => ({ day, calls: callsByDayMap.get(day) || 0 }));

    // Lead Source Breakdown
    const leadSourceBreakdown = [{ source: 'YouTube', value: 100 }];

    // Show Rate Trend
    const dailyData = new Map<string, { callsDue: number; callsTaken: number }>();
    filteredData.forEach(record => {
        try {
            const recordDate = new Date(record["Date Call Was Taken"]);
            if (isNaN(recordDate.getTime())) return;
            const dateKey = recordDate.toISOString().split('T')[0];

            if (!dailyData.has(dateKey)) {
                dailyData.set(dateKey, { callsDue: 0, callsTaken: 0 });
            }
            const day = dailyData.get(dateKey)!;
            const outcome = record["Call Outcome"];

            const isDue = outcome !== "Cancelled" && outcome !== "Rescheduled";
            if (isDue) day.callsDue++;

            const isTaken = isDue && outcome !== "No Show";
            if (isTaken) day.callsTaken++;
        } catch(e) {}
    });

    const showRateTrend = Array.from(dailyData.entries())
        .map(([date, { callsDue, callsTaken }]) => ({
            date,
            showRate: callsDue > 0 ? (callsTaken / callsDue) * 100 : 0,
        }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map(item => ({...item, date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}));

    return {
        callsByDay,
        leadSourceBreakdown,
        showRateTrend
    };
}; 