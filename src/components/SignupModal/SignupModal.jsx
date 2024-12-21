import { checkCertificationNumber } from '@apis/email/checkCertificationNumber'
import { sendVerificationEmail } from '@apis/email/sendVerificationEmail'
import {
  CertificationContainer,
  CertificationNumberInput,
  CheckEmailButton,
  CloseButton,
  ErrorMessage,
  Form,
  FormContainer,
  FormGroup,
  FormHeader,
  Input,
  Label,
  ModalContainer,
  ModalOverlay,
  SignupButton,
  SuccessIcon,
  Title,
} from '@components/SignupModal/SignupModal.style'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import ModalStore from '@stores/modalStore'
import { useEffect, useState } from 'react'

export default function SignupModal() {
  const {
    isSignupModalOpen,
    closeSignupModal,
    openSignupModal,
    closeLoginModal,
  } = ModalStore()
  const [userInfo, setUserInfo] = useState({
    userId: '',
    userName: '',
    email: '',
    password: '',
  })
  const [isVerificationFieldVisible, setIsVerificationFieldVisible] =
    useState(false)
  const [verificationCode, setVerificationCode] = useState('')
  const [isCodeVerified, setIsCodeVerified] = useState(false)
  const [emailVerified, setEmailVerified] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'error',
  })

  const [isShaking, setIsShaking] = useState('false')

  useEffect(() => {
    if (isSignupModalOpen) {
      setUserInfo({
        userId: '',
        userName: '',
        email: '',
        password: '',
      })
    }
    setIsVerificationFieldVisible(false)
    setErrorMessage('')
    setEmailVerified(false)
    setIsCodeVerified(false)
    setSnackbar({ open: false, message: '', severity: 'error' })
  }, [isSignupModalOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value)
  }

  const handleVerifyCode = async (email, verificationCode) => {
    console.log('Verifying email:', email, 'with code:', verificationCode)
    try {
      const response = await checkCertificationNumber({
        email: email,
        code: verificationCode,
      })
      console.log('API Response:', response)
      setIsCodeVerified(true) // 인증 성공
      setVerificationCode('')
      setIsVerificationFieldVisible(false)
      setErrorMessage('')
      setSnackbar({ open: true, message: '인증 성공!', severity: 'success' })
    } catch (error) {
      setSnackbar({
        open: true,
        message: '인증번호가 유효하지 않습니다.',
        severity: 'error',
      })
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  const handleEmailVerification = async (email) => {
    if (!email) {
      setErrorMessage('이메일을 입력해주세요.')
      return
    }

    setErrorMessage('')

    try {
      await sendVerificationEmail(email)
      setTimeout(() => {
        setIsVerificationFieldVisible(true)
        setEmailVerified(true)
      }, 1000)
    } catch (error) {
      setErrorMessage('인증 이메일 전송에 실패했습니다.')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      !userInfo.userId ||
      !userInfo.userName ||
      !userInfo.email ||
      !userInfo.password
    ) {
      setIsShaking('true')
      setTimeout(() => setIsShaking('false'), 500)
      return
    }

    // 회원가입 로직 추가
    console.log('회원가입 데이터:', userInfo)
  }

  if (!isSignupModalOpen) {
    return null
  }

  return (
    <>
      <ModalOverlay>
        <ModalContainer shaking={isShaking}>
          <FormHeader>
            <Title>회원가입</Title>
            <CloseButton onClick={closeSignupModal}>&times;</CloseButton>
          </FormHeader>
          <FormContainer>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="userid">아이디</Label>
                <Input
                  id="userid"
                  type="text"
                  placeholder="아이디를 입력하세요"
                  value={userInfo.userId}
                  onChange={handleChange}
                />
                <ErrorMessage></ErrorMessage>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="username">이름</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="이름을 입력하세요"
                  value={userInfo.userName}
                  onChange={handleChange}
                />
                <ErrorMessage></ErrorMessage>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">이메일</Label>
                {isCodeVerified && <SuccessIcon>✔</SuccessIcon>}
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="이메일을 입력하세요"
                  value={userInfo.email}
                  onChange={handleChange}
                />
                <CheckEmailButton
                  type="button"
                  onClick={() => handleEmailVerification(userInfo.email)}
                  disabled={isCodeVerified}
                >
                  인증하기
                </CheckEmailButton>
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
              </FormGroup>

              {isVerificationFieldVisible && emailVerified && (
                <FormGroup>
                  <CertificationContainer>
                    <CertificationNumberInput
                      id="verificationCode"
                      name="verificationCode"
                      type="text"
                      value={verificationCode}
                      placeholder="인증번호를 입력하세요"
                      onChange={handleVerificationCodeChange}
                    />
                    <CheckEmailButton
                      type="button"
                      onClick={() =>
                        handleVerifyCode(userInfo.email, verificationCode)
                      }
                    >
                      확인
                    </CheckEmailButton>
                  </CertificationContainer>
                </FormGroup>
              )}

              <FormGroup>
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  value={userInfo.password}
                  placeholder="비밀번호를 입력하세요"
                  onChange={handleChange}
                />
                <ErrorMessage></ErrorMessage>
              </FormGroup>

              <SignupButton type="submit">회원가입</SignupButton>
            </Form>
          </FormContainer>
        </ModalContainer>
      </ModalOverlay>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}
