import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { EmployeeProvider } from './context/EmployeeContext'
import { ErrorBoundary } from './components/ErrorBoundary'
import Navbar from './components/Navbar'
import LoadingSpinner from './components/LoadingSpinner'

// Lazy loading for performance optimization
const Dashboard     = lazy(() => import('./pages/Dashboard'))
const Employees     = lazy(() => import('./pages/Employees'))
const EmployeeDetail = lazy(() => import('./pages/EmployeeDetail'))
const NotFound      = lazy(() => import('./pages/NotFound'))

export default function App() {
  return (
    <BrowserRouter>
      <EmployeeProvider>
        <ErrorBoundary>
          <Navbar />
          <main>
            <Suspense fallback={<LoadingSpinner message="Loading page..." />}>
              <Routes>
                <Route path="/"               element={<ErrorBoundary><Dashboard /></ErrorBoundary>} />
                <Route path="/employees"      element={<ErrorBoundary><Employees /></ErrorBoundary>} />
                <Route path="/employees/:id"  element={<ErrorBoundary><EmployeeDetail /></ErrorBoundary>} />
                <Route path="*"              element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
        </ErrorBoundary>
      </EmployeeProvider>
    </BrowserRouter>
  )
}
