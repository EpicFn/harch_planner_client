import { HeaderContainer, NavLinks } from '@components/Header/Header.style'
import { LoginPrompt, ProfileImage } from '@pages/MainPage/MainPage.style'
import useUserStore from '@stores/userStore'
import { Link } from 'react-router-dom'

export default function Header() {
  const user = useUserStore((state) => state.user)
  return (
    <HeaderContainer>
      <NavLinks>
        <Link to="/calendar">캘린더</Link>
        <Link to="/library">서재</Link>
        <Link to="/daily-plan">일일 학습 플랜</Link>
        <Link to="/performance-record">성과</Link>
      </NavLinks>
      {user.profileImage === null && (
        <LoginPrompt>로그인을 진행하세요</LoginPrompt>
      )}
      {user.profileImage && <ProfileImage src={user.profileImage} />}
    </HeaderContainer>
  )
}
