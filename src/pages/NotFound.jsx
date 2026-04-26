import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
      <div style={{ fontSize: '64px', marginBottom: '1rem' }}>404</div>
      <h1 style={{ fontSize: '24px', marginBottom: '8px' }}>Page Not Found</h1>
      <p style={{ color: '#6b6b80', fontSize: '14px', marginBottom: '1.5rem' }}>
        The page you're looking for doesn't exist.
      </p>
      <Link to="/" style={{
        background: '#1a1a2e', color: '#fff',
        textDecoration: 'none', borderRadius: '8px',
        padding: '10px 24px', fontSize: '13px', fontWeight: 500,
      }}>Go Home</Link>
    </div>
  )
}
