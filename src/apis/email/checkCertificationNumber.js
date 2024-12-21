import axios from 'axios'

export const checkCertificationNumber = async ({ email, code }) => {
  try {
    const response = await axios.post('/api/email/verify/code', {
      email,
      code,
    })
    return response.data // 서버에서 받은 응답 데이터 반환
  } catch (error) {
    console.error('인증번호 확인 API 호출 에러:', error)
    throw error // 에러를 상위로 전달
  }
}
