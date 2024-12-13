import fetchCalendarEvent from '@apis/calendar/fetchCalenderEvent'
import { useQuery } from '@tanstack/react-query'

export default function useCalendarFetchEvents(currentYear, currentMonth) {
  const {
    data: calendarData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['calendarEvents', currentYear, currentMonth],
    queryFn: () => fetchCalendarEvent(currentYear, currentMonth),
    staleTime: 10 * 60 * 1000, // 데이터 신선도 유지 시간 (10분)
    cacheTime: 10 * 60 * 1000, // 캐시 유지 시간 (10분)
  })

  return {
    calendarData, // 데이터
    isLoading, // 로딩 상태
    isError, // 에러 상태
    error, // 에러 정보
  }
}
