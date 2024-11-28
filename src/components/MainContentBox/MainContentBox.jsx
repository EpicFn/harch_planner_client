import Header from '@components/Header/Header' // Header 컴포넌트 불러오기
import MenuTap from '@components/MenuTap/MenuTap'
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
  const login = useUserStore((state) => state.login)
  const setUser = useUserStore((state) => state.setUser)
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
