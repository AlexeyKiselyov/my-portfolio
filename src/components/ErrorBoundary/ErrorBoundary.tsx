import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

// Basic reusable error boundary.
export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Optional logging hook; could be extended to send to analytics.
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.error('[ErrorBoundary]', error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;
    const { children, fallback } = this.props;

    if (error) {
      return (
        fallback || (
          <div
            style={{
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              maxWidth: 600,
              margin: '0 auto',
              textAlign: 'center',
            }}
          >
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>
              Something went wrong.
            </h2>
            <p style={{ opacity: 0.8 }}>
              An unexpected error occurred while loading this section. You can
              try reloading just this block.
            </p>
            <pre
              style={{
                background: '#1e1e1e',
                color: '#f5f5f5',
                padding: '1rem',
                borderRadius: 8,
                maxHeight: 200,
                overflow: 'auto',
                fontSize: '0.75rem',
              }}
            >
              {error.message}
            </pre>
            <div
              style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}
            >
              <button
                type="button"
                onClick={this.handleRetry}
                style={{
                  background: '#2563eb',
                  color: '#fff',
                  border: 'none',
                  padding: '0.6rem 1.2rem',
                  borderRadius: 6,
                  cursor: 'pointer',
                }}
              >
                Retry
              </button>
              <button
                type="button"
                onClick={() => window.location.reload()}
                style={{
                  background: '#374151',
                  color: '#fff',
                  border: 'none',
                  padding: '0.6rem 1.2rem',
                  borderRadius: 6,
                  cursor: 'pointer',
                }}
              >
                Reload page
              </button>
            </div>
          </div>
        )
      );
    }

    return children;
  }
}

export default ErrorBoundary;
