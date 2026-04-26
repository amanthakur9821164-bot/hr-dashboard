import { useEffect, useRef, useState } from 'react'

export function useAutoRefresh(fetchFn, intervalMs = 30000) {
  const timerRef = useRef(null)
  const [countdown, setCountdown] = useState(intervalMs / 1000)

  useEffect(() => {
    fetchFn()
  }, [])

  useEffect(() => {
    timerRef.current = setInterval(() => {
      fetchFn()
      setCountdown(intervalMs / 1000)
    }, intervalMs)

    const countTimer = setInterval(() => {
      setCountdown(prev => (prev <= 1 ? intervalMs / 1000 : prev - 1))
    }, 1000)

    return () => {
      clearInterval(timerRef.current)
      clearInterval(countTimer)
    }
  }, [fetchFn, intervalMs])

  return { countdown }
}
