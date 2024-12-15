import axios from 'axios'

// 과목 추가 API 호출 함수
const monthlyGoalAdd = async (monthlyGoal) => {
  try {
    const response = await axios.post(
      '/api/calendar/register/goal',
      monthlyGoal,
    )
    return response.data // 서버로부터 받은 데이터 반환
  } catch (error) {
    console.error('Failed to add calendar:', error)
    throw error // 에러를 호출한 쪽으로 전달
  }
}

export default monthlyGoalAdd
