import React from 'react'
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
} from '@components/Modal/LoginModal.style'
import loginModalStore from '@stores/modalStore'

export default function LoginModal() {
  const { isModalOpen, closeModal } = loginModalStore()

  if (!isModalOpen) return null

  return (
    <ModalOverlay>
      <ModalContainer>
        <FormContainer>
          <CloseButton onClick={closeModal}>&times;</CloseButton>
          <Title>스터디 플래너</Title>
          <Form>
            <FormGroup>
              <Label>이메일:</Label>
              <Input type="email" required />
            </FormGroup>
            <FormGroup>
              <Label>비밀번호:</Label>
              <Input type="password" required />
            </FormGroup>
            <SubmitButton type="submit">계속하기</SubmitButton>
          </Form>
        </FormContainer>
        <ImageContainer />
      </ModalContainer>
    </ModalOverlay>
  )
}
