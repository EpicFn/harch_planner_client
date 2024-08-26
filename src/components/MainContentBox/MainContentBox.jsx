import Header from '@components/Header/Header' // Header 컴포넌트 불러오기
import { useEffect, useState } from 'react'
import {
  ContentBox,
  MainContentBoxContainer,
  MenuList,
  MenuTap,
} from './MainContentBox.style'

export default function MainContentBox({ content }) {
  const [theme, setTheme] = useState('light-green')

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme)
  }

  useEffect(() => {
    document.body.className = ''
    document.body.classList.add(`${theme}-theme`)
  }, [theme])

  return (
    <>
      <Header onThemeChange={handleThemeChange} />
      <MainContentBoxContainer className={`${theme}-theme`}>
        <MenuList>
          <MenuTap>달력</MenuTap>
          <MenuTap on>일일 플래너</MenuTap>
          <MenuTap>공부 기록</MenuTap>
          <MenuTap>서재</MenuTap>
        </MenuList>

        <ContentBox>{content}</ContentBox>
      </MainContentBoxContainer>
    </>
  )
}
