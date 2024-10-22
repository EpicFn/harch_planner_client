import { debounce } from 'lodash'
import { Suspense, useEffect, useState } from 'react'

import LibraryAddModal from '@components/Library/LibraryModal/LibraryAddModal/LibraryAddModal'
import LibraryEditModal from '@components/Library/LibraryModal/LibraryEditModal/LibraryEditModal'
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
import LoadingSpinner from '@components/Loading/LoadingSpinner'
import workBookContentStore from '@stores/workBookContentStore'

export default function Library() {
  const workbooks = workBookContentStore((state) => state.workbooks)
  const setWorkbooks = workBookContentStore((state) => state.setWorkbooks)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false) // 추가 모달 상태
  const [isEditModalOpen, setIsEditModalOpen] = useState(false) // 편집 모달 상태
  const [isEditing, setIsEditing] = useState(false) // 추가/수정 모드 구분 상태
  const [selectedWorkbookIndex, setSelectedWorkbookIndex] = useState(null)
  const [searchTerm, setSearchTerm] = useState('') // 검색어 상태
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  const debouncedSearch = debounce((value) => {
    setDebouncedSearchTerm(value)
  }, 300)

  useEffect(() => {
    debouncedSearch(searchTerm)

    // 컴포넌트가 언마운트될 때 debounce 타이머를 정리
    return () => {
      debouncedSearch.cancel()
    }
  }, [searchTerm])

  useEffect(() => {
    // workbooks 상태가 변경될 때 필터링된 교재 리스트 다시 계산
    console.log('Workbooks updated:', workbooks)
  }, [workbooks])

  const openEditModal = (index) => {
    const actualIndex = workbooks.findIndex(
      (workbook) => workbook.name === filteredWorkbooks[index].name,
    )
    setSelectedWorkbookIndex(actualIndex)
    setIsEditModalOpen(true)
  }

  const openAddModal = () => {
    setIsAddModalOpen(true)
  }

  // 검색어에 따라 문제집 필터링
  const filteredWorkbooks = workbooks.filter((workbook) =>
    workbook.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
  )

  console.log(workbooks)

  return (
    <LibraryContainer>
      {/* 왼쪽 학습중인 교재 목록 */}
      <OngoingSection>
        <OngoingSectionHeader>
          <SectionTitle>학습중인 교재 목록</SectionTitle>
          <SearchContainer>
            <SearchIcon />
            <SearchInput
              placeholder="검색어를 입력하세요..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>
          <AddButton onClick={openAddModal}>추가하기</AddButton>
        </OngoingSectionHeader>
        <Suspense fallback={<LoadingSpinner />}>
          <OngoingSectionContent>
            {filteredWorkbooks.map((workbook, index) => (
              <WorkBookItem
                key={index}
                workbook={workbook}
                onClick={() => openEditModal(index)} // 수정 모달 열기
              />
            ))}
          </OngoingSectionContent>
        </Suspense>
      </OngoingSection>

      {/* 오른쪽 완료한 교재 목록 */}
      <CompletedSection>
        <SectionTitle>완료한 교재</SectionTitle>
      </CompletedSection>

      {isAddModalOpen && (
        <LibraryAddModal
          onClose={() => setIsAddModalOpen(false)} // 추가 모달 닫기
        />
      )}

      {isEditModalOpen && (
        <LibraryEditModal
          workbook={workbooks[selectedWorkbookIndex]}
          onClose={() => setIsEditModalOpen(false)} // 편집 모달 닫기
          workbookIndex={selectedWorkbookIndex}
        />
      )}
    </LibraryContainer>
  )
}
