import Header from '@components/Header/Header' // Header 컴포넌트 불러오기
import MenuTap from '@components/MenuTap/MenuTap'
import useThemeStore from '@stores/themeStore'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  ContentBox,
  MainContentBoxContainer,
  MenuList,
} from './MainContentBox.style'

export default function MainContentBox({ content }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { theme, setTheme } = useThemeStore()
  const [activeTab, setActiveTab] = useState(location.pathname)

  const tabs = [
    { path: '/calendarPage', label: '달력' },
    { path: '/dailyPlannerPage', label: '일일 플래너' },
    { path: '/RecordPage', label: '공부 기록' },
    { path: '/LibraryPage', label: '서재' },
  ]

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
          {tabs.map((tab) => (
            <MenuTap
              key={tab.path}
              active={activeTab === tab.path ? 'true' : 'false'}
              onClick={() => handleTabClick(tab.path)}
            >
              {tab.label}
            </MenuTap>
          ))}
        </MenuList>

        <ContentBox>{content}</ContentBox>
      </MainContentBoxContainer>
    </>
  )
}
