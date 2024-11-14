import {
  CloseButton,
  Content,
  PreferencesContainer,
  PreferencesContent,
  PreferencesHeader,
  Sidebar,
  SidebarItem,
} from '@components/Preferences/Preferences.style'

export default function Preferences({ onClose }) {
  return (
    <PreferencesContainer>
      <PreferencesHeader>
        <span>환경설정</span>
        <CloseButton onClick={onClose}>×</CloseButton>
      </PreferencesHeader>
      <PreferencesContent>
        <Sidebar>
          <SidebarItem>내 정보</SidebarItem>
          <SidebarItem>공부환경</SidebarItem>
          <SidebarItem>테마</SidebarItem>
        </Sidebar>
        <Content />
      </PreferencesContent>
    </PreferencesContainer>
  )
}
