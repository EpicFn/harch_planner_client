import GoogleIcon from '@assets/google-icon.png'
import KakaoIcon from '@assets/kakao-icon.png'
import NaverIcon from '@assets/naver-icon.png'
import DefaultProfileImage from '@assets/프로필사진.jpg' // 기본 프로필 이미지 경로
import {
  AltText,
  CloseButton,
  ErrorMessage,
  Form,
  FormContainer,
  FormGroup,
  IconImage,
  IconWrapper,
  ImageContainer,
  Input,
  Label,
  ModalContainer,
  ModalOverlay,
  ProfileImage,
  ProfileImageContainer,
  ProfileImageWrapper,
  SubmitButton,
  Title,
} from '@components/LoginModal/LoginModal.style'
import loginModalStore from '@stores/modalStore'
import useUserStore from '@stores/userStore'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginModal() {
  const { isModalOpen, closeModal } = loginModalStore()
  const login = useUserStore((state) => state.login)
  const [inputIdValue, setInputIdValue] = useState('')
  const [inputPasswordValue, setInputPasswordValue] = useState('')
  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)
  const dummyUser = useUserStore((state) => state.dummyUser)
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()

  const handleIdInputChange = (e) => {
    setInputIdValue(e.target.value)
    setErrorMessage('')
  }

  const handlePasswordInputChange = (e) => {
    setInputPasswordValue(e.target.value)
    setErrorMessage('')
  }

  useEffect(() => {
    if (isModalOpen) {
      setInputIdValue('')
      setInputPasswordValue('')
      setErrorMessage('')
    }
  }, [isModalOpen])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!inputIdValue || !inputPasswordValue) {
      setErrorMessage('아이디와 비밀번호를 입력하세요.')
    } else if (
      inputIdValue === dummyUser.id &&
      inputPasswordValue === dummyUser.password
    ) {
      setUser({
        id: inputIdValue,
        password: inputPasswordValue,
        profileImage: DefaultProfileImage,
        name: dummyUser.name, // 로그인 성공 시 dummyUser의 이름을 설정
      })
      login() // 로그인 성공 시 login 함수 호출
    } else {
      setErrorMessage('아이디 또는 비밀번호가 일치하지 않습니다.')
    }
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
            <IconImage src={NaverIcon} alt="Naver"></IconImage>
            <IconImage src={KakaoIcon} alt="Kakao"></IconImage>
          </IconWrapper>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>이메일</Label>
              <Input
                type="email"
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
            <SubmitButton type="submit" onClick={login}>
              로그인
            </SubmitButton>
          </Form>
        </FormContainer>
        <ImageContainer />
      </ModalContainer>
    </ModalOverlay>
  )
}
