import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useEmployee } from '../context/EmployeeContext'

const STATUS_COLORS = {
  'Active':   { bg: '#e8f5e9', color: '#2d6a4f' },
  'On Leave': { bg: '#fef3c7', color: '#b7791f' },
  'Remote':   { bg: '#eff6ff', color: '#1e40af' },
  'Contract': { bg: '#fdecea', color: '#c0392b' },
}

function InfoRow({ label, value }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '10px 0', borderBottom: '1px solid #f0eeea',
    }}>
      <span style={{ fontSize: '13px', color: '#9e9eaf' }}>{label}</span>
      <span style={{ fontSize: '13px', fontWeight: 500, color: '#1a1a2e' }}>{value}</span>
    </div>
  )
}

export default function EmployeeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useEmployee()
  const emp = state.employees.find(e => e.id === id)

  if (!emp) return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <div style={{ fontSize: '40px', marginBottom: '12px' }}>👤</div>
      <p style={{ color: '#6b6b80' }}>Employee not found.</p>
      <button onClick={() => navigate('/employees')} style={{
        marginTop: '12px', padding: '8px 20px', background: '#1a1a2e', color: '#fff',
        border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px',
        fontFamily: 'DM Sans, sans-serif',
      }}>← Back to Employees</button>
    </div>
  )

  const status = STATUS_COLORS[emp.status] || { bg: '#f0eeea', color: '#6b6b80' }

  return (
    <div style={{ padding: '2rem', maxWidth: '700px', margin: '0 auto' }}>
      <button
        onClick={() => navigate('/employees')}
        style={{
          background: 'none', border: '1px solid #e2dfd8', borderRadius: '8px',
          padding: '6px 14px', fontSize: '13px', cursor: 'pointer', color: '#6b6b80',
          marginBottom: '1.5rem', fontFamily: 'DM Sans, sans-serif',
        }}
      >← Back</button>

      {/* Profile Header */}
      <div style={{
        background: '#fff', border: '1px solid #e2dfd8', borderRadius: '16px',
        padding: '2rem', marginBottom: '1rem',
        display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap',
        animation: 'fadeIn 0.3s ease',
      }}>
        <img src={emp.photo} alt={emp.name} style={{
          width: 90, height: 90, borderRadius: '50%', objectFit: 'cover',
          border: '3px solid #e2dfd8',
        }} />
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '24px', marginBottom: '4px' }}>{emp.name}</h1>
          <p style={{ color: '#6b6b80', fontSize: '14px', marginBottom: '10px' }}>{emp.department} Department</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: '12px', padding: '4px 12px', borderRadius: '20px',
              background: status.bg, color: status.color, fontWeight: 500,
            }}>{emp.status}</span>
            <span style={{
              fontSize: '12px', padding: '4px 12px', borderRadius: '20px',
              background: '#f0eeea', color: '#6b6b80',
            }}>{emp.gender === 'male' ? '♂' : '♀'} {emp.gender}</span>
          </div>
        </div>
      </div>

      {/* Details Card */}
      <div style={{
        background: '#fff', border: '1px solid #e2dfd8', borderRadius: '16px',
        padding: '1.5rem', animation: 'fadeIn 0.4s ease',
      }}>
        <h2 style={{ fontSize: '16px', marginBottom: '0.75rem', color: '#1a1a2e' }}>Employee Information</h2>
        <InfoRow label="Email" value={emp.email} />
        <InfoRow label="Phone" value={emp.phone} />
        <InfoRow label="Location" value={emp.location} />
        <InfoRow label="Age" value={`${emp.age} years`} />
        <InfoRow label="Annual Salary" value={`₹${emp.salary}`} />
        <InfoRow label="Joined On" value={emp.joinDate} />
        <InfoRow label="Department" value={emp.department} />
      </div>
    </div>
  )
}
