import { debounce } from 'lodash'
import React, { Suspense, useEffect, useState } from 'react'

import LibraryAddModal from '@components/Library/LibraryModal/LibraryAddModal/LibraryAddModal'
import LibraryEditModal from '@components/Library/LibraryModal/LibraryEditModal/LibraryEditModal'
import {
  AddSubjectButton,
  CompletedSection,
  CompletedSectionContent,
  CompletedSectionHeader,
  CompletedSubject,
  LibraryContainer,
  OngoingSection,
  OngoingSectionContent,
  OngoingSectionHeader,
  OngoingSubject,
  SearchContainer,
  SearchIcon,
  SearchInput,
  SectionTitle,
  Sidebar,
  SubjectCircle,
  SubjectContainer,
  SubjectContent,
  SubjectHeader,
  SubjectName,
  SubjectTitle,
  SubjectTitleContainer,
  SubjectToggleIcon,
  WorkbookItemStyled,
} from './Library.style'

import fetchBooks from '@apis/book/fetchBook'
import WorkbookItem from '@components/Library/WorkBook/WorkBookItem/WorkBookItem'
import LoadingSpinner from '@components/Loading/LoadingSpinner'
import workbookContentStore from '@stores/workbookContentStore'

export default function Library() {
  const workbooks = workbookContentStore((state) => state.workbooks)
  const setWorkbooks = workbookContentStore((state) => state.setWorkbooks)

  const [isAddModalOpen, setIsAddModalOpen] = useState(false) // 추가 모달 상태
  const [isEditModalOpen, setIsEditModalOpen] = useState(false) // 편집 모달 상태
  const [selectedWorkbookIndex, setSelectedWorkbookIndex] = useState(null)
  const [searchTerm, setSearchTerm] = useState('') // 검색어 상태
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  const [expandedSubjects, setExpandedSubjects] = useState({})
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [viewCompleted, setViewCompleted] = useState(false)

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

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const fetchedBooks = await fetchBooks()
        const processedBooks = fetchedBooks.map((book) => ({
          ...book,
          subject: book.subject?.title || 'Unknown Subject',
          subjectColor: book.subject?.color || '#ccc',
          progress: calculateProgress(book.start_page, book.end_page),
        }))
        setWorkbooks(processedBooks)
      } catch (error) {
        console.error('Failed to load books:', error)
      }
    }

    loadBooks()
  }, [setWorkbooks]) // 초기 로딩 시만 실행

  const openEditModal = (index) => {
    // viewCompleted 상태에 따라 필터링된 교재 목록 가져오기
    const filteredBooks = workbooks.filter((book) =>
      viewCompleted ? book.progress === 100 : book.progress < 100,
    )

    // 현재 선택된 교재 ID를 기준으로 실제 workbooks 배열에서 인덱스 찾기
    const actualIndex = workbooks.findIndex(
      (workbook) => workbook.id === filteredBooks[index]?.id,
    )

    if (actualIndex !== -1) {
      setSelectedWorkbookIndex(actualIndex) // 선택된 교재의 인덱스 설정
      setIsEditModalOpen(true) // 모달 열기
    } else {
      console.error('Workbook not found in store') // 교재를 찾지 못한 경우 에러 출력
    }
  }

  const openAddModal = () => {
    setIsAddModalOpen(true)
  }

  const toggleSubject = (subject) => {
    setExpandedSubjects((prevState) => ({
      ...prevState,
      [subject]: !prevState[subject],
    }))
  }

  const selectSubject = (subject) => {
    setSelectedSubject(subject)
  }

  const calculateProgress = (startPage, endPage) => {
    if (!endPage || endPage <= 0) return 0 // 총 페이지가 0이거나 음수인 경우 진행률은 0%
    if (startPage >= endPage) return 100 // 시작 페이지가 총 페이지 이상인 경우 100%
    return Math.round((startPage / endPage) * 100) // 진행률 계산
  }

  return (
    <LibraryContainer>
      {/* 오른쪽 완료한 교재 목록 */}
      <Sidebar>
        <SearchContainer>
          <SearchIcon />
          <SearchInput
            placeholder="검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
        <CompletedSubject
          onClick={() => {
            setSelectedSubject(null)
            setViewCompleted(true)
          }}
        >
          ✔️ 완료한 교재
        </CompletedSubject>
        <OngoingSubject
          onClick={() => {
            setSelectedSubject(null) // 과목 선택 해제
            setViewCompleted(false)
          }}
        >
          ⏳ 학습 중인 교재
        </OngoingSubject>
        <SubjectContainer>
          <SubjectHeader>
            <SubjectTitle>교재 추가</SubjectTitle>
            <AddSubjectButton onClick={openAddModal} />
          </SubjectHeader>
          <SubjectContent>
            {Array.from(new Set(workbooks.map((wb) => wb.subject))).map(
              (subject) => {
                // 해당 과목의 첫 번째 워크북에서 색상을 가져옵니다.
                const subjectColor =
                  workbooks.find((wb) => wb.subject === subject)
                    ?.subjectColor || '#ccc'

                return (
                  <React.Fragment key={subject}>
                    <SubjectTitleContainer
                      onClick={() => selectSubject(subject)}
                    >
                      <SubjectCircle color={subjectColor} />
                      <SubjectName>{subject}</SubjectName>
                      <SubjectToggleIcon
                        isopen={String(expandedSubjects[subject])}
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleSubject(subject)
                        }}
                      >
                        ▸
                      </SubjectToggleIcon>
                    </SubjectTitleContainer>
                    {expandedSubjects[subject] &&
                      workbooks
                        .filter((wb) => wb.subject === subject)
                        .map((workbook, idx) => (
                          <WorkbookItemStyled key={`${subject}-${idx}`}>
                            {workbook.title}
                          </WorkbookItemStyled>
                        ))}
                  </React.Fragment>
                )
              },
            )}
          </SubjectContent>
        </SubjectContainer>
      </Sidebar>

      {viewCompleted ? (
        <CompletedSection>
          <CompletedSectionHeader>
            <SectionTitle>
              {selectedSubject ? `${selectedSubject}` : '완료한 교재'}
            </SectionTitle>
          </CompletedSectionHeader>
          <Suspense fallback={<LoadingSpinner />}>
            <CompletedSectionContent>
              {workbooks
                .filter((book) => book.progress === 100)
                .map((book, index) => (
                  <WorkbookItem
                    key={book.subject_id + book.title}
                    workbook={book}
                    status="completed"
                    onClick={() => openEditModal(index)}
                  />
                ))}
            </CompletedSectionContent>
          </Suspense>
        </CompletedSection>
      ) : (
        <OngoingSection>
          <OngoingSectionHeader>
            <SectionTitle>
              {selectedSubject ? `${selectedSubject}` : '학습 중인 교재'}
            </SectionTitle>
          </OngoingSectionHeader>
          <Suspense fallback={<LoadingSpinner />}>
            <OngoingSectionContent>
              {workbooks
                .filter((book) => book.progress < 100)
                .map((book, index) => (
                  <WorkbookItem
                    key={book.subject_id + book.title}
                    workbook={book}
                    status="ongoing"
                    onClick={() => openEditModal(index)}
                  />
                ))}
            </OngoingSectionContent>
          </Suspense>
        </OngoingSection>
      )}

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
