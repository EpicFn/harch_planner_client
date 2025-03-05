import useThemeStore from '@stores/themeStore'
import useUserStore from '@stores/userStore'
import { useNavigate } from 'react-router-dom'
import {
  DdayBox,
  HeaderContainer,
  Logo,
  ThemeButton,
  ThemeButtonContainer,
  UserNicknameBox,
  UserProfileBox,
} from './Header.style'

export default function Header({ onThemeChange, onContextMenu }) {
  const setTheme = useThemeStore((state) => state.setTheme)
  const user = useUserStore((state) => state.user)
  const navigate = useNavigate()

  const handleThemeChange = (theme) => {
    const selectedTheme = theme
    setTheme(selectedTheme)
    if (onThemeChange) {
      onThemeChange(selectedTheme)
    }
  }

  return (
    <HeaderContainer>
      <Logo src="src/assets/logo/Harch.png" onClick={() => navigate('/')} />
      <ThemeButtonContainer>
        <ThemeButton
          color="#C8EBBF"
          onClick={() => handleThemeChange('light-green')}
        />
        <ThemeButton
          color="#FFE8F7"
          onClick={() => handleThemeChange('light-pink')}
        />
      </ThemeButtonContainer>
      <UserProfileBox>
        <DdayBox>D-154</DdayBox>
        <UserNicknameBox onContextMenu={onContextMenu}>
          {user.username}
        </UserNicknameBox>
      </UserProfileBox>
    </HeaderContainer>
  )
}
