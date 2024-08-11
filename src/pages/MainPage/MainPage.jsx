import React from 'react'
import LoginModal from '@components/Modal/LoginModal'
import {
  MainPageContainer,
  HeaderContainer,
  MainContent,
  LoginButton,
  Header,
  SubText,
  ProfileImage,
  LoginPrompt,
} from './MainPage.style'
import { useState } from 'react'
import loginModalStore from '@stores/modalStore'
import useUserStore from '@stores/userStore'

export default function MainPage() {
  const openModal = loginModalStore((state) => state.openModal)
  const user = useUserStore((state) => state.user)
  return (
    <MainPageContainer>
      <HeaderContainer>
        {!user.profileImage && <LoginPrompt>로그인을 진행하세요</LoginPrompt>}
        <ProfileImage src={user.profileImage || ''} />
      </HeaderContainer>
      <MainContent>
        <Header>Harch</Header>
        <SubText>
          Your study journey starts here. Plan your tasks efficiently and
          achieve your goals.
        </SubText>
        {user.id && <LoginButton onClick={openModal}>Login</LoginButton>}
        <LoginModal />
      </MainContent>
    </MainPageContainer>
  )
}
