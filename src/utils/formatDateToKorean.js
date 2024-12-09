export const formatDateToKorean = (dateString) => {
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'] // 요일 배열
  const date = new Date(dateString)

  const month = date.getMonth() + 1 // 월 (0부터 시작하므로 +1)
  const day = date.getDate() // 일
  const dayOfWeek = daysOfWeek[date.getDay()] // 요일

  return `${month}월 ${day}일(${dayOfWeek})`
}
