import { useState } from 'react'
import {
  DdayBox,
  HeaderContainer,
  LogoBox,
  ThemeButton,
  ThemeButtonContainer,
  UserNicknameBox,
  UserProfileBox,
} from './Header.style'

export default function Header({ onThemeChange }) {
  const [theme, setTheme] = useState('light-green') // 기본 테마는 'light-green'

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme)
    onThemeChange(selectedTheme) // 부모 컴포넌트로 테마 변경 알림
  }

  return (
    <HeaderContainer>
      <LogoBox>Harch</LogoBox>
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
        <UserNicknameBox>User0309</UserNicknameBox>
      </UserProfileBox>
    </HeaderContainer>
  )
}
