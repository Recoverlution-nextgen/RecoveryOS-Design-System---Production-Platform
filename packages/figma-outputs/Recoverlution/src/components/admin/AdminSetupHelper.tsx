import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, Copy, User, ArrowLeft } from 'lucide-react';
import { createClient } from '../../utils/supabase/client';

/**
 * ADMIN SETUP HELPER
 * Shows your user_id and SQL to add yourself as admin
 */
interface AdminSetupHelperProps {
  onBack?: () => void;
}

export default function AdminSetupHelper({ onBack }: AdminSetupHelperProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setUserId(user.id);
        setEmail(user.email || null);
      }
    } catch (error) {
      console.error('[AdminSetupHelper] Error loading user:', error);
    } finally {
      setLoading(false);
    }
  }

  const sqlCommand = userId 
    ? `INSERT INTO app_admins (user_id, created_by, notes)
VALUES ('${userId}', 'self-service', 'Platform admin')
ON CONFLICT (user_id) DO NOTHING;`
    : '';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center text-[var(--text-muted)]">
          Loading user info...
        </div>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="p-8">
        <div className="p-4 bg-red-900/20 border border-red-500/30 text-red-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold mb-1">Not Signed In</h3>
              <p className="text-sm text-red-200/80">
                Please sign in to view your user ID and admin setup instructions.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--text-default)] mb-2">
          Admin Setup Helper
        </h1>
        <p className="text-sm text-[var(--text-muted)]">
          Add yourself to the app_admins table to access Media Enrichment
        </p>
      </div>

      {/* Current User Info */}
      <div className="mb-6 p-6 bg-[var(--bg-surface)] border border-[var(--border-default)]">
        <h2 className="text-lg font-semibold text-[var(--text-default)] mb-4">
          Your Account
        </h2>
        
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-[var(--text-muted)] mb-1">
              Email
            </label>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-[var(--text-muted)]" />
              <span className="text-sm text-[var(--text-default)] font-mono">
                {email || 'Unknown'}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs text-[var(--text-muted)] mb-1">
              User ID
            </label>
            <div className="flex items-center gap-2">
              <code className="text-sm text-[var(--brand-primary)] font-mono bg-[var(--bg-default)] px-2 py-1 flex-1">
                {userId}
              </code>
              <button
                onClick={copyToClipboard}
                className="px-3 py-1 text-xs bg-[var(--bg-default)] border border-[var(--border-default)] hover:border-[var(--brand-primary)] transition-colors flex items-center gap-1"
              >
                <Copy className="w-3 h-3" />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SQL Command */}
      <div className="mb-6 p-6 bg-[var(--bg-surface)] border border-[var(--border-default)]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[var(--text-default)]">
            SQL Command
          </h2>
          <button
            onClick={copyToClipboard}
            className="px-3 py-1.5 text-xs bg-[var(--brand-primary)] text-white hover:opacity-90 transition-opacity flex items-center gap-1"
          >
            <Copy className="w-3 h-3" />
            {copied ? 'Copied!' : 'Copy SQL'}
          </button>
        </div>

        <pre className="text-xs text-[var(--text-default)] bg-[var(--bg-default)] p-4 overflow-auto border border-[var(--border-default)] font-mono">
{sqlCommand}
        </pre>
      </div>

      {/* Instructions */}
      <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-default)]">
        <h2 className="text-lg font-semibold text-[var(--text-default)] mb-4">
          Instructions
        </h2>

        <div className="space-y-4 text-sm text-[var(--text-muted)]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-[var(--brand-primary)] text-white flex items-center justify-center text-xs font-bold">
                1
              </div>
              <span className="font-semibold text-[var(--text-default)]">
                Copy the SQL command above
              </span>
            </div>
            <p className="ml-8">
              Click the "Copy SQL" button to copy the INSERT statement to your clipboard.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-[var(--brand-primary)] text-white flex items-center justify-center text-xs font-bold">
                2
              </div>
              <span className="font-semibold text-[var(--text-default)]">
                Run the SQL in your database
              </span>
            </div>
            <p className="ml-8 mb-2">
              Option A: Use Supabase Dashboard SQL Editor
            </p>
            <ul className="ml-8 space-y-1 text-xs list-disc list-inside">
              <li>Go to your Supabase project dashboard</li>
              <li>Navigate to SQL Editor</li>
              <li>Paste the SQL command</li>
              <li>Click Run</li>
            </ul>
            <p className="ml-8 mt-2 mb-2">
              Option B: Use psql command line
            </p>
            <div className="ml-8">
              <code className="text-xs bg-[var(--bg-default)] px-2 py-1 block overflow-auto">
                psql $SUPABASE_DB_URL -c "PASTE_SQL_HERE"
              </code>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-[var(--brand-primary)] text-white flex items-center justify-center text-xs font-bold">
                3
              </div>
              <span className="font-semibold text-[var(--text-default)]">
                Verify admin status
              </span>
            </div>
            <p className="ml-8 mb-2">
              Run this query to confirm you're now an admin:
            </p>
            <pre className="ml-8 text-xs bg-[var(--bg-default)] px-2 py-1 overflow-auto">
SELECT * FROM app_admins WHERE user_id = '{userId}';
            </pre>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 bg-green-600 text-white flex items-center justify-center text-xs font-bold">
                <CheckCircle className="w-4 h-4" />
              </div>
              <span className="font-semibold text-[var(--text-default)]">
                Access Media Enrichment
              </span>
            </div>
            <p className="ml-8">
              After adding yourself as admin, return to Command Center 2 and click 
              the "Media Enrichment" studio. The error should be gone!
            </p>
          </div>
        </div>
      </div>

      {/* Warning */}
      <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-500/30 text-yellow-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold mb-1">Important</h3>
            <p className="text-sm text-yellow-200/80">
              Admin access grants privileged operations like media enrichment. Only add 
              trusted users to the app_admins table. This operation requires direct database 
              access (SQL Editor or service role key).
            </p>
          </div>
        </div>
      </div>

      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="mt-6 px-4 py-2 bg-[var(--bg-default)] border border-[var(--border-default)] hover:border-[var(--brand-primary)] transition-colors flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
      )}
    </div>
  );
}