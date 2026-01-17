/**
 * ONE-TIME SETUP PAGE
 * Visit this page once to create the demo user
 * Then you can delete this file
 */

import { useState } from 'react';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

export function SetupPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [details, setDetails] = useState<any>(null);

  const createDemoUser = async () => {
    setStatus('loading');
    setMessage('Creating demo user...');
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/setup-demo-user`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const result = await response.json();
      setDetails(result);

      if (response.ok && result.success) {
        setStatus('success');
        setMessage(result.message);
      } else {
        setStatus('error');
        setMessage(result.error || 'Failed to create demo user');
      }
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Unknown error');
      setDetails({ error: String(err) });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3E2BB8]/5 to-white flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 
            className="text-4xl text-[#1A1A1A] mb-3"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
          >
            Recoverlution Setup
          </h1>
          <p 
            className="text-lg text-gray-600"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            One time demo user creation
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-[20px] border border-gray-200 shadow-lg p-8 md:p-12">
          
          {/* Instructions */}
          <div className="mb-8">
            <h2 
              className="text-xl text-[#1A1A1A] mb-4"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
            >
              Create Demo User
            </h2>
            <p 
              className="text-gray-600 mb-4 leading-relaxed"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Click the button below to create the demo user account. This only needs to be done once.
            </p>
            <div 
              className="bg-[#3E2BB8]/5 rounded-[12px] p-4 border border-[#3E2BB8]/10"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem' }}
            >
              <div className="text-gray-700">
                <strong>Email:</strong> demo@recoverlution.com
              </div>
              <div className="text-gray-700">
                <strong>Password:</strong> recoverlution2025
              </div>
            </div>
          </div>

          {/* Action Button */}
          {status === 'idle' && (
            <button
              onClick={createDemoUser}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] text-white rounded-[12px] shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
            >
              Create Demo User
            </button>
          )}

          {/* Loading State */}
          {status === 'loading' && (
            <div className="flex items-center justify-center gap-3 p-6 bg-blue-50 rounded-[12px] border border-blue-200">
              <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
              <span 
                className="text-blue-700"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
              >
                {message}
              </span>
            </div>
          )}

          {/* Success State */}
          {status === 'success' && (
            <div>
              <div className="flex items-center gap-3 p-6 bg-green-50 rounded-[12px] border border-green-200 mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                <div>
                  <div 
                    className="text-green-900 font-semibold mb-1"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Success!
                  </div>
                  <div 
                    className="text-green-700"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {message}
                  </div>
                </div>
              </div>

              {details && (
                <div 
                  className="bg-gray-50 rounded-[12px] p-4 mb-4 overflow-auto"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}
                >
                  <pre className="text-gray-700">
                    {JSON.stringify(details, null, 2)}
                  </pre>
                </div>
              )}

              <div className="space-y-3">
                <a
                  href="/"
                  className="block w-full text-center px-6 py-4 bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] text-white rounded-[12px] shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
                >
                  Go to Login Page
                </a>
                <p 
                  className="text-center text-gray-500 text-sm"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  You can now delete this setup page
                </p>
              </div>
            </div>
          )}

          {/* Error State */}
          {status === 'error' && (
            <div>
              <div className="flex items-center gap-3 p-6 bg-red-50 rounded-[12px] border border-red-200 mb-4">
                <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                <div>
                  <div 
                    className="text-red-900 font-semibold mb-1"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Setup Failed
                  </div>
                  <div 
                    className="text-red-700"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {message}
                  </div>
                </div>
              </div>

              {details && (
                <div 
                  className="bg-gray-50 rounded-[12px] p-4 mb-4 overflow-auto max-h-48"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}
                >
                  <pre className="text-gray-700">
                    {JSON.stringify(details, null, 2)}
                  </pre>
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={() => setStatus('idle')}
                  className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-[12px] hover:bg-gray-200 transition-colors"
                  style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
                >
                  Try Again
                </button>
                
                <div 
                  className="bg-yellow-50 rounded-[12px] p-4 border border-yellow-200"
                  style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9375rem' }}
                >
                  <p className="text-yellow-900 font-semibold mb-2">Alternative Method:</p>
                  <p className="text-yellow-800 mb-2">
                    Go to your Supabase Dashboard → Authentication → Users → Add User
                  </p>
                  <ul className="text-yellow-800 space-y-1 ml-4">
                    <li>• Email: demo@recoverlution.com</li>
                    <li>• Password: recoverlution2025</li>
                    <li>• Auto Confirm User: YES</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Help */}
        <div className="mt-6 text-center">
          <p 
            className="text-gray-500 text-sm"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Need help? Check <code className="px-2 py-1 bg-gray-100 rounded text-xs">/SETUP_DEMO_USER.md</code> for detailed instructions
          </p>
        </div>

      </div>
    </div>
  );
}
