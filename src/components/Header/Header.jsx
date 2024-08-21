import { HeaderContainer } from '@components/Header/Header.style'
import { LoginPrompt, ProfileImage } from '@pages/MainPage/MainPage.style'
import useUserStore from '@stores/userStore'

export default function Header() {
  const user = useUserStore((state) => state.user)
  return (
    <HeaderContainer>
      {user.profileImage === null && (
        <LoginPrompt>로그인을 진행하세요</LoginPrompt>
      )}
      {user.profileImage && <ProfileImage src={user.profileImage} />}
    </HeaderContainer>
  )
}
