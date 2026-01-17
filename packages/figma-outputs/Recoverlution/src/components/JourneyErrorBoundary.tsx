/**
 * Journey Error Boundary
 * Gracefully handles errors in the Journey system
 */

import { Component, ReactNode } from 'react';
import { GlassCard } from './GlassCard';
import { Button } from './ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class JourneyErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Journey Error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0A0118] flex items-center justify-center p-4">
          <GlassCard className="max-w-lg text-center p-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 mb-6">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>

            <h2 className="text-2xl text-white mb-3">
              Something went wrong
            </h2>
            
            <p className="text-white/70 mb-8">
              We encountered an error loading your Journey. This is usually temporary.
            </p>

            {this.state.error && (
              <div className="bg-white/5 rounded-lg p-4 mb-8 text-left">
                <div className="text-white/50 text-xs mb-2">Error Details:</div>
                <div className="text-white/80 text-sm font-mono">
                  {this.state.error.message}
                </div>
              </div>
            )}

            <Button
              onClick={this.handleRetry}
              className="w-full bg-gradient-to-r from-[#3E2BB8] to-[#5739FB] hover:from-[#5739FB] hover:to-[#3E2BB8] text-white"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </GlassCard>
        </div>
      );
    }

    return this.props.children;
  }
}
