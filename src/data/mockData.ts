import { CallData, DashboardMetrics, LeadSourceData, CommissionData } from '../types/dashboard';

export const mockCallData: CallData[] = [
  {
    id: '1',
    date: '2025-01-15',
    leadSource: 'Instagram',
    callType: 'show',
    status: 'completed',
    revenue: 2500,
    cashCollected: 2500,
    setterName: 'Sarah Johnson',
    closerName: 'Mike Chen',
    applicationReceived: true,
    qualified: true,
    notes: 'High-quality lead, closed on first call'
  },
  {
    id: '2',
    date: '2025-01-15',
    leadSource: 'TikTok',
    callType: 'show',
    status: 'no-show',
    revenue: 0,
    cashCollected: 0,
    setterName: 'David Wilson',
    closerName: 'Alex Rodriguez',
    applicationReceived: true,
    qualified: false
  },
  {
    id: '3',
    date: '2025-01-15',
    leadSource: 'YouTube',
    callType: 'close',
    status: 'closed',
    revenue: 3200,
    cashCollected: 3200,
    setterName: 'Emma Davis',
    closerName: 'Mike Chen',
    applicationReceived: true,
    qualified: true,
    notes: 'Follow-up call resulted in close'
  },
  {
    id: '4',
    date: '2025-01-15',
    leadSource: 'Facebook',
    callType: 'show',
    status: 'completed',
    revenue: 1800,
    cashCollected: 1800,
    setterName: 'Sarah Johnson',
    closerName: 'Lisa Thompson',
    applicationReceived: true,
    qualified: true
  },
  {
    id: '5',
    date: '2025-01-15',
    leadSource: 'Google',
    callType: 'show',
    status: 'pending',
    revenue: 0,
    cashCollected: 0,
    setterName: 'David Wilson',
    closerName: 'Alex Rodriguez',
    applicationReceived: true,
    qualified: true
  }
];

export const calculateMetrics = (callData: CallData[]): DashboardMetrics => {
  const totalRevenue = callData.reduce((sum, call) => sum + call.revenue, 0);
  const totalCashCollected = callData.reduce((sum, call) => sum + call.cashCollected, 0);
  
  const callsDue = callData.filter(call => call.status === 'scheduled' || call.status === 'pending').length;
  const callsTaken = callData.filter(call => call.status === 'completed' || call.status === 'closed').length;
  const callsClosed = callData.filter(call => call.status === 'closed').length;
  
  const showCalls = callData.filter(call => call.callType === 'show');
  const completedShows = showCalls.filter(call => call.status === 'completed');
  const showRate = showCalls.length > 0 ? (completedShows.length / showCalls.length) * 100 : 0;
  
  const closeRate = callsTaken > 0 ? (callsClosed / callsTaken) * 100 : 0;
  
  const setterCommission = totalCashCollected * 0.05; // 5% of cash collected
  const closerCommission = totalCashCollected * 0.10; // 10% of cash collected
  
  const applicationsReceived = callData.filter(call => call.applicationReceived).length;
  const qualifiedLeads = callData.filter(call => call.qualified).length;
  
  return {
    totalRevenue,
    totalCashCollected,
    callsDue,
    callsTaken,
    callsClosed,
    showRate,
    closeRate,
    setterCommission,
    closerCommission,
    applicationsReceived,
    qualifiedLeads
  };
};

export const getLeadSourceData = (callData: CallData[]): LeadSourceData[] => {
  const sourceMap = new Map<string, { count: number; revenue: number }>();
  
  callData.forEach(call => {
    const existing = sourceMap.get(call.leadSource) || { count: 0, revenue: 0 };
    sourceMap.set(call.leadSource, {
      count: existing.count + 1,
      revenue: existing.revenue + call.revenue
    });
  });
  
  const total = callData.length;
  
  return Array.from(sourceMap.entries()).map(([source, data]) => ({
    source,
    count: data.count,
    revenue: data.revenue,
    percentage: (data.count / total) * 100
  }));
};

export const getCommissionData = (callData: CallData[]): CommissionData[] => {
  const commissionMap = new Map<string, { setterCommission: number; closerCommission: number; totalDeals: number; closerName: string }>();
  
  callData.forEach(call => {
    if (call.cashCollected > 0) {
      const existing = commissionMap.get(call.setterName) || { 
        setterCommission: 0, 
        closerCommission: 0, 
        totalDeals: 0, 
        closerName: call.closerName 
      };
      
      commissionMap.set(call.setterName, {
        setterCommission: existing.setterCommission + (call.cashCollected * 0.05),
        closerCommission: existing.closerCommission + (call.cashCollected * 0.10),
        totalDeals: existing.totalDeals + 1,
        closerName: call.closerName
      });
    }
  });
  
  return Array.from(commissionMap.entries()).map(([setterName, data]) => ({
    setterName,
    closerName: data.closerName,
    setterCommission: data.setterCommission,
    closerCommission: data.closerCommission,
    totalDeals: data.totalDeals
  }));
};