import { useState } from 'react'

import {
  AddButton,
  CompletedSection,
  LibraryContainer,
  OngoingSection,
  OngoingSectionContent,
  OngoingSectionHeader,
  SearchContainer,
  SearchIcon,
  SearchInput,
  SectionTitle,
} from './Library.style'

import WorkBookItem from '@components/Library/WorkBook/WorkBookItem/WorkBookItem'

export default function Library() {
  const [workbooks, setWorkbooks] = useState([
    {
      name: '문제집 이름을 입력해주세요',
      subject: '과목 이름을 입력해주세요',
      date: '23.08.01',
      progress: '65',
    },
  ])

  const addWorkBook = () => {
    setWorkbooks([
      ...workbooks,
      {
        name: '문제집 이름을 입력해주세요',
        subject: '과목 이름을 입력해주세요',
        date: '23.08.01',
        progress: '65',
      },
    ])
  }
  return (
    <LibraryContainer>
      {/* 왼쪽 학습중인 교재 목록 */}
      <OngoingSection>
        <OngoingSectionHeader>
          <SectionTitle>학습중인 교재 목록</SectionTitle>
          <SearchContainer>
            <SearchIcon />
            <SearchInput placeholder="검색어를 입력하세요..." />
          </SearchContainer>
          <AddButton onClick={addWorkBook}>추가하기</AddButton>
        </OngoingSectionHeader>
        <OngoingSectionContent>
          {workbooks.map((workbook, index) => (
            <WorkBookItem key={index} workbook={workbook} />
          ))}
        </OngoingSectionContent>
      </OngoingSection>

      {/* 오른쪽 완료한 교재 목록 */}
      <CompletedSection>
        <SectionTitle>완료한 교재</SectionTitle>
      </CompletedSection>
    </LibraryContainer>
  )
}
