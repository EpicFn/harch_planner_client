import React from 'react'
import LoginModal from '@components/Modal/LoginModal'
import { MainPageContainer, LoginButton } from './MainPage.style'
import loginModalStore from '@stores/modalStore'

export default function MainPage() {
  const openModal = loginModalStore((state) => state.openModal)

  return (
    <MainPageContainer>
      <h1>Welcome to the Main Page</h1>
      <LoginButton onClick={openModal}>Login</LoginButton>
      <LoginModal />
    </MainPageContainer>
  )
}
