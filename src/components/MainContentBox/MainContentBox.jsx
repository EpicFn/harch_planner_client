import logoutApi from '@apis/logout/logoutApi'
import Header from '@components/Header/Header' // Header 컴포넌트 불러오기
import MenuTap from '@components/MenuTap/MenuTap'
import Preferences from '@components/Preferences/Preferences'
import useThemeStore from '@stores/themeStore'
import useUserStore from '@stores/userStore'
import { useQuery, useQueryClient } from '@tanstack/react-query'
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
  const [showPreferences, setShowPreferences] = useState(false)

  const login = useUserStore((state) => state.login)
  const logout = useUserStore((state) => state.logout)
  const setUser = useUserStore((state) => state.setUser)
  const checkUser = useUserStore((state) => state.user)
  const [cookie, setCookie] = useState(null)
  const queryClient = useQueryClient()

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      // React Query 캐시에서 데이터 가져오기
      const cachedUser = queryClient.getQueryData(['user'])
      if (cachedUser) return cachedUser

      // 캐시가 없으면 로컬 스토리지에서 복구
      const storedUser = JSON.parse(localStorage.getItem('user'))
      if (storedUser) {
        // React Query 캐시 갱신
        queryClient.setQueryData(['user'], storedUser)
        //동기화 된거 유저정보 스토어에 업데이트
        setUser(storedUser)
        return storedUser
      }

      // 캐시 및 로컬 스토리지 데이터가 없으면 에러 발생
      throw new Error('로그인 정보가 없습니다.')
    },
    staleTime: 3600000, // 1시간 동안 Fresh 유지
    cacheTime: 3600000, // 1시간 후 캐시 삭제
    onSuccess: (data) => {
      // Zustand에 상태 동기화
      login(data)
    },
    onError: () => {
      console.log('로그인 정보가 없습니다. 로그인 페이지로 이동합니다.')
      navigate('/')
    },
  })

  const tabs = [
    {
      label: 'Icon1',
      isIconTab: 'true',
      icon: 'src/assets/Ellipse.png',
    },
    {
      label: 'Icon2',
      isIconTab: 'true',
      icon: 'src/assets/Ellipse1.png',
    },
    { path: '/calendarPage', label: '달력', isIconTab: 'false' },
    { path: '/dailyPlannerPage', label: '일일 플래너', isIconTab: 'false' },
    { path: '/RecordPage', label: '공부 기록', isIconTab: 'false' },
    { path: '/LibraryPage', label: '서재', isIconTab: 'false' },
  ]

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme)
  }

  useEffect(() => {
    document.body.className = ''
    document.body.classList.add(`${theme}-theme`)
  }, [theme])

  const handleLogout = async () => {
    try {
      await logoutApi()

      console.log('로그아웃 성공')
    } catch (error) {
      console.error('로그아웃 실패:', error.message || error)
    }
  }

  useEffect(() => {
    // 3시간 만료시간 기준 타이머 설정
    const expireTime = 3 * 60 * 60 * 1000 // 3시간 = 10,800,000ms
    const timeout = setTimeout(() => {
      localStorage.removeItem('user') // 로컬스토리지 초기화
      logout()
      handleLogout()
      navigate('/') // 메인 페이지로 이동
      console.log('쿠키 만료로 인해 로그아웃 처리되었습니다.')
    }, expireTime)

    return () => {
      clearTimeout(timeout) // 컴포넌트 언마운트 시 타이머 정리
    }
  }, [logout, navigate])

  console.log(checkUser)

  const handleTabClick = (tab) => {
    if (tab.isIconTab === 'true') {
      setShowPreferences(true)
    } else if (tab.isIconTab === 'false') {
      setShowPreferences(false)
      setActiveTab(tab.path)
      navigate(tab.path)
    }
  }

  const handlePreferencesClose = () => {
    setShowPreferences(false)
  }

  return (
    <>
      <Header onThemeChange={handleThemeChange} />
      <MainContentBoxContainer className={`${theme}-theme`}>
        {showPreferences ? (
          <Preferences onClose={handlePreferencesClose} />
        ) : (
          <>
            <MenuList>
              {tabs.map((tab) => (
                <MenuTap
                  key={tab.path || tab.label}
                  active={activeTab === tab.path ? 'true' : 'false'}
                  icontab={tab.isIconTab}
                  onClick={() => handleTabClick(tab)}
                >
                  {tab.isIconTab && tab.icon ? (
                    <img
                      src={tab.icon}
                      alt={`${tab.label} icon`}
                      style={{ width: '18px', height: '18px' }}
                    />
                  ) : (
                    tab.label
                  )}
                </MenuTap>
              ))}
            </MenuList>
            <ContentBox>{content}</ContentBox>
          </>
        )}
      </MainContentBoxContainer>
    </>
  )
}
