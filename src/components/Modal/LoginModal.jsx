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
} from '@components/Modal/LoginModal.style'
import loginModalStore from '@stores/modalStore'
import GoogleIcon from '@assets/google-icon.png'
import NaverIcon from '@assets/naver-icon.png'
import KakaoIcon from '@assets/kakao-icon.png'

export default function LoginModal() {
  const { isModalOpen, closeModal } = loginModalStore()
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
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
          <Form>
            <FormGroup>
              <Label>이메일:</Label>
              <Input
                type="email"
                value={inputValue}
                onChange={() => handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>비밀번호:</Label>
              <Input type="password" value={inputValue} />
            </FormGroup>
            <SubmitButton type="submit">로그인</SubmitButton>
          </Form>
        </FormContainer>
        <ImageContainer />
      </ModalContainer>
    </ModalOverlay>
  )
}
