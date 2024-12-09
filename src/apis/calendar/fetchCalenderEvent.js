import axios from 'axios'

const fetchCalendarEvent = async (year, month) => {
  try {
    const response = await axios.get(`/api/calendar/get_calendar`, {
      params: {
        year,
        month,
      },
    })
    return response.data.calendar.schedule // 서버로부터 받은 데이터를 반환
  } catch (error) {
    console.error('Failed to fetch calendar events:', error)
    throw error // 에러를 호출한 쪽으로 전달
  }
}

export default fetchCalendarEvent
