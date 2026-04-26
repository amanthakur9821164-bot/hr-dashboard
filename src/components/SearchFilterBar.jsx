import React, { useState, useEffect } from 'react'
import { useEmployee } from '../context/EmployeeContext'
import { useDebounce } from '../hooks/useDebounce'

export default function SearchFilterBar() {
  const { state, setSearch, setFilterDept, setFilterStatus, setSort, DEPARTMENTS, STATUSES } = useEmployee()
  const [inputVal, setInputVal] = useState(state.searchQuery)
  const debounced = useDebounce(inputVal, 400)

  useEffect(() => {
    setSearch(debounced)
  }, [debounced])

  function handleSort(e) {
    const [sortBy, sortOrder] = e.target.value.split('|')
    setSort(sortBy, sortOrder)
  }

  const sortValue = `${state.sortBy}|${state.sortOrder}`

  return (
    <div style={{
      background: '#fff',
      border: '1px solid #e2dfd8',
      borderRadius: '14px',
      padding: '1rem 1.25rem',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      alignItems: 'center',
      marginBottom: '1.25rem',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    }}>
      {/* Search */}
      <div style={{ flex: '1 1 220px', position: 'relative' }}>
        <span style={{
          position: 'absolute', left: '12px', top: '50%',
          transform: 'translateY(-50%)', color: '#9e9eaf', fontSize: '14px', pointerEvents: 'none',
        }}>🔍</span>
        <input
          type="text"
          placeholder="Search by name, email, department..."
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          style={{
            width: '100%',
            padding: '9px 12px 9px 36px',
            border: '1px solid #e2dfd8',
            borderRadius: '8px',
            fontSize: '13px',
            outline: 'none',
            color: '#1a1a2e',
            background: '#f5f4f0',
            transition: 'border 0.2s',
          }}
          onFocus={e => e.target.style.borderColor = '#4f8ef7'}
          onBlur={e => e.target.style.borderColor = '#e2dfd8'}
        />
        {inputVal && (
          <button
            onClick={() => { setInputVal(''); setSearch('') }}
            style={{
              position: 'absolute', right: '10px', top: '50%',
              transform: 'translateY(-50%)', background: 'none', border: 'none',
              color: '#9e9eaf', fontSize: '16px', cursor: 'pointer', lineHeight: 1,
            }}
          >×</button>
        )}
      </div>

      {/* Department Filter */}
      <select
        value={state.filterDept}
        onChange={e => setFilterDept(e.target.value)}
        style={{
          padding: '9px 12px',
          border: '1px solid #e2dfd8',
          borderRadius: '8px',
          fontSize: '13px',
          background: '#f5f4f0',
          color: '#1a1a2e',
          outline: 'none',
          cursor: 'pointer',
        }}
      >
        <option value="all">All Departments</option>
        {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
      </select>

      {/* Status Filter */}
      <select
        value={state.filterStatus}
        onChange={e => setFilterStatus(e.target.value)}
        style={{
          padding: '9px 12px',
          border: '1px solid #e2dfd8',
          borderRadius: '8px',
          fontSize: '13px',
          background: '#f5f4f0',
          color: '#1a1a2e',
          outline: 'none',
          cursor: 'pointer',
        }}
      >
        <option value="all">All Statuses</option>
        {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
      </select>

      {/* Sort */}
      <select
        value={sortValue}
        onChange={handleSort}
        style={{
          padding: '9px 12px',
          border: '1px solid #e2dfd8',
          borderRadius: '8px',
          fontSize: '13px',
          background: '#f5f4f0',
          color: '#1a1a2e',
          outline: 'none',
          cursor: 'pointer',
        }}
      >
        <option value="name|asc">Name A→Z</option>
        <option value="name|desc">Name Z→A</option>
        <option value="department|asc">Dept A→Z</option>
        <option value="age|asc">Age ↑</option>
        <option value="age|desc">Age ↓</option>
      </select>
    </div>
  )
}
