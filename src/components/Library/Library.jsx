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

  const openEditModal = (index) => {
    const actualIndex = workbooks.findIndex(
      (workbook) => workbook.name === displayedWorkbooks[index].name,
    )
    setSelectedWorkbookIndex(actualIndex)
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

  const filteredWorkbooks = workbooks.filter((workbook) =>
    workbook.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
  )

  const displayedWorkbooks = filteredWorkbooks.filter((workbook) => {
    if (selectedSubject) {
      return workbook.subject === selectedSubject
    }

    return viewCompleted ? workbook.progress === 100 : workbook.progress < 100
  })

  const subjectColors = {
    국어: '#9b51e0',
    사회탐구: '#ff6b6b',
    수학: '#76A6FF',
    과학탐구: '#00b894',
    영어: '#ff9f43',
    한국사: '#fd79a8',
    제2외국어: '#00cec9',
  }

  const selectSubject = (subject) => {
    setSelectedSubject(subject)
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
              (subject) => (
                <React.Fragment key={subject}>
                  <SubjectTitleContainer onClick={() => selectSubject(subject)}>
                    <SubjectCircle color={subjectColors[subject]} />
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
                          {workbook.name}
                        </WorkbookItemStyled>
                      ))}
                </React.Fragment>
              ),
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
              {displayedWorkbooks.map((workbook, index) => (
                <WorkbookItem
                  key={index}
                  workbook={workbook}
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
              {displayedWorkbooks.map((workbook, index) => (
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
