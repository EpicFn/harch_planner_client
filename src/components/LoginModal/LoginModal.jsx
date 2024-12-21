import loginApi from '@apis/login/loginApi'
import GoogleIcon from '@assets/google-icon.png'
import KakaoIcon from '@assets/kakao-icon.png'
import NaverIcon from '@assets/naver-icon.png'
import {
  AltText,
  CloseButton,
  ErrorMessage,
  Form,
  FormBottom,
  FormContainer,
  FormGroup,
  IconImage,
  IconWrapper,
  ImageContainer,
  Input,
  Label,
  LoginButton,
  ModalContainer,
  ModalOverlay,
  ProfileImage,
  ProfileImageContainer,
  ProfileImageWrapper,
  SignupText,
  Title,
} from '@components/LoginModal/LoginModal.style'
import SignupModal from '@components/SignupModal/SignupModal'
import loginModalStore from '@stores/modalStore'
import useUserStore from '@stores/userStore'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginModal() {
  const { isModalOpen, closeModal } = loginModalStore()

  const [inputIdValue, setInputIdValue] = useState('')
  const [inputPasswordValue, setInputPasswordValue] = useState('')
  const user = useUserStore((state) => state.user)
  const [errorMessage, setErrorMessage] = useState('')

  const [showSignupModal, setShowSignupModal] = useState(false)

  const navigate = useNavigate()

  const handleIdInputChange = (e) => {
    setInputIdValue(e.target.value)
    setErrorMessage('')
  }

  const handlePasswordInputChange = (e) => {
    setInputPasswordValue(e.target.value)
    setErrorMessage('')
  }

  const handleNaverIconClick = () => {
    fetch('https://218.239.229.119:1500/account/oauth2/naver/get_state', {
      method: 'GET',
      credentials: 'include', // 쿠키를 포함하도록 설정
      mode: 'cors',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        const state = data.state // data 객체에서 state 값을 가져옴
        const expires = new Date()
        expires.setMinutes(expires.getMinutes() + 10) // 10분 후 만료 (원하는 시간으로 변경 가능)
        document.cookie = `state=${state}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`
        const clientId = 'ilzHH8TQYwF9UE92H7Ak' // 네이버 클라이언트 ID
        const redirectUri = encodeURIComponent('http://localhost:5173/loading') // 리디렉션 URI
        const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`
        window.location.href = naverAuthUrl
      })
      .catch((error) => {
        console.error('Error fetching state:', error)
      })
  }

  useEffect(() => {
    if (isModalOpen) {
      setInputIdValue('')
      setInputPasswordValue('')
      setErrorMessage('')
    }
  }, [isModalOpen])

  const queryClient = useQueryClient()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!inputIdValue || !inputPasswordValue) {
      setErrorMessage('아이디와 비밀번호를 입력하세요.')
      return
    }

    try {
      const responseData = await loginApi(inputIdValue, inputPasswordValue)

      // Zustand와 React Query에 동시에 저장
      useUserStore.getState().login({
        id: responseData.id,
        userid: responseData.userid,
        username: responseData.username,
        email: responseData.email,
        soundSetting: responseData.sound_setting,
      })

      queryClient.setQueryData(['user'], responseData, {
        staleTime: 3 * 60 * 60 * 1000, // 3시간
        cacheTime: 3 * 60 * 60 * 1000,
      }) // React Query 캐시에 저장

      //로컬스토리지에도 저장
      localStorage.setItem('user', JSON.stringify(responseData))

      closeModal() // 로그인 성공 후 모달 닫기
      navigate('/dailyPlannerPage') // 페이지 이동
    } catch (error) {
      setErrorMessage(error.message || '로그인에 실패했습니다.')
    }
  }

  const handleShowSignupModal = () => {
    setShowSignupModal(true)
  }

  useEffect(() => {
    if (user.id) {
      // user.id가 설정된 이후에 페이지 이동
      closeModal()
      navigate('/dailyPlannerPage')
    }
  }, [user.id, navigate, closeModal])

  if (!isModalOpen) return null
  return (
    <ModalOverlay>
      {showSignupModal === false ? (
        <ModalContainer>
          <FormContainer>
            <CloseButton onClick={closeModal}>&times;</CloseButton>
            <Title>스터디 플래너</Title>
            <ProfileImageContainer>
              <ProfileImageWrapper>
                <ProfileImage src={user.profileImage} />
                {!user.profileImage && <AltText>profile</AltText>}
              </ProfileImageWrapper>
            </ProfileImageContainer>
            <IconWrapper>
              <IconImage src={GoogleIcon} alt="Google"></IconImage>
              <IconImage
                src={NaverIcon}
                alt="Naver"
                onClick={handleNaverIconClick}
              ></IconImage>
              <IconImage src={KakaoIcon} alt="Kakao"></IconImage>
            </IconWrapper>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>이메일</Label>
                <Input
                  type="text"
                  value={inputIdValue}
                  onChange={handleIdInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label>비밀번호</Label>
                <Input
                  type="password"
                  value={inputPasswordValue}
                  onChange={handlePasswordInputChange}
                />
              </FormGroup>
              {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
              <FormBottom>
                <LoginButton type="submit">로그인</LoginButton>
                <SignupText onClick={handleShowSignupModal}>
                  회원가입
                </SignupText>
              </FormBottom>
            </Form>
          </FormContainer>
          <ImageContainer />
        </ModalContainer>
      ) : (
        <SignupModal />
      )}
    </ModalOverlay>
  )
}
