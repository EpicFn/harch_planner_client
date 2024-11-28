import { debounce } from 'lodash'
import React, { Suspense, useEffect, useState } from 'react'

import fetchBookBySubject from '@apis/book/fetchBookBySubject'
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
  SubjectSection,
  SubjectSectionContent,
  SubjectSectionHeader,
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
  const [selectedWorkbook, setSelectedWorkbook] = useState(null)
  const [selectedSubjectId, setSelectedSubjectId] = useState(null)

  //검색 관련 상태 값들
  const [searchTerm, setSearchTerm] = useState('') // 검색어 상태
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [filteredWorkbooks, setFilteredWorkbooks] = useState([])

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
    if (debouncedSearchTerm.trim() === '') {
      setFilteredWorkbooks([]) // 검색어가 없으면 필터링된 문제집 초기화
      return
    }

    const results = workbooks.filter((book) =>
      book.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
    )
    setFilteredWorkbooks(results)
  }, [debouncedSearchTerm, workbooks])

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
          subject: book.subject?.title || '미 분류',
          subject_id: book.subject?.id,
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

  const openEditModal = (book) => {
    setSelectedWorkbook(book) // 선택된 workbook 저장
    setIsEditModalOpen(true)
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

  const selectSubject = async (subject, subjectId) => {
    setSelectedSubject(subject) // 과목 이름 저장
    setSelectedSubjectId(subjectId) // 과목 ID 저장
    setViewCompleted(null) // 완료 상태 초기화

    try {
      const response = await fetchBookBySubject(subjectId) // subject_id를 이용한 API 호출
      console.log(response)
      const books = response.books // 응답에서 books 배열 추출

      const processedBooks = books.map((book) => ({
        ...book,
        subject: subject, // 상위 subject 값을 재활용
        subjectColor: response.subject.color || '#ccc', // 상위 subject의 color
        progress: calculateProgress(book.start_page, book.end_page),
      }))

      setFilteredWorkbooks(processedBooks) // 선택된 과목의 교재 저장
    } catch (error) {
      console.error(`Failed to fetch books for subject ID ${subjectId}:`, error)
    }
  }

  const calculateProgress = (startPage, endPage) => {
    if (!endPage || endPage <= 0) return 0 // 총 페이지가 0이거나 음수인 경우 진행률은 0%
    if (startPage >= endPage) return 100 // 시작 페이지가 총 페이지 이상인 경우 100%
    return Math.round((startPage / endPage) * 100) // 진행률 계산
  }

  const booksToRender = workbooks.filter((book) => {
    // 선택된 과목이 있으면 해당 과목의 책만 포함
    if (selectedSubject && book.subject !== selectedSubject) {
      return false
    }
    // 검색어가 있으면 제목에 검색어가 포함된 책만 포함
    if (
      debouncedSearchTerm.trim() !== '' &&
      !book.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    ) {
      return false
    }
    return true
  })

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
            {Array.from(
              new Map(
                workbooks.map((wb) => [
                  wb.subject, // Key로 subject 이름 사용
                  { subject: wb.subject, subjectId: wb.subject_id }, // Value로 subject와 subject_id 저장
                ]),
              ).values(),
            ).map(({ subject, subjectId }) => {
              const subjectColor =
                workbooks.find((wb) => wb.subject === subject)?.subjectColor ||
                '#ccc'

              return (
                <React.Fragment key={subject}>
                  <SubjectTitleContainer
                    onClick={() => selectSubject(subject, subjectId)}
                  >
                    <SubjectCircle color={subjectColor} />
                    <SubjectName>
                      {subject === 'Unknown Subject' ? '미 분류' : subject}
                    </SubjectName>
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
            })}
          </SubjectContent>
        </SubjectContainer>
      </Sidebar>

      {selectedSubject ? (
        // 과목이 선택된 경우: OngoingSection과 같은 구조로 렌더링
        <SubjectSection>
          <SubjectSectionHeader>
            <SectionTitle>{selectedSubject}</SectionTitle>
          </SubjectSectionHeader>
          <Suspense fallback={<LoadingSpinner />}>
            <SubjectSectionContent>
              {booksToRender.map((book) => (
                <WorkbookItem
                  key={book.id}
                  workbook={book}
                  onClick={() => openEditModal(book)}
                />
              ))}
            </SubjectSectionContent>
          </Suspense>
        </SubjectSection>
      ) : viewCompleted ? (
        // 과목이 선택되지 않고, 완료한 교재를 보는 경우
        <CompletedSection>
          <CompletedSectionHeader>
            <SectionTitle>완료한 교재</SectionTitle>
          </CompletedSectionHeader>
          <Suspense fallback={<LoadingSpinner />}>
            <CompletedSectionContent>
              {booksToRender
                .filter((book) => book.progress === 100)
                .map((book) => (
                  <WorkbookItem
                    key={book.id}
                    workbook={book}
                    status="completed"
                    onClick={() => openEditModal(book)}
                  />
                ))}
            </CompletedSectionContent>
          </Suspense>
        </CompletedSection>
      ) : (
        // 과목이 선택되지 않고, 학습 중인 교재를 보는 경우
        <OngoingSection>
          <OngoingSectionHeader>
            <SectionTitle>학습 중인 교재</SectionTitle>
          </OngoingSectionHeader>
          <Suspense fallback={<LoadingSpinner />}>
            <OngoingSectionContent>
              {booksToRender
                .filter((book) => book.progress < 100)
                .map((book) => (
                  <WorkbookItem
                    key={book.id}
                    workbook={book}
                    status="ongoing"
                    onClick={() => openEditModal(book)}
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

      {isEditModalOpen && selectedWorkbook && (
        <LibraryEditModal
          workbook={selectedWorkbook}
          onClose={() => {
            setIsEditModalOpen(false)
            setSelectedWorkbook(null) // 모달 닫을 때 초기화
          }}
        />
      )}
    </LibraryContainer>
  )
}
