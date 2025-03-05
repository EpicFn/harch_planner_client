import axios from 'axios'

/**
 * 교재 이름 중복 확인 API 호출
 * @param {string} title - 확인할 교재 이름
 * @returns {Promise<object>} API 응답 데이터
 */
const checkBookName = async (title) => {
  try {
    const response = await axios.get('/api/book/check_title_available', {
      params: { title },
    })
    return response.data // 성공 시 응답 데이터 반환
  } catch (error) {
    if (error.response) {
      return error.response.data // 에러 메시지 반환
    }
    console.error('Error while checking book name:', error)
    throw new Error('Failed to check book name')
  }
}

export default checkBookName
