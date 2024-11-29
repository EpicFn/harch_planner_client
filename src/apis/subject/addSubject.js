import axios from 'axios'

// 과목 추가 API 호출 함수
const addSubject = async (subjectTitle) => {
  try {
    const response = await axios.post('/api/subject/create', {
      title: subjectTitle,
    })
    return response.data // 서버로부터 받은 데이터 반환
  } catch (error) {
    console.error('Failed to add subject:', error)
    throw error // 에러를 호출한 쪽으로 전달
  }
}

export default addSubject
