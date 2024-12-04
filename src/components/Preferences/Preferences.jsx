import {
  CloseButton,
  Content,
  EditButton,
  InfoIcon,
  InfoItem,
  InfoText,
  PreferencesContainer,
  PreferencesContent,
  PreferencesHeader,
  ProfilePic,
  Sidebar,
  SidebarItem,
  StyledInput,
  ThemeBox,
  ThemeBoxContainer,
  ThemeContainer,
  UserInfoCard,
  UserInfoContainer,
  UserInfoHeader,
} from '@components/Preferences/Preferences.style'
import useThemeStore from '@stores/themeStore'
import useUserStore from '@stores/userStore'
import workBookContentStore from '@stores/workbookContentStore'
import { useState } from 'react'

export default function Preferences({ onClose }) {
  const [selectedTap, setSelectedTab] = useState('내 정보')
  const workbooks = workBookContentStore((state) => state.workbooks)
  const user = useUserStore((state) => state.user)
  const theme = useThemeStore((state) => state.theme)
  const setTheme = useThemeStore((state) => state.setTheme)

  const handleSidebarItemClick = (itemName) => {
    setSelectedTab(itemName) // 클릭된 탭 이름으로 상태 업데이트
  }

  const themes = [
    { name: 'default', color: '#f5f5f5' },
    { name: 'dark', color: '#333333' },
    { name: 'light', color: '#ffffff' },
    { name: 'blue', color: '#007BFF' },
    { name: 'green', color: '#28a745' },
    { name: 'gold', color: '#d4af37' },
    { name: 'purple', color: '#5e42a6' },
    { name: 'rose-gold', color: '#c09690' },
  ]

  const handleTheme = (themeName) => {
    setTheme(themeName)
  }

  return (
    <PreferencesContainer>
      <PreferencesHeader>
        <span>환경설정</span>
        <CloseButton onClick={onClose}>×</CloseButton>
      </PreferencesHeader>
      <PreferencesContent>
        <Sidebar>
          <SidebarItem
            onClick={() => handleSidebarItemClick('내 정보')}
            selected={selectedTap === '내 정보'}
          >
            내 정보
          </SidebarItem>
          <SidebarItem
            onClick={() => handleSidebarItemClick('테마')}
            selected={selectedTap === '테마'}
          >
            테마
          </SidebarItem>
        </Sidebar>
        <Content>
          {selectedTap === '내 정보' && (
            <UserInfoContainer>
              <UserInfoHeader>내 정보</UserInfoHeader>
              <ProfilePic>
                <span>👤</span>
              </ProfilePic>
              <UserInfoCard>
                <InfoItem>
                  <InfoIcon>👤</InfoIcon>
                  <InfoText>이름: </InfoText>
                  <StyledInput
                    type="text"
                    value={user.username}
                    onChange={(e) => setUsername(e.target.value)}
                    readOnly={true}
                    placeholder="이름을 입력하세요"
                  />
                </InfoItem>
                <InfoItem>
                  <InfoIcon>📧</InfoIcon>
                  <InfoText>아이디: </InfoText>
                  <StyledInput
                    type="email"
                    value={user.email}
                    onChange={(e) => setEmail(e.target.value)}
                    readOnly={true}
                    placeholder="아이디를 입력하세요"
                  />
                </InfoItem>
                <InfoItem>
                  <InfoIcon>🔑</InfoIcon>
                  <InfoText>패스워드: </InfoText>
                  <StyledInput
                    type="password"
                    value={user.username}
                    onChange={(e) => setPassword(e.target.value)}
                    readOnly={true}
                    placeholder="패스워드를 입력하세요"
                  />
                </InfoItem>
                <EditButton>수정</EditButton>
              </UserInfoCard>
            </UserInfoContainer>
          )}

          {selectedTap === '테마' && (
            <ThemeContainer>
              <span>테마 선택</span>
              <ThemeBoxContainer>
                {themes.map((t) => (
                  <ThemeBox
                    key={t.name}
                    bgcolor={t.color}
                    selected={theme === t.name}
                    onClick={() => handleTheme(t.name)}
                  >
                    {t.name}
                  </ThemeBox>
                ))}
              </ThemeBoxContainer>
            </ThemeContainer>
          )}
        </Content>
      </PreferencesContent>
    </PreferencesContainer>
  )
}
