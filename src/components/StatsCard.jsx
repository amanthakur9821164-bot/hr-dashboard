import React from 'react'

export default function StatsCard({ title, value, icon, color = '#4f8ef7', subtitle }) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e2dfd8',
      borderRadius: '14px',
      padding: '1.25rem',
      display: 'flex',
      gap: '16px',
      alignItems: 'center',
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      animation: 'fadeIn 0.4s ease',
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: '12px',
        background: color + '18',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '22px', flexShrink: 0,
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: '22px', fontWeight: 600, color: '#1a1a2e', lineHeight: 1.2 }}>{value}</div>
        <div style={{ fontSize: '13px', color: '#6b6b80', marginTop: '2px' }}>{title}</div>
        {subtitle && <div style={{ fontSize: '11px', color: '#9e9eaf', marginTop: '2px' }}>{subtitle}</div>}
      </div>
    </div>
  )
}
