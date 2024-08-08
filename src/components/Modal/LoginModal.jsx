import React, { useEffect } from 'react'
import { useState } from 'react'
import {
  ModalOverlay,
  ModalContainer,
  CloseButton,
  FormContainer,
  ImageContainer,
  Title,
  Form,
  FormGroup,
  Label,
  Input,
  SubmitButton,
  IconWrapper,
  IconImage,
  ErrorMessage,
} from '@components/Modal/LoginModal.style'
import loginModalStore from '@stores/modalStore'
import useUserStore from '@stores/userStore'
import GoogleIcon from '@assets/google-icon.png'
import NaverIcon from '@assets/naver-icon.png'
import KakaoIcon from '@assets/kakao-icon.png'

export default function LoginModal() {
  const { isModalOpen, closeModal } = loginModalStore()
  const [inputIdValue, setInputIdValue] = useState('')
  const [inputPasswordValue, setInputPasswordValue] = useState('')
  const user = useUserStore((state) => state.user)
  const [errorMessage, setErrorMessage] = useState('')

  const handleIdInputChange = (e) => {
    setInputIdValue(e.target.value)
  }

  const handlePasswordInputChange = (e) => {
    setInputPasswordValue(e.target.value)
  }

  useEffect(() => {
    if (isModalOpen) {
      setInputIdValue('')
      setInputPasswordValue('')
      setErrorMessage('')
    }
  }, [isModalOpen])

  const handleSubmit = (e) => {
    //유효성 검사 로직
    e.preventDefault()
    if (!inputIdValue || !inputPasswordValue) {
      setErrorMessage('아이디와 비밀번호를 입력하세요.')
    } else if (
      inputIdValue !== user.id ||
      inputPasswordValue !== user.password
    ) {
      setErrorMessage('아이디 또는 비밀번호가 일치하지 않습니다.')
    } else {
      setErrorMessage('')
      closeModal()
    }
  }

  if (!isModalOpen) return null
  return (
    <ModalOverlay>
      <ModalContainer>
        <FormContainer>
          <CloseButton onClick={closeModal}>&times;</CloseButton>
          <Title>스터디 플래너</Title>
          <IconWrapper>
            <IconImage src={GoogleIcon} alt="Google"></IconImage>
            <IconImage src={NaverIcon} alt="Naver"></IconImage>
            <IconImage src={KakaoIcon} alt="Kakao"></IconImage>
          </IconWrapper>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>이메일:</Label>
              <Input
                type="email"
                value={inputIdValue}
                onChange={handleIdInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>비밀번호:</Label>
              <Input
                type="password"
                value={inputPasswordValue}
                onChange={handlePasswordInputChange}
              />
            </FormGroup>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            <SubmitButton type="submit">로그인</SubmitButton>
          </Form>
        </FormContainer>
        <ImageContainer />
      </ModalContainer>
    </ModalOverlay>
  )
}
