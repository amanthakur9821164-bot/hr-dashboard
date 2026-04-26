import React, { useMemo } from 'react'
import { useEmployee } from '../context/EmployeeContext'
import { useAutoRefresh } from '../hooks/useAutoRefresh'
import StatsCard from '../components/StatsCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { state, fetchEmployees } = useEmployee()
  const { countdown } = useAutoRefresh(fetchEmployees, 30000)

  const stats = useMemo(() => {
    const emps = state.employees
    const deptCounts = emps.reduce((acc, e) => {
      acc[e.department] = (acc[e.department] || 0) + 1
      return acc
    }, {})
    const topDept = Object.entries(deptCounts).sort((a, b) => b[1] - a[1])[0]
    const active = emps.filter(e => e.status === 'Active').length
    const onLeave = emps.filter(e => e.status === 'On Leave').length
    const remote = emps.filter(e => e.status === 'Remote').length

    return { total: emps.length, active, onLeave, remote, topDept, deptCounts }
  }, [state.employees])

  if (state.loading && state.employees.length === 0) return <LoadingSpinner message="Fetching employee data..." />

  if (state.error) return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <div style={{ fontSize: '32px', marginBottom: '8px' }}>⚠️</div>
      <p style={{ color: '#c0392b', marginBottom: '12px' }}>{state.error}</p>
      <button onClick={fetchEmployees} style={{
        padding: '8px 20px', background: '#1a1a2e', color: '#fff',
        border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px',
      }}>Retry</button>
    </div>
  )

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '28px', marginBottom: '4px' }}>HR Dashboard</h1>
          <p style={{ color: '#6b6b80', fontSize: '14px' }}>Real-time workforce overview</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: '#fff', border: '1px solid #e2dfd8', borderRadius: '8px',
            padding: '6px 12px', fontSize: '12px', color: '#6b6b80',
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%', background: '#2d6a4f',
              display: 'inline-block', animation: 'pulse 2s ease infinite',
            }} />
            Auto-refresh in {countdown}s
          </div>
          <button
            onClick={fetchEmployees}
            disabled={state.loading}
            style={{
              background: '#1a1a2e', color: '#fff', border: 'none',
              borderRadius: '8px', padding: '8px 18px', fontSize: '13px',
              cursor: state.loading ? 'not-allowed' : 'pointer', opacity: state.loading ? 0.6 : 1,
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            {state.loading ? 'Refreshing...' : '↻ Refresh Now'}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '2rem' }}>
        <StatsCard title="Total Employees" value={stats.total} icon="👥" color="#4f8ef7" />
        <StatsCard title="Active" value={stats.active} icon="✅" color="#2d6a4f" subtitle="Currently working" />
        <StatsCard title="On Leave" value={stats.onLeave} icon="🏖️" color="#b7791f" />
        <StatsCard title="Remote" value={stats.remote} icon="🏠" color="#7c3aed" />
      </div>

      {/* Department Breakdown */}
      <div style={{
        background: '#fff', border: '1px solid #e2dfd8', borderRadius: '14px',
        padding: '1.5rem', marginBottom: '1.5rem',
      }}>
        <h2 style={{ fontSize: '18px', marginBottom: '1.25rem' }}>Department Breakdown</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {Object.entries(stats.deptCounts)
            .sort((a, b) => b[1] - a[1])
            .map(([dept, count]) => (
              <div key={dept}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                  <span style={{ color: '#1a1a2e', fontWeight: 500 }}>{dept}</span>
                  <span style={{ color: '#6b6b80' }}>{count} employees</span>
                </div>
                <div style={{ background: '#f0eeea', borderRadius: '99px', height: '6px' }}>
                  <div style={{
                    height: '6px', borderRadius: '99px',
                    background: 'linear-gradient(90deg,#4f8ef7,#7c3aed)',
                    width: `${(count / stats.total) * 100}%`,
                    transition: 'width 0.5s ease',
                  }} />
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Quick Link */}
      <Link to="/employees" style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        color: '#4f8ef7', textDecoration: 'none', fontSize: '13px', fontWeight: 500,
      }}>
        View all employees →
      </Link>
    </div>
  )
}
