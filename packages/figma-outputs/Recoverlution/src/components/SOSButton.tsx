/**
 * SOS BUTTON - Always Visible Crisis Support
 * 
 * Triggers rescue event and alerts therapist
 * Philosophy: Always accessible, never judged
 */

import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';

interface SOSButtonProps {
  userId?: string;
  rehabId?: string;
  variant?: 'default' | 'destructive' | 'outline';
  size?: 'default' | 'sm' | 'lg';
}

export function SOSButton({ 
  userId = '647fdb75-f5dd-435f-9554-0f4dc5399fd2',
  rehabId = 'your-rehab-id',
  variant = 'destructive',
  size = 'default'
}: SOSButtonProps) {
  const [loading, setLoading] = useState(false);
  const [triggered, setTriggered] = useState(false);

  const handleSOS = async () => {
    try {
      setLoading(true);

      // Create rescue event
      const response = await fetch('/api/rescue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          rehab_id: rehabId,
          kind: 'sos',
          triggered_by: 'user',
          context: 'SOS button pressed from dashboard',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to trigger SOS');
      }

      setTriggered(true);
      
      // Auto-close after 3 seconds
      setTimeout(() => {
        setTriggered(false);
      }, 3000);

    } catch (err) {
      console.error('SOS error:', err);
      alert('Failed to send SOS. Please call your therapist directly.');
    } finally {
      setLoading(false);
    }
  };

  if (triggered) {
    return (
      <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100 border border-emerald-300" style={{ borderRadius: '0px' }}>
        <AlertCircle className="w-4 h-4 text-emerald-700" />
        <span className="text-sm text-emerald-700" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
          Support team notified
        </span>
      </div>
    );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button 
          variant={variant}
          size={size}
          style={{ borderRadius: '0px' }}
        >
          <AlertCircle className="w-4 h-4 mr-2" />
          SOS
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent style={{ borderRadius: '0px' }}>
        <AlertDialogHeader>
          <AlertDialogTitle style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
            I need support now
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className="space-y-3 text-gray-700">
              <p>
                Pressing SOS will immediately notify your support team. They will reach out as soon as possible.
              </p>
              <p>
                <strong>If this is a medical emergency, please call 911 or go to your nearest emergency room.</strong>
              </p>
              <p>
                Crisis hotlines:
              </p>
              <ul className="text-sm space-y-1 ml-4">
                <li>• <strong>National Suicide Prevention Lifeline:</strong> 988</li>
                <li>• <strong>Crisis Text Line:</strong> Text HOME to 741741</li>
                <li>• <strong>SAMHSA National Helpline:</strong> 1-800-662-4357</li>
              </ul>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel style={{ borderRadius: '0px' }}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleSOS}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700"
            style={{ borderRadius: '0px' }}
          >
            {loading ? 'Sending...' : 'Send SOS'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
