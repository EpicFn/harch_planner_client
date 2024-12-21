import { sendVerificationEmail } from '@apis/email/sendVerificationEmail'
import {
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
  Title,
} from '@components/SignupModal/SignupModal.style.js'
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
  const [errorMessage, setErrorMessage] = useState('')

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
  }, [isSignupModalOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleEmailVerification = async (userInfo) => {
    if (!userInfo) {
      setErrorMessage('이메일을 입력해주세요.')
      return
    }

    setErrorMessage('')

    try {
      await sendVerificationEmail(userInfo)
      setTimeout(() => {
        setIsVerificationFieldVisible(true) // 인증번호 입력 필드 표시
      }, 1500)
    } catch (error) {
      setErrorMessage('인증 이메일 전송에 실패했습니다.')
    }
  }

  if (!isSignupModalOpen) {
    return null // SignupModal이 열려 있지 않으면 렌더링하지 않음
  }

  return (
    <ModalOverlay>
      <ModalContainer>
        <FormHeader>
          <Title>회원가입</Title>
          <CloseButton onClick={closeSignupModal}>&times;</CloseButton>
        </FormHeader>
        <FormContainer>
          <Form>
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
              >
                인증하기
              </CheckEmailButton>
              <ErrorMessage>{errorMessage}</ErrorMessage>
            </FormGroup>

            {isVerificationFieldVisible && (
              <FormGroup>
                <CertificationNumberInput
                  id="verificationCode"
                  name="verificationCode"
                  type="text"
                  placeholder="인증번호를 입력하세요"
                />
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
  )
}
