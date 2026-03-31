import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          backgroundColor: '#f8fafc',
          padding: '24px',
          fontFamily: 'sans-serif'
        }}>
          <div style={{ 
            maxWidth: '400px', 
            width: '100%', 
            backgroundColor: 'white', 
            borderRadius: '24px', 
            padding: '32px', 
            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
            border: '1px solid #e2e8f0'
          }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc2626', marginBottom: '16px' }}>エラーが発生しました</h1>
            <p style={{ color: '#475569', marginBottom: '24px' }}>
              アプリケーションの読み込み中に問題が発生しました。
            </p>
            <div style={{ backgroundColor: '#f8fafc', borderRadius: '16px', padding: '16px', marginBottom: '24px', overflow: 'auto', maxHeight: '160px' }}>
              <code style={{ fontSize: '12px', color: '#ef4444' }}>{this.state.error?.message}</code>
            </div>
            <button
              onClick={() => window.location.reload()}
              style={{ 
                width: '100%', 
                padding: '12px', 
                backgroundColor: '#4f46e5', 
                color: 'white', 
                borderRadius: '16px', 
                fontWeight: 'bold', 
                border: 'none',
                cursor: 'pointer'
              }}
            >
              再読み込み
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
