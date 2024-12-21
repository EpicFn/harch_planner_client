import axios from 'axios'

export const sendVerificationEmail = async (email) => {
  try {
    const response = await axios.post('/api/email/send_verification_email', {
      email,
    })
    return response.data // 서버로부터 받은 응답 데이터 반환
  } catch (error) {
    console.error('이메일 인증 API 호출 에러:', error)
    throw error // 에러를 상위로 전달
  }
}
