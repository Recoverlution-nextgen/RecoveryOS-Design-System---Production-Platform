import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

interface EnterpriseContactFormProps {
  onBack: () => void;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function EnterpriseContactForm({ onBack }: EnterpriseContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    role: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/enterprise-contacts/submit`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit contact form');
      }

      console.log('✅ Enterprise contact submitted:', data);
      setStatus('success');

    } catch (error) {
      console.error('❌ Error submitting enterprise contact:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center py-16"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 mb-6">
          <CheckCircle2 size={40} className="text-white" />
        </div>
        
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: '#FFFFFF',
            marginBottom: '1rem'
          }}
        >
          Thank you
        </h3>
        
        <p
          style={{
            fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
            lineHeight: 1.5,
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '3rem',
            maxWidth: '600px',
            margin: '0 auto'
          }}
        >
          We received your inquiry and will be in touch within 24 hours to discuss how Recoverlution can support your organization.
        </p>

        <button
          onClick={onBack}
          style={{
            padding: '1rem 2rem',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#FFFFFF',
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            borderRadius: '0px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
          }}
        >
          Back to pricing
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="mb-8">
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: '#FFFFFF',
            marginBottom: '1rem'
          }}
        >
          Enterprise inquiry
        </h3>
        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            lineHeight: 1.5,
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '0.5rem'
          }}
        >
          Tell us about your organization and we will design a solution that fits your infrastructure.
        </p>
      </div>

      {/* Error Message */}
      {status === 'error' && (
        <div
          style={{
            padding: '1rem 1.5rem',
            backgroundColor: 'rgba(239, 68, 68, 0.15)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '0px',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}
        >
          <AlertCircle size={20} className="text-red-300 flex-shrink-0" />
          <p style={{ color: 'rgba(255, 255, 255, 0.95)', margin: 0 }}>
            {errorMessage}
          </p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              style={{
                display: 'block',
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 600,
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                letterSpacing: '0.02em'
              }}
            >
              Full name <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              disabled={status === 'submitting'}
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '0px',
                color: '#FFFFFF',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              style={{
                display: 'block',
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 600,
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                letterSpacing: '0.02em'
              }}
            >
              Email address <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              disabled={status === 'submitting'}
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '0px',
                color: '#FFFFFF',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
            />
          </div>

          {/* Organization */}
          <div>
            <label
              htmlFor="organization"
              style={{
                display: 'block',
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 600,
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                letterSpacing: '0.02em'
              }}
            >
              Organization <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>*</span>
            </label>
            <input
              type="text"
              id="organization"
              name="organization"
              required
              value={formData.organization}
              onChange={handleChange}
              disabled={status === 'submitting'}
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '0px',
                color: '#FFFFFF',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
            />
          </div>

          {/* Role */}
          <div>
            <label
              htmlFor="role"
              style={{
                display: 'block',
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 600,
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                letterSpacing: '0.02em'
              }}
            >
              Your role
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled={status === 'submitting'}
              placeholder="e.g., Clinical Director"
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '0px',
                color: '#FFFFFF',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
            />
          </div>

          {/* Phone */}
          <div className="md:col-span-2">
            <label
              htmlFor="phone"
              style={{
                display: 'block',
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 600,
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                letterSpacing: '0.02em'
              }}
            >
              Phone number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={status === 'submitting'}
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '0px',
                color: '#FFFFFF',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
            />
          </div>

          {/* Message */}
          <div className="md:col-span-2">
            <label
              htmlFor="message"
              style={{
                display: 'block',
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 600,
                marginBottom: '0.5rem',
                fontSize: '0.875rem',
                letterSpacing: '0.02em'
              }}
            >
              Tell us about your needs
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              disabled={status === 'submitting'}
              placeholder="Number of facilities, patient volume, specific requirements..."
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '0px',
                color: '#FFFFFF',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.2s ease',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={onBack}
            disabled={status === 'submitting'}
            style={{
              padding: '1rem 1.5rem',
              backgroundColor: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'rgba(255, 255, 255, 0.9)',
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              borderRadius: '0px',
              opacity: status === 'submitting' ? 0.5 : 1
            }}
            onMouseEnter={(e) => {
              if (status !== 'submitting') {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Back
          </button>

          <button
            type="submit"
            disabled={status === 'submitting'}
            style={{
              padding: '1rem 2rem',
              backgroundColor: '#FFFFFF',
              border: 'none',
              color: 'var(--color-primary)',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              borderRadius: '0px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              opacity: status === 'submitting' ? 0.7 : 1
            }}
            onMouseEnter={(e) => {
              if (status !== 'submitting') {
                e.currentTarget.style.transform = 'translateX(4px)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateX(0)';
            }}
          >
            {status === 'submitting' ? 'Submitting...' : 'Submit inquiry'}
            {status !== 'submitting' && <ArrowRight size={18} />}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
