/**
 * Error Boundary Component
 * Catches and displays errors gracefully
 */

'use client';

import React, { ReactNode, ReactElement } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary class component
 * Catches errors in child components and displays a fallback UI
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactElement | ReactNode {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md">
              <Alert variant="destructive" className="border-red-300">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Something went wrong</AlertTitle>
                <AlertDescription className="mt-2">
                  <p className="text-sm mb-4">
                    {this.state.error?.message || 'An unexpected error occurred'}
                  </p>
                  <details className="text-xs bg-red-50 p-2 rounded mb-4 max-h-48 overflow-auto">
                    <summary className="cursor-pointer font-semibold mb-2">Error details</summary>
                    <pre className="whitespace-pre-wrap break-words">
                      {this.state.error?.stack}
                    </pre>
                  </details>
                  <div className="flex gap-2">
                    <Button
                      onClick={this.handleReset}
                      variant="outline"
                      className="flex-1"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Try again
                    </Button>
                    <Button
                      onClick={() => window.location.href = '/'}
                      variant="outline"
                      className="flex-1"
                    >
                      Go home
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          </div>
        )
      );
    }

    return this.props.children as ReactElement;
  }
}
