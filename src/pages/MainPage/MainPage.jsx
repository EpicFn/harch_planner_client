import Header from '@components/Header/Header'
import LoginModal from '@components/Modal/LoginModal'
import loginModalStore from '@stores/modalStore'
import useUserStore from '@stores/userStore'
import { useEffect, useState } from 'react'
import {
  LoginButton,
  MainContent,
  MainPageContainer,
  MainTitle,
  SubText,
} from './MainPage.style'

const images = [
  '/src/assets/studying.jpg',
  '/src/assets/studying2.jpg',
  '/src/assets/studying3.jpg',
  '/src/assets/studying4.jpg',
]

export default function MainPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const openModal = loginModalStore((state) => state.openModal)
  const isModalOpen = loginModalStore((state) => state.isModalOpen)
  const user = useUserStore((state) => state.user)
  const logout = useUserStore((state) => state.logout)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <MainPageContainer backgroundimage={images[currentImageIndex]}>
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
