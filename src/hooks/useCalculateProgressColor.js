import { useMemo } from 'react'

const useCalculateProgressColor = (progress) => {
  const color = useMemo(() => {
    if (progress >= 80) {
      return '#4caf50' // Green
    } else if (progress >= 50) {
      return '#ffeb3b' // Yellow
    } else {
      return '#f44336' // Red
    }
  }, [progress])

  return color
}

export default useCalculateProgressColor
