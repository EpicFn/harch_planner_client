import {
  CloseButton,
  Content,
  PreferencesContainer,
  PreferencesContent,
  PreferencesHeader,
  Sidebar,
  SidebarItem,
  StudyEnvironmentContainer,
  SubjectCircle,
  ThemeContainer,
  UserInfoContainer,
  WorkbookContainer,
  WorkbookHeader,
} from '@components/Preferences/Preferences.style'
import useUserStore from '@stores/userStore'
import workBookContentStore from '@stores/workbookContentStore'
import { useState } from 'react'

export default function Preferences({ onClose }) {
  const [selectedTap, setSelectedTab] = useState('내 정보')
  const workbooks = workBookContentStore((state) => state.workbooks)
  const user = useUserStore((state) => state.user)

  const handleSidebarItemClick = (itemName) => {
    setSelectedTab(itemName) // 클릭된 탭 이름으로 상태 업데이트
  }

  const subjectColor =
    workbooks.find((wb) => wb.subject)?.subjectColor || '#ccc'

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
            onClick={() => handleSidebarItemClick('공부환경')}
            selected={selectedTap === '공부환경'}
          >
            공부환경
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
              <h3>내 정보</h3>
              <div className="user-name">이름: {user.name}</div>
              <div className="user-info">이메일: {user.email}</div>
            </UserInfoContainer>
          )}
          {selectedTap === '공부환경' && (
            <StudyEnvironmentContainer>
              <h3>공부환경</h3>
              {Array.from(
                new Set(workbooks.map((workbook) => workbook.subject)),
              ).map((subject) => {
                const workbook = workbooks.find((wb) => wb.subject === subject)
                return (
                  <WorkbookContainer key={workbook.id}>
                    <WorkbookHeader>
                      <SubjectCircle color={workbook.subjectColor} />
                      <span>{workbook.subject}</span>
                    </WorkbookHeader>
                  </WorkbookContainer>
                )
              })}
            </StudyEnvironmentContainer>
          )}
          {selectedTap === '테마' && (
            <ThemeContainer>
              <h3>테마</h3>
            </ThemeContainer>
          )}
        </Content>
      </PreferencesContent>
    </PreferencesContainer>
  )
}
