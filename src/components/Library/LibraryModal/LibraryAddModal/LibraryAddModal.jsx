import addBook from '@apis/book/addBook'
import addSubject from '@apis/subject/addSubject'
import fetchSubjects from '@apis/subject/fetchSubject'
import {
  CloseButton,
  InputContainer,
  ModalButton,
  ModalButtonContainer,
  ModalContainer,
  ModalContent,
  ModalInput,
  ModalLayout,
  ModalPageInput,
  ModalPageInputBox,
  SubjectAddButton,
  SubjectBox,
  SubjectInputWrapper,
} from '@components/Library/LibraryModal/LibraryAddModal/LibraryAddModal.style'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import workbookContentStore from '@stores/workbookContentStore'
import { useEffect, useRef, useState } from 'react'

export default function LibraryAddModal({ onClose }) {
  const addWorkbook = workbookContentStore((state) => state.addWorkbook)

  const [bookName, setBookName] = useState('')
  const [subject, setSubject] = useState('')
  const [goalPages, setGoalPages] = useState('')
  const [studiedPages, setStudiedPages] = useState('') // 공부한 페이지 수

  const [showSubjectInput, setShowSubjectInput] = useState(false)
  const [addedSubject, setAddedSubject] = useState('')
  const [subjectColor, setSubjectColor] = useState('')
  const [memo, setMemo] = useState('')
  const [subjectList, setSubjectList] = useState([])

  const [shaking, setIsShaking] = useState('false')

  const nameInputRef = useRef(null)
  const goalPagesRef = useRef(null)
  const studiedPagesRef = useRef(null)

  //과목 색상 리스트 반환 API
  useEffect(() => {
    const loadSubjects = async () => {
      try {
        const data = await fetchSubjects()
        setSubjectList(data)
      } catch (error) {
        console.error('Failed to load subjects:', error)
      }
    }

    loadSubjects()
  }, [])

  const handleAddWorkbook = async () => {
    if (!bookName || !subject || !goalPages || !studiedPages) {
      setIsShaking('true') // 진동 트리거
      setTimeout(() => setIsShaking('false'), 300)
      return
    }

    const progress = calculateProgress(studiedPages, goalPages) // 성취도 계산

    const newBook = {
      title: bookName,
      start_page: parseInt(studiedPages, 10),
      end_page: parseInt(goalPages, 10),
      memo,
      status: true, // 기본값으로 true 설정
      subject_id: subject.id,
    }

    try {
      const response = await addBook(newBook) // 서버로 데이터 전송 후 응답 받기
      const savedBook = response
      const stateData = {
        ...savedBook,
        subject: subject.title,
        subject_id: subject.id,
        subjectColor,
        progress,
      }
      console.log(stateData)
      addWorkbook(stateData)
      onClose()
    } catch (error) {
      console.error('Failed to add book:', error)
    }
  }

  const handleKeyDown = (e, ref) => {
    if (e.key === 'Enter') {
      ref.current.blur()
    }
  }

  const calculateProgress = (studied, goal) => {
    const startPage = parseInt(studied || 0, 10)
    const endPage = parseInt(goal || 0, 10)

    if (startPage > endPage) {
      return 0
    }

    return endPage > 0 ? Math.round((startPage / endPage) * 100) : 0
  }

  const handleSubjectChange = (event) => {
    const selectedSubject = subjectList.find(
      (item) => item.title === event.target.value,
    )
    setSubject({
      id: selectedSubject.id,
      title: selectedSubject.title,
    })
    setSubjectColor(selectedSubject.color)
  }

  // 과목 추가
  const handleAddSubject = async () => {
    if (!addedSubject.trim()) return
    try {
      const addedSubjectData = await addSubject(addedSubject) // 분리된 API 호출 함수 사용
      console.log('Subject added successfully:', addedSubjectData)

      setAddedSubject('')
      setShowSubjectInput(false)

      // 새로 추가된 과목 포함한 목록 다시 불러오기
      const data = await fetchSubjects()
      setSubjectList(data)
    } catch (error) {
      console.error('Error adding subject:', error)
    }
  }

  // 엔터 키 입력 처리
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddSubject()
    }
  }

  return (
    <ModalContainer>
      <ModalLayout shaking={shaking}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <ModalContent>
          <InputContainer>
            <ModalInput
              type="text"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, nameInputRef)}
              placeholder="교재 이름을 입력하세요"
              ref={nameInputRef}
            />
            <SubjectBox>
              <FormControl fullWidth>
                <InputLabel id="subject-select-label">과목 선택</InputLabel>
                <Select
                  labelId="subject-select-label"
                  value={subject?.title || ''}
                  onChange={handleSubjectChange}
                  displayEmpty
                  style={{
                    backgroundColor: '#fff',
                    width: '90%',
                  }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200, // 드롭다운 최대 높이 (픽셀)
                        overflow: 'auto',
                        scrollbarWidth: 'thin',
                      },
                    },
                    sx: {
                      '&::-webkit-scrollbar': {
                        width: '12px',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        background: 'linear-gradient(180deg, #c4c4c4, #8e8e8e)',
                        borderRadius: '10px',
                        border: '2px solid transparent',
                        backgroundClip: 'content-box',
                      },
                      '&::-webkit-scrollbar-thumb:hover': {
                        background: 'linear-gradient(180deg, #b0b0b0, #7a7a7a)',
                      },
                      '&::-webkit-scrollbar-track': {
                        backgroundColor: '#e0e0e0',
                        borderRadius: '10px',
                      },
                    },
                  }}
                >
                  {subjectList.map((item) => (
                    <MenuItem key={item.id} value={item.title}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            backgroundColor: item.color,
                            marginRight: '8px',
                          }}
                        ></div>
                        {item.title}
                      </div>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <SubjectAddButton
                onClick={() => setShowSubjectInput((prev) => !prev)}
              >
                과목 추가
              </SubjectAddButton>
              {showSubjectInput && (
                <SubjectInputWrapper style={{ marginTop: '10px' }}>
                  <input
                    type="text"
                    value={addedSubject}
                    onChange={(e) => setAddedSubject(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="새 과목 입력"
                    style={{
                      width: '90%',
                      padding: '15px 8px',
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                    }}
                  />
                </SubjectInputWrapper>
              )}
            </SubjectBox>
            <ModalPageInputBox>
              <ModalPageInput
                type="number"
                value={studiedPages}
                onChange={(e) => setStudiedPages(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, studiedPagesRef)}
                placeholder="시작 페이지"
                ref={studiedPagesRef}
              />
              <ModalPageInput
                type="number"
                value={goalPages}
                onChange={(e) => setGoalPages(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, goalPagesRef)}
                placeholder="마지막 페이지"
                ref={goalPagesRef}
              />
            </ModalPageInputBox>
            <ModalInput
              type="text"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="메모를 입력하세요"
            />
          </InputContainer>
        </ModalContent>

        <ModalButtonContainer>
          <ModalButton onClick={handleAddWorkbook}>추가 완료</ModalButton>
          <ModalButton onClick={onClose} style={{ backgroundColor: 'red' }}>
            취소
          </ModalButton>
        </ModalButtonContainer>
      </ModalLayout>
    </ModalContainer>
  )
}
