import { debounce } from 'lodash'
import { Suspense, useEffect, useState } from 'react'

import LibraryAddModal from '@components/Library/LibraryModal/LibraryAddModal/LibraryAddModal'
import LibraryEditModal from '@components/Library/LibraryModal/LibraryEditModal/LibraryEditModal'
import {
  AddButton,
  CompletedSection,
  CompletedSectionContent,
  LibraryContainer,
  OngoingSection,
  OngoingSectionContent,
  OngoingSectionHeader,
  SearchContainer,
  SearchIcon,
  SearchInput,
  SectionTitle,
} from './Library.style'

import WorkbookItem from '@components/Library/WorkBook/WorkbookItem/WorkbookItem'
import LoadingSpinner from '@components/Loading/LoadingSpinner'
import workbookContentStore from '@stores/workbookContentStore'

export default function Library() {
  const workbooks = workbookContentStore((state) => state.workbooks)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false) // 추가 모달 상태
  const [isEditModalOpen, setIsEditModalOpen] = useState(false) // 편집 모달 상태
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
      (workbook) => workbook.name === ongoingWorkbooks[index].name,
    )
    setSelectedWorkbookIndex(actualIndex)
    setIsEditModalOpen(true)
  }

  const openAddModal = () => {
    setIsAddModalOpen(true)
  }

  const ongoingWorkbooks = workbooks.filter(
    (workbook) =>
      workbook.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) &&
      workbook.progress < 100,
  )

  const completedWorkbooks = workbooks.filter(
    (workbook) => workbook.progress === 100,
  )

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
            {ongoingWorkbooks.map((workbook, index) => (
              <WorkbookItem
                key={index}
                workbook={workbook}
                status="ongoing"
                onClick={() => openEditModal(index)}
              />
            ))}
          </OngoingSectionContent>
        </Suspense>
      </OngoingSection>

      {/* 오른쪽 완료한 교재 목록 */}
      <CompletedSection>
        <SectionTitle>완료한 교재</SectionTitle>
        <CompletedSectionContent>
          {completedWorkbooks.map((workbook, index) => (
            <WorkbookItem key={index} workbook={workbook} status="completed" />
          ))}
        </CompletedSectionContent>
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
