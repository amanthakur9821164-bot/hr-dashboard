import React, { createContext, useContext, useReducer, useCallback } from 'react'

const EmployeeContext = createContext(null)

const initialState = {
  employees: [],
  loading: false,
  error: null,
  lastUpdated: null,
  searchQuery: '',
  filterDept: 'all',
  filterStatus: 'all',
  sortBy: 'name',
  sortOrder: 'asc',
}

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null }
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        employees: action.payload,
        lastUpdated: new Date(),
        error: null,
      }
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload }
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload }
    case 'SET_FILTER_DEPT':
      return { ...state, filterDept: action.payload }
    case 'SET_FILTER_STATUS':
      return { ...state, filterStatus: action.payload }
    case 'SET_SORT':
      return {
        ...state,
        sortBy: action.payload.sortBy,
        sortOrder: action.payload.sortOrder,
      }
    default:
      return state
  }
}

const DEPARTMENTS = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Design', 'Operations', 'Legal']
const STATUSES = ['Active', 'On Leave', 'Remote', 'Contract']

function enrichEmployees(rawUsers) {
  return rawUsers.map((user, i) => ({
    id: user.login.uuid,
    name: `${user.name.first} ${user.name.last}`,
    email: user.email,
    phone: user.phone,
    photo: user.picture.large,
    department: DEPARTMENTS[i % DEPARTMENTS.length],
    status: STATUSES[i % STATUSES.length],
    salary: (40000 + Math.floor(Math.random() * 60000)).toLocaleString('en-IN'),
    joinDate: new Date(user.registered.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }),
    location: `${user.location.city}, ${user.location.country}`,
    age: user.dob.age,
    gender: user.gender,
  }))
}

export function EmployeeProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const fetchEmployees = useCallback(async () => {
    dispatch({ type: 'FETCH_START' })
    try {
      const res = await fetch('https://randomuser.me/api/?results=30&seed=hrapp')
      if (!res.ok) throw new Error(`API error: ${res.status}`)
      const data = await res.json()
      dispatch({ type: 'FETCH_SUCCESS', payload: enrichEmployees(data.results) })
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: err.message })
    }
  }, [])

  const setSearch = useCallback((q) => dispatch({ type: 'SET_SEARCH', payload: q }), [])
  const setFilterDept = useCallback((d) => dispatch({ type: 'SET_FILTER_DEPT', payload: d }), [])
  const setFilterStatus = useCallback((s) => dispatch({ type: 'SET_FILTER_STATUS', payload: s }), [])
  const setSort = useCallback((sortBy, sortOrder) => dispatch({ type: 'SET_SORT', payload: { sortBy, sortOrder } }), [])

  const getFilteredEmployees = useCallback(() => {
    let result = [...state.employees]

    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase()
      result = result.filter(e =>
        e.name.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) ||
        e.department.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q)
      )
    }

    if (state.filterDept !== 'all') {
      result = result.filter(e => e.department === state.filterDept)
    }

    if (state.filterStatus !== 'all') {
      result = result.filter(e => e.status === state.filterStatus)
    }

    result.sort((a, b) => {
      let valA = a[state.sortBy] || ''
      let valB = b[state.sortBy] || ''
      if (typeof valA === 'string') valA = valA.toLowerCase()
      if (typeof valB === 'string') valB = valB.toLowerCase()
      if (valA < valB) return state.sortOrder === 'asc' ? -1 : 1
      if (valA > valB) return state.sortOrder === 'asc' ? 1 : -1
      return 0
    })

    return result
  }, [state])

  return (
    <EmployeeContext.Provider value={{ state, fetchEmployees, setSearch, setFilterDept, setFilterStatus, setSort, getFilteredEmployees, DEPARTMENTS, STATUSES }}>
      {children}
    </EmployeeContext.Provider>
  )
}

export function useEmployee() {
  const ctx = useContext(EmployeeContext)
  if (!ctx) throw new Error('useEmployee must be used inside EmployeeProvider')
  return ctx
}
