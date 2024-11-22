import addBook from '@apis/book/addBook'
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
} from '@components/Library/LibraryModal/LibraryAddModal/LibraryAddModal.style'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import workbookContentStore from '@stores/workbookContentStore'
import { useEffect, useRef, useState } from 'react'

export default function LibraryAddModal({ onClose }) {
  const addWorkbook = workbookContentStore((state) => state.addWorkbook)

  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')
  const [goalPages, setGoalPages] = useState('')
  const [studiedPages, setStudiedPages] = useState('') // 공부한 페이지 수
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
    if (!name || !subject || !goalPages || !studiedPages) {
      setIsShaking('true') // 진동 트리거
      setTimeout(() => setIsShaking('false'), 300)
      return
    }

    const progress = calculateProgress(studiedPages, goalPages) // 성취도 계산

    const newBook = {
      title: name,
      start_page: parseInt(studiedPages, 10),
      end_page: parseInt(goalPages, 10),
      memo,
      status: true, // 기본값으로 true 설정
      subject_id: subject.id, // subject는 id로 보냄
    }

    const stateData = {
      ...newBook,
      subject: subject.title, // UI 표시용 과목 이름
      subjectColor, // UI 표시용 과목 색상
      progress, // 성취도
    }

    try {
      await addBook(newBook)
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
    const startPage = parseInt(studied, 10)
    const endPage = parseInt(goal, 10)

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

  return (
    <ModalContainer>
      <ModalLayout shaking={shaking}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <ModalContent>
          <InputContainer>
            <ModalInput
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, nameInputRef)}
              placeholder="교재 이름을 입력하세요"
              ref={nameInputRef}
            />
            <FormControl fullWidth style={{ marginTop: '20px' }}>
              <InputLabel id="subject-select-label">과목 선택</InputLabel>
              <Select
                labelId="subject-select-label"
                value={subject?.title || ''}
                onChange={handleSubjectChange}
                displayEmpty
                style={{ backgroundColor: '#fff' }}
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
