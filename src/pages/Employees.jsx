import React from 'react'
import { useEmployee } from '../context/EmployeeContext'
import { useAutoRefresh } from '../hooks/useAutoRefresh'
import SearchFilterBar from '../components/SearchFilterBar'
import EmployeeCard from '../components/EmployeeCard'
import LoadingSpinner from '../components/LoadingSpinner'

export default function Employees() {
  const { state, fetchEmployees, getFilteredEmployees } = useEmployee()
  const { countdown } = useAutoRefresh(fetchEmployees, 30000)
  const filtered = getFilteredEmployees()

  if (state.loading && state.employees.length === 0) return <LoadingSpinner message="Loading employees..." />

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '28px', marginBottom: '4px' }}>Employees</h1>
          <p style={{ color: '#6b6b80', fontSize: '14px' }}>
            Showing {filtered.length} of {state.employees.length} employees
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: '#fff', border: '1px solid #e2dfd8', borderRadius: '8px',
            padding: '6px 12px', fontSize: '12px', color: '#6b6b80',
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%', background: '#2d6a4f',
              display: 'inline-block', animation: 'pulse 2s ease infinite',
            }} />
            Refresh in {countdown}s
          </div>
          <button
            onClick={fetchEmployees}
            disabled={state.loading}
            style={{
              background: '#1a1a2e', color: '#fff', border: 'none',
              borderRadius: '8px', padding: '8px 16px', fontSize: '13px',
              cursor: state.loading ? 'not-allowed' : 'pointer', opacity: state.loading ? 0.6 : 1,
              fontFamily: 'DM Sans, sans-serif',
            }}
          >
            {state.loading ? '...' : '↻ Refresh'}
          </button>
        </div>
      </div>

      {/* Search + Filter + Sort Bar */}
      <SearchFilterBar />

      {/* Results */}
      {filtered.length === 0 ? (
        <div style={{
          background: '#fff', border: '1px solid #e2dfd8', borderRadius: '14px',
          padding: '3rem', textAlign: 'center',
        }}>
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔍</div>
          <p style={{ color: '#6b6b80', fontSize: '14px' }}>No employees match your filters.</p>
          <p style={{ color: '#9e9eaf', fontSize: '13px', marginTop: '4px' }}>Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '14px',
        }}>
          {filtered.map(emp => <EmployeeCard key={emp.id} emp={emp} />)}
        </div>
      )}
    </div>
  )
}
