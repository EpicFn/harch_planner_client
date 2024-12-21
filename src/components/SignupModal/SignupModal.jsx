import {
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
import loginModalStore from '@stores/modalStore'
import { useEffect, useState } from 'react'

export default function SignupModal() {
  const { isModalOpen, closeModal } = loginModalStore()
  const [userInfo, setUserInfo] = useState({
    userId: '',
    userName: '',
    email: '',
    password: '',
  })

  useEffect(() => {
    if (isModalOpen) {
      setUserInfo({
        userId: '',
        userName: '',
        email: '',
        password: '',
      })
    }
  }, [isModalOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  if (!isModalOpen) {
    return null // 모달이 열려 있지 않으면 렌더링하지 않음
  }

  return (
    <ModalOverlay>
      <ModalContainer>
        <FormHeader>
          <Title>회원가입</Title>
          <CloseButton onClick={closeModal}>&times;</CloseButton>
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
                type="email"
                placeholder="이메일을 입력하세요"
                value={userInfo.email}
                onChange={handleChange}
              />
              <CheckEmailButton>인증하기</CheckEmailButton>
              <ErrorMessage></ErrorMessage>
            </FormGroup>

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
