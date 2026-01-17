import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, RefreshCw, CheckCircle, Mail, Calendar, DollarSign } from 'lucide-react';
import { createClient } from '../../utils/supabase/client';

// Initialize Supabase client once
const supabase = createClient();

interface FoundingMember {
  id: string;
  email: string;
  tier: string;
  amount_paid: number;
  status: string;
  stripe_customer_id?: string;
  stripe_payment_intent_id?: string;
  metadata?: any;
  created_at: string;
}

export default function FoundingMembersAdmin() {
  const [members, setMembers] = useState<FoundingMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMembers = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from('founding_members_therapy')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setMembers(data || []);
    } catch (err) {
      console.error('Error fetching founding members:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTierColor = (tier: string) => {
    return tier === 'professional' ? '#5739FB' : '#3E2BB8';
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '2.5rem',
              letterSpacing: '-0.03em',
              color: 'var(--color-text-primary)',
              marginBottom: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}
          >
            <Users size={32} style={{ color: '#3E2BB8' }} />
            Founding Members
          </h1>
          <p
            style={{
              fontSize: '1.125rem',
              color: 'var(--color-text-secondary)',
              fontWeight: 500
            }}
          >
            Recoverlution Continuity founding practitioner program
          </p>
        </div>

        <button
          onClick={fetchMembers}
          disabled={loading}
          style={{
            padding: '0.875rem 1.5rem',
            backgroundColor: '#3E2BB8',
            color: '#FFFFFF',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '0.9375rem',
            letterSpacing: '-0.01em',
            borderRadius: '0px',
            border: 'none',
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            opacity: loading ? 0.6 : 1,
            transition: 'all 0.2s ease'
          }}
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} strokeWidth={2.5} />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div
          style={{
            padding: '1.5rem',
            backgroundColor: 'var(--color-background)',
            border: '2px solid var(--color-border)',
            borderRadius: '0px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <Users size={20} style={{ color: '#3E2BB8' }} strokeWidth={2.5} />
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Total Members
            </span>
          </div>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.5rem', letterSpacing: '-0.03em', color: 'var(--color-text-primary)' }}>
            {members.length}
          </p>
        </div>

        <div
          style={{
            padding: '1.5rem',
            backgroundColor: 'var(--color-background)',
            border: '2px solid var(--color-border)',
            borderRadius: '0px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <DollarSign size={20} style={{ color: '#3E2BB8' }} strokeWidth={2.5} />
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Total Revenue
            </span>
          </div>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.5rem', letterSpacing: '-0.03em', color: 'var(--color-text-primary)' }}>
            £{members.reduce((sum, m) => sum + Number(m.amount_paid), 0).toFixed(0)}
          </p>
        </div>

        <div
          style={{
            padding: '1.5rem',
            backgroundColor: 'var(--color-background)',
            border: '2px solid var(--color-border)',
            borderRadius: '0px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <CheckCircle size={20} style={{ color: '#3E2BB8' }} strokeWidth={2.5} />
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Active
            </span>
          </div>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '2.5rem', letterSpacing: '-0.03em', color: 'var(--color-text-primary)' }}>
            {members.filter(m => m.status === 'active').length}
          </p>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div
          style={{
            padding: '1.5rem',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '2px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '0px',
            marginBottom: '2rem'
          }}
        >
          <p style={{ fontSize: '0.9375rem', color: '#DC2626', fontWeight: 600 }}>
            Error: {error}
          </p>
          <p style={{ fontSize: '0.875rem', color: '#DC2626', marginTop: '0.5rem' }}>
            Make sure the founding_members_therapy table exists and RLS policies are configured.
          </p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          <RefreshCw size={32} className="animate-spin" style={{ color: '#3E2BB8', margin: '0 auto' }} />
          <p style={{ marginTop: '1rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
            Loading founding members...
          </p>
        </div>
      )}

      {/* Members Table */}
      {!loading && !error && members.length === 0 && (
        <div
          style={{
            padding: '4rem 2rem',
            textAlign: 'center',
            backgroundColor: 'var(--color-background)',
            border: '2px solid var(--color-border)',
            borderRadius: '0px'
          }}
        >
          <Users size={48} style={{ color: 'var(--color-text-secondary)', margin: '0 auto 1rem' }} />
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1.5rem',
              color: 'var(--color-text-primary)',
              marginBottom: '0.5rem'
            }}
          >
            No founding members yet
          </h3>
          <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)' }}>
            Members will appear here after completing checkout.
          </p>
        </div>
      )}

      {!loading && !error && members.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-background)', borderBottom: '2px solid var(--color-border)' }}>
                <th style={{ padding: '1rem', textAlign: 'left', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.875rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Mail size={14} />
                    Email
                  </div>
                </th>
                <th style={{ padding: '1rem', textAlign: 'left', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.875rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>
                  Tier
                </th>
                <th style={{ padding: '1rem', textAlign: 'left', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.875rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <DollarSign size={14} />
                    Amount
                  </div>
                </th>
                <th style={{ padding: '1rem', textAlign: 'left', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.875rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>
                  Status
                </th>
                <th style={{ padding: '1rem', textAlign: 'left', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.875rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Calendar size={14} />
                    Joined
                  </div>
                </th>
                <th style={{ padding: '1rem', textAlign: 'left', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.875rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>
                  Stripe
                </th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <motion.tr
                  key={member.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ borderBottom: '1px solid var(--color-border)' }}
                >
                  <td style={{ padding: '1rem' }}>
                    <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      {member.email}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '0.375rem 0.75rem',
                        backgroundColor: getTierColor(member.tier),
                        color: '#FFFFFF',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        borderRadius: '0px'
                      }}
                    >
                      {member.tier}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                      £{Number(member.amount_paid).toFixed(2)}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      <CheckCircle size={14} style={{ color: '#10B981' }} strokeWidth={2.5} />
                      <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#10B981', textTransform: 'capitalize' }}>
                        {member.status}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                      {formatDate(member.created_at)}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    {member.stripe_customer_id && (
                      <a
                        href={`https://dashboard.stripe.com/customers/${member.stripe_customer_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: '0.8125rem',
                          color: '#3E2BB8',
                          textDecoration: 'none',
                          fontFamily: 'monospace',
                          fontWeight: 600
                        }}
                      >
                        {member.stripe_customer_id.substring(0, 16)}...
                      </a>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}