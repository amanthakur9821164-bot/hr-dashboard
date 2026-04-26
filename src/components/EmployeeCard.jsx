import React from 'react'
import { useNavigate } from 'react-router-dom'

const STATUS_COLORS = {
  'Active':    { bg: '#e8f5e9', color: '#2d6a4f' },
  'On Leave':  { bg: '#fef3c7', color: '#b7791f' },
  'Remote':    { bg: '#eff6ff', color: '#1e40af' },
  'Contract':  { bg: '#fdecea', color: '#c0392b' },
}

export default function EmployeeCard({ emp }) {
  const navigate = useNavigate()
  const status = STATUS_COLORS[emp.status] || { bg: '#f0eeea', color: '#6b6b80' }

  return (
    <div
      onClick={() => navigate(`/employees/${emp.id}`)}
      style={{
        background: '#fff',
        border: '1px solid #e2dfd8',
        borderRadius: '14px',
        padding: '1.25rem',
        cursor: 'pointer',
        transition: 'all 0.2s',
        animation: 'fadeIn 0.3s ease',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'
        e.currentTarget.style.borderColor = '#b0a8f8'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)'
        e.currentTarget.style.borderColor = '#e2dfd8'
      }}
    >
      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
        <img
          src={emp.photo}
          alt={emp.name}
          style={{ width: 52, height: 52, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {emp.name}
          </div>
          <div style={{ fontSize: '12px', color: '#6b6b80', marginBottom: '8px' }}>{emp.email}</div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: '11px', padding: '2px 8px', borderRadius: '20px',
              background: '#f0eeea', color: '#6b6b80', fontWeight: 500,
            }}>{emp.department}</span>
            <span style={{
              fontSize: '11px', padding: '2px 8px', borderRadius: '20px',
              background: status.bg, color: status.color, fontWeight: 500,
            }}>{emp.status}</span>
          </div>
        </div>
      </div>
      <div style={{
        marginTop: '12px', paddingTop: '12px',
        borderTop: '1px solid #f0eeea',
        display: 'flex', justifyContent: 'space-between',
        fontSize: '12px', color: '#9e9eaf',
      }}>
        <span>📍 {emp.location}</span>
        <span>₹{emp.salary}/yr</span>
      </div>
    </div>
  )
}
