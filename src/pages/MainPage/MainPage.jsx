import LoginModal from '@components/LoginModal/LoginModal'
import MainHeader from '@components/MainHeader/MainHeader'
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
  const openModal = loginModalStore((state) => state.openModal)
  const isModalOpen = loginModalStore((state) => state.isModalOpen)
  const user = useUserStore((state) => state.user)
  const logout = useUserStore((state) => state.logout)

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

  useEffect(() => {
    if (!user.id) {
      openModal()
    }
  }, [user.id])

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
          <LoginButton onClick={openModal}>로그인</LoginButton>
        )}
        {isModalOpen ? <LoginModal /> : null}
      </MainContent>
    </MainPageContainer>
  )
}
