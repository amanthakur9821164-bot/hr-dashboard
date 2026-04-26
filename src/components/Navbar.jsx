import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useEmployee } from '../context/EmployeeContext'

const navLinks = [
  { path: '/', label: 'Dashboard' },
  { path: '/employees', label: 'Employees' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const { state } = useEmployee()

  return (
    <nav style={{
      background: '#1a1a2e',
      color: '#fff',
      padding: '0 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '60px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: 32, height: 32, borderRadius: '8px',
            background: 'linear-gradient(135deg,#4f8ef7,#7c3aed)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '16px', fontWeight: 700,
          }}>H</div>
          <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '18px', letterSpacing: '0.01em' }}>
            HRFlow
          </span>
        </div>

        <div style={{ display: 'flex', gap: '4px' }}>
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                color: pathname === link.path ? '#fff' : 'rgba(255,255,255,0.55)',
                textDecoration: 'none',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: 500,
                background: pathname === link.path ? 'rgba(255,255,255,0.1)' : 'transparent',
                transition: 'all 0.2s',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {state.lastUpdated && (
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
            Updated {state.lastUpdated.toLocaleTimeString()}
          </span>
        )}
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'linear-gradient(135deg,#4f8ef7,#7c3aed)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '13px', fontWeight: 600,
        }}>A</div>
      </div>
    </nav>
  )
}
