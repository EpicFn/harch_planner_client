import logoutApi from '@apis/logout/logoutApi'
import LoginModal from '@components/LoginModal/LoginModal'
import MainHeader from '@components/MainHeader/MainHeader'
import SignupModal from '@components/SignupModal/SignupModal'
import ModalStore from '@stores/modalStore'
import useUserStore from '@stores/userStore'
import { useQueryClient } from '@tanstack/react-query'
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

function preloadImages(imageArray, callback) {
  let loadedCount = 0
  imageArray.forEach((image) => {
    const img = new Image()
    img.src = image
    img.onload = () => {
      loadedCount++
      if (loadedCount === imageArray.length) {
        callback() // 모든 이미지가 로드되면 콜백 실행
      }
    }
    img.onerror = () => console.error(`Failed to load image: ${image}`)
  })
}

export default function MainPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const openLoginModal = ModalStore((state) => state.openLoginModal)
  const isLoginModalOpen = ModalStore((state) => state.isLoginModalOpen)
  const isSignupModalOpen = ModalStore((state) => state.isSignupModalOpen)
  const user = useUserStore((state) => state.user)
  const login = useUserStore((state) => state.login)

  const queryClient = useQueryClient()

  console.log('isLoginModalOpen 상태:', isLoginModalOpen)

  const logout = async () => {
    try {
      await logoutApi()

      // 상태 및 캐시 초기화
      useUserStore.getState().logout()
      queryClient.removeQueries(['user'])
      localStorage.removeItem('user')

      console.log('로그아웃 성공')
    } catch (error) {
      console.error('로그아웃 실패:', error.message || error)
    }
  }

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      login(JSON.parse(storedUser))
    }
  }, [login])

  useEffect(() => {
    preloadImages(images, () => setIsLoaded(true)) // 프리로딩 완료되면 로딩 상태 업데이트
  }, [])

  useEffect(() => {
    if (isLoaded) {
      const intervalId = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
      }, 5000)
      return () => clearInterval(intervalId) // 메모리 누수 방지
    }
  }, [isLoaded])

  if (!isLoaded) return null

  return (
    <MainPageContainer backgroundimage={images[currentImageIndex]}>
      <MainHeader />
      <MainContent>
        <MainTitle>Harch</MainTitle>
        <SubText>
          Your study journey starts here. Plan your tasks efficiently and
          achieve your goals.
        </SubText>
        {user.id ? (
          <LoginButton onClick={logout}>로그아웃</LoginButton>
        ) : (
          <LoginButton onClick={openLoginModal}>로그인</LoginButton>
        )}
        {isLoginModalOpen && !isSignupModalOpen && <LoginModal />}
        {isSignupModalOpen && <SignupModal />}
      </MainContent>
    </MainPageContainer>
  )
}
