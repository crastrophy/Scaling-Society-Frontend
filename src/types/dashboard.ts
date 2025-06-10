export interface CallData {
  id: string;
  date: string;
  leadSource: 'Instagram' | 'TikTok' | 'YouTube' | 'Facebook' | 'Google' | 'Referral' | 'Other';
  callType: 'show' | 'close' | 'follow-up';
  status: 'scheduled' | 'completed' | 'no-show' | 'closed' | 'pending';
  revenue: number;
  cashCollected: number;
  setterName: string;
  closerName: string;
  applicationReceived: boolean;
  qualified: boolean;
  notes?: string;
}

export interface DashboardMetrics {
  totalRevenue: number;
  totalCashCollected: number;
  callsDue: number;
  callsTaken: number;
  callsClosed: number;
  showRate: number;
  closeRate: number;
  setterCommission: number;
  closerCommission: number;
  applicationsReceived: number;
  qualifiedLeads: number;
}

export interface LeadSourceData {
  source: string;
  count: number;
  revenue: number;
  percentage: number;
}

export interface CommissionData {
  setterName: string;
  closerName: string;
  setterCommission: number;
  closerCommission: number;
  totalDeals: number;
}