/**
 * SETTINGS PAGE
 * Comprehensive user settings & preferences
 * Sections: Profile, Notifications, Privacy, Integrations, Billing
 */

import { useState } from 'react';
import { User, Bell, Shield, Link as LinkIcon, CreditCard, Save, Check } from 'lucide-react';

export default function SettingsPage({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [tab, setTab] = useState<'profile' | 'notifications' | 'privacy' | 'integrations' | 'billing'>('profile');
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="min-h-screen bg-[#0A0118]">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#0A0118]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl">Settings</h1>
            <button
              onClick={() => onNavigate('Dashboard')}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-all"
            >
              Back
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="col-span-1 space-y-2">
            {[
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'notifications', label: 'Notifications', icon: Bell },
              { id: 'privacy', label: 'Privacy & Consent', icon: Shield },
              { id: 'integrations', label: 'Integrations', icon: LinkIcon },
              { id: 'billing', label: 'Billing', icon: CreditCard },
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => setTab(section.id as any)}
                className={`w-full px-4 py-3 rounded text-left transition-all flex items-center gap-3 ${
                  tab === section.id
                    ? 'bg-[#5739FB]/20 text-white border border-[#5739FB]/50'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                <section.icon className="w-4 h-4" />
                {section.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="col-span-3">
            {tab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl mb-6">Profile Settings</h2>
                </div>

                <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Display Name</label>
                    <input
                      type="text"
                      defaultValue="John Doe"
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded focus:outline-none focus:ring-2 focus:ring-[#5739FB]/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="john@example.com"
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded focus:outline-none focus:ring-2 focus:ring-[#5739FB]/50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">Bio</label>
                    <textarea
                      defaultValue="On my recovery journey..."
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded focus:outline-none focus:ring-2 focus:ring-[#5739FB]/50 h-24"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/60 mb-2">Timezone</label>
                    <select className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded focus:outline-none focus:ring-2 focus:ring-[#5739FB]/50">
                      <option>Pacific Time (PT)</option>
                      <option>Mountain Time (MT)</option>
                      <option>Central Time (CT)</option>
                      <option>Eastern Time (ET)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {tab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl mb-6">Notification Preferences</h2>
                </div>

                <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-4">
                  {[
                    { label: 'NaviCue Nudges', desc: 'Receive daily micro-interventions' },
                    { label: 'Practice Reminders', desc: 'Get reminded to complete daily practices' },
                    { label: 'Peer Messages', desc: 'Notifications when connections message you' },
                    { label: 'Professional Appointments', desc: 'Reminders for upcoming sessions' },
                    { label: 'Weekly Progress Summary', desc: 'Get a weekly recap of your progress' },
                  ].map((setting, idx) => (
                    <div key={idx} className="flex items-start justify-between p-4 bg-white/5 rounded">
                      <div>
                        <h3 className="text-white mb-1">{setting.label}</h3>
                        <p className="text-white/40 text-sm">{setting.desc}</p>
                      </div>
                      <input type="checkbox" defaultChecked className="mt-1" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'privacy' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl mb-6">Privacy & Consent</h2>
                </div>

                <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-4">
                  <div>
                    <h3 className="text-lg mb-4">Data Sharing Consent</h3>
                    {[
                      { label: 'Share progress with connected professionals', desc: 'Allow professionals to see your practice completion and state data' },
                      { label: 'Share insights with family members', desc: 'Let family connections see high-level progress (requires explicit consent per connection)' },
                      { label: 'Participate in anonymized research', desc: 'Help improve recovery outcomes through de-identified data' },
                      { label: 'Allow peer discovery', desc: 'Let others find and connect with you' },
                    ].map((consent, idx) => (
                      <div key={idx} className="flex items-start justify-between p-4 bg-white/5 rounded mb-3">
                        <div className="flex-1">
                          <h4 className="text-white mb-1">{consent.label}</h4>
                          <p className="text-white/40 text-sm">{consent.desc}</p>
                        </div>
                        <input type="checkbox" className="mt-1" />
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <h3 className="text-lg mb-2">Data Export</h3>
                    <p className="text-white/60 text-sm mb-4">
                      Download all your data in JSON format. You own your data.
                    </p>
                    <button className="px-4 py-2 bg-[#5739FB] text-white rounded hover:bg-[#3E2BB8] transition-all">
                      Export My Data
                    </button>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <h3 className="text-lg mb-2 text-red-400">Delete Account</h3>
                    <p className="text-white/60 text-sm mb-4">
                      Permanently delete your account and all associated data. This cannot be undone.
                    </p>
                    <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-all">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {tab === 'integrations' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl mb-6">Connected Integrations</h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'Apple Health', connected: true, icon: '🍎' },
                    { name: 'Fitbit', connected: false, icon: '⌚' },
                    { name: 'Strava', connected: false, icon: '🏃' },
                    { name: 'Google Calendar', connected: true, icon: '📅' },
                    { name: 'Zoom', connected: false, icon: '📹' },
                    { name: 'Slack', connected: false, icon: '💬' },
                  ].map((integration, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-white/5 border border-white/10 rounded-xl"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{integration.icon}</span>
                          <h3 className="text-white">{integration.name}</h3>
                        </div>
                        {integration.connected && (
                          <Check className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                      <button
                        className={`w-full px-3 py-2 rounded text-sm transition-all ${
                          integration.connected
                            ? 'bg-white/10 hover:bg-white/20 text-white'
                            : 'bg-[#5739FB] hover:bg-[#3E2BB8] text-white'
                        }`}
                      >
                        {integration.connected ? 'Disconnect' : 'Connect'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'billing' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl mb-6">Billing & Subscription</h2>
                </div>

                <div className="p-6 bg-gradient-to-br from-[#5739FB]/10 to-[#3E2BB8]/10 border border-[#5739FB]/30 rounded-xl">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl mb-1">Individual Plan</h3>
                      <p className="text-white/60">$29/month · Billed monthly</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl mb-1">$29</p>
                      <p className="text-white/40 text-sm">per month</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded transition-all">
                      Change Plan
                    </button>
                    <button className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded transition-all">
                      Cancel Subscription
                    </button>
                  </div>
                </div>

                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <h3 className="text-lg mb-4">Payment Method</h3>
                  <div className="flex items-center gap-3 mb-4 p-3 bg-white/5 rounded">
                    <CreditCard className="w-5 h-5 text-white/60" />
                    <div className="flex-1">
                      <p className="text-white">•••• •••• •••• 4242</p>
                      <p className="text-white/40 text-sm">Expires 12/26</p>
                    </div>
                    <button className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-sm transition-all">
                      Update
                    </button>
                  </div>
                </div>

                <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <h3 className="text-lg mb-4">Billing History</h3>
                  <div className="space-y-2">
                    {[
                      { date: 'Dec 1, 2025', amount: '$29.00', status: 'Paid' },
                      { date: 'Nov 1, 2025', amount: '$29.00', status: 'Paid' },
                      { date: 'Oct 1, 2025', amount: '$29.00', status: 'Paid' },
                    ].map((invoice, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded">
                        <span className="text-white/80">{invoice.date}</span>
                        <span className="text-white">{invoice.amount}</span>
                        <span className="px-2 py-1 bg-green-500/20 text-green-500 rounded text-xs">
                          {invoice.status}
                        </span>
                        <button className="text-[#5739FB] hover:underline text-sm">
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="mt-8 flex gap-3">
              <button
                onClick={handleSave}
                className="px-6 py-3 bg-[#5739FB] text-white rounded hover:bg-[#3E2BB8] transition-all flex items-center gap-2"
              >
                {saved ? (
                  <>
                    <Check className="w-4 h-4" />
                    Saved!
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </button>
              <button className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-all">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
