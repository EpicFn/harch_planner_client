import Header from '@components/Header/Header' // Header 컴포넌트 불러오기
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  ContentBox,
  MainContentBoxContainer,
  MenuList,
} from './MainContentBox.style'

import MenuTap from '@components/MenuTap/MenuTap'

export default function MainContentBox({ content }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [theme, setTheme] = useState('#E1E1E1')
  const [activeTab, setActiveTab] = useState(location.pathname)

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme)
  }

  useEffect(() => {
    document.body.className = ''
    document.body.classList.add(`${theme}-theme`)
  }, [theme])

  const handleTabClick = (path) => {
    setActiveTab(path)
    navigate(path)
  }

  return (
    <>
      <Header onThemeChange={handleThemeChange} />
      <MainContentBoxContainer className={`${theme}-theme`}>
        <MenuList>
          <MenuTap
            active={activeTab === '/calendarPage' ? 'true' : 'false'}
            onClick={() => handleTabClick('/calendarPage')}
          >
            달력
          </MenuTap>
          <MenuTap
            active={activeTab === '/dailyPlannerPage' ? 'true' : 'false'}
            onClick={() => handleTabClick('/dailyPlannerPage')}
          >
            일일 플래너
          </MenuTap>
          <MenuTap
            active={activeTab === '/RecordPage' ? 'true' : 'false'}
            onClick={() => handleTabClick('/RecordPage')}
          >
            공부 기록
          </MenuTap>
          <MenuTap
            active={activeTab === '/LibraryPage' ? 'true' : 'false'}
            onClick={() => handleTabClick('/LibraryPage')}
          >
            서재
          </MenuTap>
        </MenuList>

        <ContentBox>{content}</ContentBox>
      </MainContentBoxContainer>
    </>
  )
}
