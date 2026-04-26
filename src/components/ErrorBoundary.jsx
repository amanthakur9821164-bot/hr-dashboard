import React from 'react'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo })
    console.error('ErrorBoundary caught:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
    if (this.props.onReset) this.props.onReset()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          padding: '2rem',
          textAlign: 'center',
        }}>
          <div style={{
            background: '#fff',
            border: '1px solid #e2dfd8',
            borderRadius: '16px',
            padding: '3rem 2.5rem',
            maxWidth: '480px',
            width: '100%',
            boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '1rem' }}>⚠️</div>
            <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '24px', marginBottom: '0.5rem', color: '#1a1a2e' }}>
              Something went wrong
            </h2>
            <p style={{ color: '#6b6b80', fontSize: '14px', marginBottom: '0.75rem', lineHeight: 1.7 }}>
              {this.state.error?.message || 'An unexpected error occurred in this component.'}
            </p>
            {this.state.errorInfo && (
              <details style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                <summary style={{ fontSize: '12px', color: '#9e9eaf', cursor: 'pointer', marginBottom: '6px' }}>
                  View error details
                </summary>
                <pre style={{
                  fontSize: '11px',
                  background: '#f5f4f0',
                  padding: '12px',
                  borderRadius: '8px',
                  overflow: 'auto',
                  color: '#c0392b',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all',
                }}>
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
            <button
              onClick={this.handleReset}
              style={{
                background: '#1a1a2e',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 24px',
                fontSize: '14px',
                fontFamily: 'DM Sans, sans-serif',
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
