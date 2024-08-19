import React from 'react'
import LoginModal from '@components/Modal/LoginModal'
import {
  MainPageContainer,
  MainContent,
  LoginButton,
  MainTitle,
  SubText,
} from './MainPage.style'
import loginModalStore from '@stores/modalStore'
import useUserStore from '@stores/userStore'
import Header from '@components/Header/Header'

export default function MainPage() {
  const openModal = loginModalStore((state) => state.openModal)
  const isModalOpen = loginModalStore((state) => state.isModalOpen)
  const user = useUserStore((state) => state.user)
  const logout = useUserStore((state) => state.logout)

  return (
    <MainPageContainer>
      <Header />
      <MainContent>
        <MainTitle>Harch</MainTitle>
        <SubText>
          Your study journey starts here. Plan your tasks efficiently and
          achieve your goals.
        </SubText>
        {user.id ? (
          <LoginButton onClick={logout}>로그아웃</LoginButton>
        ) : (
          <LoginButton onClick={openModal}>Login</LoginButton>
        )}
        {isModalOpen ? <LoginModal /> : null}
      </MainContent>
    </MainPageContainer>
  )
}
