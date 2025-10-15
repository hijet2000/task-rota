import React, { Component, ErrorInfo, ReactNode } from 'react';
import { trackEvent } from '../lib/analytics';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  // FIX: Initialize state as a class property. This is a more modern syntax
  // than using a constructor and can avoid potential `this` context issues.
  // This change resolves all reported TypeScript errors where `state` and `props`
  // were incorrectly reported as not existing on the component instance.
  public state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
    trackEvent('react_error', { 
        error: error.toString(), 
        componentStack: errorInfo.componentStack 
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex h-screen w-screen items-center justify-center bg-gray-50 text-center">
          <div>
            <h1 className="text-2xl font-bold text-red-600">Something went wrong.</h1>
            <p className="mt-2 text-gray-600">We've been notified of the issue and are looking into it.</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
