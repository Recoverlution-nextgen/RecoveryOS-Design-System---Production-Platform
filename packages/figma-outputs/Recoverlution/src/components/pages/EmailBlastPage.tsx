import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { SEOHead } from "../SEOHead";
import { Mail, Send, CheckCircle, XCircle, Loader2, Upload, Download } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import { projectId, publicAnonKey } from "../../utils/supabase/info";

interface EmailBlastPageProps {
  onNavigate?: (page: string) => void;
}

interface Contact {
  name: string;
  email: string;
  company?: string;
  status?: 'pending' | 'sending' | 'sent' | 'failed';
  error?: string;
}

export function EmailBlastPage({ onNavigate }: EmailBlastPageProps) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [inputText, setInputText] = useState('');
  const [subject, setSubject] = useState('Five years. One question.');
  const [emailBody, setEmailBody] = useState(`Recoverlutionists,

Five years ago, I founded Recoverlution to connect the world of recovery. We learned the hard way that the B2C market wasn't just tough to crack - the market wasn't ready for it.

But there was really only one question I needed to answer: **If I'd had Recoverlution before it all hit the fan, would it have stopped the demise?**

With v1, the answer was No.

So we rebuilt it. **We built a platform where the answer to that question is Yes.** No matter what it takes. Without compromise. One mandate: save people's lives.

Medicine, science, nutrition, and awareness have all improved dramatically over the past century. And yet addiction keeps getting worse.

**So that's our mandate: build technology that actually works.**

Recoverlution exists because I refused to accept that recovery had to be this hard. It's the system I wished had existed - one that respects the complexity of the human brain, honors the non-linear nature of healing, and makes evidence-based recovery accessible without the shame, pressure, or false promises.

**We're the sum of all our parts.** We've gone B2B because that's where the patients are, patients who can find a lifelong recovery vehicle. Our ecosystem will expand far and wide.

Have a look: **recoverlution.com**

If you're keen to be one of the first to see the platform in action, **book in and we'll walk you through it**.

**Schedule your demo**: recoverlution.com/demo

Daniel`);
  const [fromName, setFromName] = useState('Recoverlution');
  const [fromEmail, setFromEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendingProgress, setSendingProgress] = useState({ sent: 0, total: 0 });

  // Parse contacts from text input
  const parseContacts = () => {
    const lines = inputText.split('\n').filter(line => line.trim());
    const parsed: Contact[] = [];

    lines.forEach(line => {
      // Try to parse: "Name <email@domain.com>" or "Name, email@domain.com" or "email@domain.com"
      const emailMatch = line.match(/[\w.-]+@[\w.-]+\.\w+/);
      if (emailMatch) {
        const email = emailMatch[0];
        let name = line.replace(email, '').replace(/[<>,]/g, '').trim();
        
        // If no name, use first part of email
        if (!name) {
          name = email.split('@')[0].split('.').map(s => 
            s.charAt(0).toUpperCase() + s.slice(1)
          ).join(' ');
        }

        parsed.push({ name, email, status: 'pending' });
      }
    });

    setContacts(parsed);
  };

  // Import CSV
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split('\n').filter(line => line.trim());
      const parsed: Contact[] = [];

      // Skip header row if it looks like CSV headers
      const startIndex = lines[0].toLowerCase().includes('name') || lines[0].toLowerCase().includes('email') ? 1 : 0;

      for (let i = startIndex; i < lines.length; i++) {
        const parts = lines[i].split(',').map(p => p.trim().replace(/"/g, ''));
        
        if (parts.length >= 2) {
          // Assume format: Name, Email or Email, Name
          const emailIndex = parts.findIndex(p => p.includes('@'));
          if (emailIndex !== -1) {
            const email = parts[emailIndex];
            const name = parts[emailIndex === 0 ? 1 : 0];
            parsed.push({ name, email, status: 'pending' });
          }
        } else if (parts[0].includes('@')) {
          // Just email
          const email = parts[0];
          const name = email.split('@')[0].split('.').map(s => 
            s.charAt(0).toUpperCase() + s.slice(1)
          ).join(' ');
          parsed.push({ name, email, status: 'pending' });
        }
      }

      setContacts(parsed);
    };
    reader.readAsText(file);
  };

  // Download template CSV
  const downloadTemplate = () => {
    const csv = 'Name,Email,Company\nJohn Doe,john@rehab.com,ABC Rehab\nJane Smith,jane@facility.com,XYZ Recovery';
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'email-blast-template.csv';
    a.click();
  };

  // Send emails
  const sendEmails = async () => {
    if (contacts.length === 0) {
      alert('Please add contacts first');
      return;
    }

    if (!fromEmail) {
      alert('Please enter your "From" email address');
      return;
    }

    setIsSending(true);
    setSendingProgress({ sent: 0, total: contacts.length });

    for (let i = 0; i < contacts.length; i++) {
      const contact = contacts[i];
      
      // Skip if already sent successfully
      if (contact.status === 'sent') {
        continue;
      }
      
      // Update status to sending
      setContacts(prev => prev.map((c, idx) => 
        idx === i ? { ...c, status: 'sending' as const } : c
      ));

      let retries = 0;
      let success = false;

      while (!success && retries < 3) {
        try {
          // Personalize email body
          const personalizedBody = emailBody
            .replace(/\[Name\]/g, contact.name)
            .replace(/Hi ,/g, `Hi ${contact.name},`);

          // Send via server endpoint
          const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/send-email`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${publicAnonKey}`,
            },
            body: JSON.stringify({
              to: contact.email,
              from: `${fromName} <${fromEmail}>`,
              subject: subject,
              body: personalizedBody,
            }),
          });

          if (response.ok) {
            setContacts(prev => prev.map((c, idx) => 
              idx === i ? { ...c, status: 'sent' as const } : c
            ));
            setSendingProgress(prev => ({ ...prev, sent: prev.sent + 1 }));
            success = true;
          } else {
            const errorText = await response.text();
            
            // Check if it's a rate limit error
            if (response.status === 429) {
              retries++;
              if (retries < 3) {
                // Wait longer before retry (exponential backoff: 3s, 6s, 9s)
                const waitTime = 3000 * retries;
                console.log(`⚠️ Rate limited on ${contact.email}, retry ${retries}/3 in ${waitTime/1000}s`);
                await new Promise(resolve => setTimeout(resolve, waitTime));
                continue;
              }
            }
            
            // If not rate limit or max retries reached, mark as failed
            setContacts(prev => prev.map((c, idx) => 
              idx === i ? { ...c, status: 'failed' as const, error: errorText } : c
            ));
            break;
          }

        } catch (error) {
          setContacts(prev => prev.map((c, idx) => 
            idx === i ? { ...c, status: 'failed' as const, error: String(error) } : c
          ));
          break;
        }
      }

      // Rate limiting: wait 1000ms between emails (1 request/second - safely under 2/sec limit)
      // This prevents hitting Resend's rate limit of 2 requests per second
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setIsSending(false);
  };

  // Test send to yourself
  const sendTest = async () => {
    if (!fromEmail) {
      alert('Please enter your "From" email address');
      return;
    }

    const testBody = emailBody.replace(/\[Name\]/g, 'Test User');

    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-49b28b8a/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          to: fromEmail,
          from: `${fromName} <${fromEmail}>`,
          subject: `[TEST] ${subject}`,
          body: testBody,
        }),
      });

      if (response.ok) {
        alert(`Test email sent to ${fromEmail}! Check your inbox.`);
      } else {
        alert('Failed to send test email. Check console for errors.');
      }
    } catch (error) {
      alert(`Error: ${error}`);
    }
  };

  const sentCount = contacts.filter(c => c.status === 'sent').length;
  const failedCount = contacts.filter(c => c.status === 'failed').length;
  const pendingCount = contacts.filter(c => c.status === 'pending').length;

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <SEOHead 
        title="Email Blast Tool - Recoverlution"
        description="Internal email blast tool"
        noIndex={true}
      />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#5739FB] flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#1A1A1A]">Email Blast Tool</h1>
              <p className="text-gray-600">Send personalized CEO announcements</p>
            </div>
          </div>

          <Alert className="bg-[#5739FB]/5 border-[#5739FB]/20">
            <AlertDescription className="text-gray-700">
              <strong>Quick Start:</strong> (1) Enter your from email, (2) Paste contacts below, (3) Click "Parse Contacts", (4) Send test email, (5) Blast!
            </AlertDescription>
          </Alert>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column: Email Setup */}
          <div className="space-y-6">
            {/* From Email */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">From Email</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Email Address</label>
                  <Input
                    placeholder="your.email@recoverlution.com"
                    value={fromEmail}
                    onChange={(e) => setFromEmail(e.target.value)}
                    className="bg-white"
                  />
                  <p className="text-xs text-gray-500 mt-1">This must be a verified sender in Resend</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From Name</label>
                  <Input
                    placeholder="Recoverlution"
                    value={fromName}
                    onChange={(e) => setFromName(e.target.value)}
                    className="bg-white"
                  />
                </div>
              </div>
            </Card>

            {/* Subject Line */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">Subject Line</h2>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-white"
              />
            </Card>

            {/* Email Body */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">Email Body</h2>
              <p className="text-sm text-gray-600 mb-3">Use <code className="bg-gray-100 px-1 py-0.5 rounded">[Name]</code> to personalize</p>
              <Textarea
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                rows={18}
                className="bg-white font-mono text-sm"
              />
            </Card>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                onClick={sendTest}
                variant="outline"
                className="flex-1"
                disabled={!fromEmail}
              >
                <Mail className="w-4 h-4 mr-2" />
                Send Test to Yourself
              </Button>
              <Button
                onClick={sendEmails}
                className="flex-1 bg-[#5739FB] hover:bg-[#3E2BB8]"
                disabled={isSending || contacts.length === 0 || !fromEmail}
              >
                {isSending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending {sendingProgress.sent}/{sendingProgress.total}
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send to All ({contacts.length})
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Right Column: Contacts */}
          <div className="space-y-6">
            {/* Import Contacts */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-[#1A1A1A] mb-4">Add Contacts</h2>
              
              {/* CSV Upload */}
              <div className="mb-4">
                <div className="flex gap-2 mb-3">
                  <Button
                    onClick={() => document.getElementById('csv-upload')?.click()}
                    variant="outline"
                    className="flex-1"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload CSV
                  </Button>
                  <Button
                    onClick={downloadTemplate}
                    variant="outline"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Template
                  </Button>
                </div>
                <input
                  id="csv-upload"
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              <div className="relative mb-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-2 text-gray-500">or paste below</span>
                </div>
              </div>

              {/* Manual Input */}
              <Textarea
                placeholder="Paste contacts here. One per line:&#10;John Doe <john@rehab.com>&#10;Jane Smith, jane@facility.com&#10;bob@recovery.org"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={8}
                className="bg-white font-mono text-sm mb-3"
              />
              
              <Button
                onClick={parseContacts}
                variant="outline"
                className="w-full"
              >
                Parse Contacts
              </Button>
            </Card>

            {/* Contacts List */}
            {contacts.length > 0 && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-[#1A1A1A]">
                    Contacts ({contacts.length})
                  </h2>
                  <div className="flex gap-4 text-sm">
                    <span className="text-gray-600">{pendingCount} pending</span>
                    <span className="text-green-600">{sentCount} sent</span>
                    {failedCount > 0 && <span className="text-red-600">{failedCount} failed</span>}
                  </div>
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {contacts.map((contact, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 truncate">{contact.name}</div>
                        <div className="text-sm text-gray-500 truncate">{contact.email}</div>
                        {contact.error && (
                          <div className="text-xs text-red-600 mt-1">{contact.error}</div>
                        )}
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        {contact.status === 'pending' && (
                          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                        )}
                        {contact.status === 'sending' && (
                          <Loader2 className="w-4 h-4 text-[#5739FB] animate-spin" />
                        )}
                        {contact.status === 'sent' && (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        )}
                        {contact.status === 'failed' && (
                          <XCircle className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => setContacts([])}
                  variant="outline"
                  className="w-full mt-4"
                >
                  Clear All
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
