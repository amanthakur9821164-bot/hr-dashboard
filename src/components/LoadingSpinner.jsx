import React from 'react'

export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      minHeight: '40vh', gap: '16px',
    }}>
      <div style={{
        width: 40, height: 40,
        border: '3px solid #e2dfd8',
        borderTopColor: '#4f8ef7',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <p style={{ color: '#9e9eaf', fontSize: '13px' }}>{message}</p>
    </div>
  )
}
