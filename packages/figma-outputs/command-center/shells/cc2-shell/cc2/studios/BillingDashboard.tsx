/**
 * BILLING DASHBOARD STUDIO
 * Subscription management, invoicing, payment tracking for orgs
 * HIGH VALUE: Financial operations for organisation billing
 */

import { useState, useEffect } from 'react';
import { DollarSign, CreditCard, FileText, Download, AlertCircle, CheckCircle } from 'lucide-react';
import { createClient } from '../../../utils/supabase/client';
import { projectId } from '../../../utils/supabase/info';
import { useUser } from '../../../contexts/UserContext';
import { StudioHeader } from '../shared/StudioHeader';
import { StatsCard } from '../shared/StatsCard';

interface Invoice {
  id: string;
  invoice_number: string;
  billing_period_start: string;
  billing_period_end: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  due_date: string;
  paid_date?: string;
  line_items: Array<{
    description: string;
    quantity: number;
    unit_price: number;
    total: number;
  }>;
}

interface BillingData {
  subscription_tier: 'starter' | 'professional' | 'enterprise';
  monthly_rate: number;
  seats_licensed: number;
  seats_used: number;
  billing_cycle: 'monthly' | 'annual';
  next_billing_date: string;
  payment_method: {
    type: 'card' | 'invoice' | 'ach';
    last_four?: string;
    expiry?: string;
  };
  current_period_usage: {
    active_users: number;
    total_sessions: number;
    storage_gb: number;
  };
  recent_invoices: Invoice[];
}

interface BillingDashboardProps {
  onBack: () => void;
  tenantScope: 'platform' | 'org' | 'professional';
}

export function BillingDashboard({ onBack, tenantScope }: BillingDashboardProps) {
  const { organisationId } = useUser();
  const [data, setData] = useState<BillingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  useEffect(() => {
    loadBillingData();
  }, [organisationId]);

  async function loadBillingData() {
    setLoading(true);
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session || !organisationId) {
        setLoading(false);
        return;
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/organisations/${organisationId}/billing`,
        {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        setData(responseData);
      }
    } catch (error) {
      console.error('[BillingDashboard] Error loading billing data:', error);
    } finally {
      setLoading(false);
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return '#10B981';
      case 'pending': return '#F59E0B';
      case 'overdue': return '#EF4444';
      default: return '#6B7280';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0B0F] text-white">
        <StudioHeader title="Billing Dashboard" subtitle="Loading..." onBack={onBack} />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-[#3E2BB8] border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="opacity-70">Loading billing data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const seatUtilization = (data.seats_used / data.seats_licensed) * 100;
  const overdueInvoices = data.recent_invoices.filter(i => i.status === 'overdue').length;

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">
      <StudioHeader 
        title="Billing Dashboard" 
        subtitle={`${data.subscription_tier.toUpperCase()} Plan • ${data.seats_used}/${data.seats_licensed} seats used`}
        onBack={onBack}
      />

      <div className="p-6 space-y-6">
        {/* Overdue Alert */}
        {overdueInvoices > 0 && (
          <div className="bg-red-500/10 border border-red-500/30 p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <div>
              <p className="text-red-400" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                {overdueInvoices} overdue invoice{overdueInvoices > 1 ? 's' : ''}
              </p>
              <p className="text-sm opacity-70">Please review and pay outstanding invoices</p>
            </div>
          </div>
        )}

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatsCard
            icon={DollarSign}
            label="Monthly Rate"
            value={`$${data.monthly_rate.toLocaleString()}`}
            sublabel={data.billing_cycle === 'annual' ? 'Billed annually' : 'Billed monthly'}
          />
          <StatsCard
            icon={CreditCard}
            label="Seat Utilization"
            value={`${seatUtilization.toFixed(0)}%`}
            sublabel={`${data.seats_used} of ${data.seats_licensed} seats`}
          />
          <StatsCard
            icon={FileText}
            label="Active Users"
            value={data.current_period_usage.active_users}
            sublabel="This billing period"
          />
          <StatsCard
            icon={DollarSign}
            label="Next Billing"
            value={new Date(data.next_billing_date).toLocaleDateString()}
            sublabel={`$${data.monthly_rate.toLocaleString()} due`}
          />
        </div>

        {/* Subscription Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 p-6">
            <h3 className="text-xl mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
              Subscription Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="opacity-70">Plan</span>
                <span className="uppercase" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                  {data.subscription_tier}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">Billing Cycle</span>
                <span className="capitalize">{data.billing_cycle}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">Licensed Seats</span>
                <span>{data.seats_licensed}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">Seats In Use</span>
                <span className={seatUtilization > 90 ? 'text-yellow-400' : ''}>
                  {data.seats_used}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">Next Billing Date</span>
                <span>{new Date(data.next_billing_date).toLocaleDateString()}</span>
              </div>
            </div>

            <button
              className="w-full mt-6 px-4 py-2 bg-[#3E2BB8] hover:bg-[#5739FB] transition-colors text-sm"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
            >
              Manage Subscription
            </button>
          </div>

          <div className="bg-white/5 border border-white/10 p-6">
            <h3 className="text-xl mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
              Payment Method
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CreditCard className="w-8 h-8 opacity-50" />
                <div>
                  <p className="capitalize" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                    {data.payment_method.type === 'card' ? 'Credit Card' : 
                     data.payment_method.type === 'ach' ? 'Bank Account (ACH)' : 'Invoice'}
                  </p>
                  {data.payment_method.last_four && (
                    <p className="text-sm opacity-70">••• {data.payment_method.last_four}</p>
                  )}
                  {data.payment_method.expiry && (
                    <p className="text-sm opacity-70">Expires {data.payment_method.expiry}</p>
                  )}
                </div>
              </div>
            </div>

            <button
              className="w-full mt-6 px-4 py-2 bg-white/5 hover:bg-white/10 transition-colors text-sm"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
            >
              Update Payment Method
            </button>
          </div>
        </div>

        {/* Current Period Usage */}
        <div className="bg-white/5 border border-white/10 p-6">
          <h3 className="text-xl mb-4" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
            Current Period Usage
          </h3>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-sm opacity-70 mb-2">Active Users</p>
              <p className="text-3xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                {data.current_period_usage.active_users}
              </p>
            </div>
            <div>
              <p className="text-sm opacity-70 mb-2">Total Sessions</p>
              <p className="text-3xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                {data.current_period_usage.total_sessions.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm opacity-70 mb-2">Storage Used</p>
              <p className="text-3xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                {data.current_period_usage.storage_gb} GB
              </p>
            </div>
          </div>
        </div>

        {/* Invoices */}
        <div className="bg-white/5 border border-white/10">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
              Recent Invoices
            </h3>
            <button
              className="px-4 py-2 bg-white/5 hover:bg-white/10 transition-colors text-sm flex items-center gap-2"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
            >
              <Download className="w-4 h-4" />
              Export All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-sm opacity-70" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Invoice</th>
                  <th className="text-left py-3 px-4 text-sm opacity-70" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Billing Period</th>
                  <th className="text-left py-3 px-4 text-sm opacity-70" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Amount</th>
                  <th className="text-left py-3 px-4 text-sm opacity-70" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Due Date</th>
                  <th className="text-left py-3 px-4 text-sm opacity-70" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Status</th>
                  <th className="text-left py-3 px-4 text-sm opacity-70" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.recent_invoices.map(invoice => (
                  <tr 
                    key={invoice.id}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                        {invoice.invoice_number}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm">
                      {new Date(invoice.billing_period_start).toLocaleDateString()} - {new Date(invoice.billing_period_end).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                        ${invoice.amount.toLocaleString()}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm">
                      {new Date(invoice.due_date).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <span 
                        className="px-3 py-1 text-xs uppercase flex items-center gap-2 inline-flex"
                        style={{
                          backgroundColor: `${getStatusColor(invoice.status)}20`,
                          color: getStatusColor(invoice.status),
                          border: `1px solid ${getStatusColor(invoice.status)}50`
                        }}
                      >
                        {invoice.status === 'paid' && <CheckCircle className="w-3 h-3" />}
                        {invoice.status === 'overdue' && <AlertCircle className="w-3 h-3" />}
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedInvoice(invoice)}
                          className="px-3 py-1 text-sm bg-white/5 hover:bg-white/10 transition-colors"
                          style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
                        >
                          View
                        </button>
                        <button
                          className="px-3 py-1 text-sm bg-white/5 hover:bg-white/10 transition-colors"
                          style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6"
          onClick={() => setSelectedInvoice(null)}
        >
          <div 
            className="bg-[#0A0B0F] border border-white/20 p-8 max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl mb-1" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                  {selectedInvoice.invoice_number}
                </h2>
                <p className="text-sm opacity-50">
                  {new Date(selectedInvoice.billing_period_start).toLocaleDateString()} - {new Date(selectedInvoice.billing_period_end).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="p-2 hover:bg-white/10 transition-colors"
              >
                <span className="text-2xl">&times;</span>
              </button>
            </div>

            {/* Line Items */}
            <div className="mb-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 text-sm opacity-70">Description</th>
                    <th className="text-right py-2 text-sm opacity-70">Qty</th>
                    <th className="text-right py-2 text-sm opacity-70">Unit Price</th>
                    <th className="text-right py-2 text-sm opacity-70">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoice.line_items.map((item, idx) => (
                    <tr key={idx} className="border-b border-white/5">
                      <td className="py-3">{item.description}</td>
                      <td className="py-3 text-right">{item.quantity}</td>
                      <td className="py-3 text-right">${item.unit_price}</td>
                      <td className="py-3 text-right" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                        ${item.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-white/10">
                    <td colSpan={3} className="py-3 text-right" style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>
                      Total
                    </td>
                    <td className="py-3 text-right text-xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                      ${selectedInvoice.amount.toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="flex gap-3">
              <button
                className="flex-1 px-4 py-3 bg-[#3E2BB8] hover:bg-[#5739FB] transition-colors"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
              >
                <Download className="w-4 h-4 inline mr-2" />
                Download PDF
              </button>
              {selectedInvoice.status !== 'paid' && (
                <button
                  className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 transition-colors"
                  style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
                >
                  Pay Now
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
