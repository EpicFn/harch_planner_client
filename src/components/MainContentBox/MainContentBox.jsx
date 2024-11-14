import Header from '@components/Header/Header' // Header 컴포넌트 불러오기
import MenuTap from '@components/MenuTap/MenuTap'
import Preferences from '@components/Preferences/Preferences'
import useThemeStore from '@stores/themeStore'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  ContentBox,
  ContextMenu,
  MainContentBoxContainer,
  MenuList,
} from './MainContentBox.style'

export default function MainContentBox({ content }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { theme, setTheme } = useThemeStore()
  const [activeTab, setActiveTab] = useState(location.pathname)

  //우측클릭을 통한 환경설정 로직 상태관리
  const [showContextMenu, setShowContextMenu] = useState(false)
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 })

  //환경설정 컴포넌트 렌더링 상태관리
  const [showPreferences, setShowPreferences] = useState(false)

  const tabs = [
    { path: '/calendarPage', label: '달력' },
    { path: '/dailyPlannerPage', label: '일일 플래너' },
    { path: '/RecordPage', label: '공부 기록' },
    { path: '/LibraryPage', label: '서재' },
  ]

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme)
  }

  const handleRightClick = (e) => {
    e.preventDefault()
    setShowContextMenu(true)
    setContextMenuPosition({ x: e.clientX, y: e.clientY })
  }

  useEffect(() => {
    document.body.className = ''
    document.body.classList.add(`${theme}-theme`)
  }, [theme])

  const handleTabClick = (path) => {
    setActiveTab(path)
    navigate(path)
  }

  const handleOpenPreferences = () => {
    setShowPreferences(true)
    setShowContextMenu(false)
  }

  const handleClosePreferences = () => {
    setShowPreferences(false)
  }

  return (
    <>
      <Header
        onThemeChange={handleThemeChange}
        onContextMenu={handleRightClick}
      />
      <MainContentBoxContainer
        className={`${theme}-theme`}
        onClick={() => {
          setShowContextMenu(false)
        }}
      >
        {!showPreferences ? (
          <>
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
          </>
        ) : (
          <Preferences onClose={handleClosePreferences} />
        )}

        {showContextMenu && (
          <ContextMenu
            style={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}
            onClick={handleOpenPreferences} // 환경설정 메뉴 클릭 시 Preferences 열기
          >
            환경설정
          </ContextMenu>
        )}
      </MainContentBoxContainer>
    </>
  )
}
