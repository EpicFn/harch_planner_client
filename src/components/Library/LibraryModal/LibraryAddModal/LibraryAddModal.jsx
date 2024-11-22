import fetchSubjects from '@apis/subject/fetchSubject'
import {
  CloseButton,
  ColorLabel,
  InputContainer,
  ModalButton,
  ModalButtonContainer,
  ModalContainer,
  ModalContent,
  ModalInput,
  ModalLayout,
  ModalPageInput,
  ModalPageInputBox,
  SelectedColorBox,
  SelectedColorCode,
  SubjectColorBox,
  SubjectItem,
  SubjectListContainer,
  SubjectName,
} from '@components/Library/LibraryModal/LibraryAddModal/LibraryAddModal.style'
import workbookContentStore from '@stores/workbookContentStore'
import { useEffect, useRef, useState } from 'react'

export default function LibraryAddModal({ onClose }) {
  const addWorkbook = workbookContentStore((state) => state.addWorkbook)

  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')
  const [goalPages, setGoalPages] = useState('')
  const [studiedPages, setStudiedPages] = useState('') // 공부한 페이지 수
  const [subjectColor, setSubjectColor] = useState('')
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

  const handleAddWorkbook = () => {
    if (!name || !subject || !goalPages || !studiedPages) {
      setIsShaking('true') // 진동 트리거
      setTimeout(() => setIsShaking('false'), 300)
      return
    }

    const progress = calculateProgress(studiedPages, goalPages) // 성취도 계산

    const newWorkbook = {
      id: Date.now(),
      name,
      subject,
      goalPages: parseInt(goalPages, 10),
      studiedPages: parseInt(studiedPages, 10),
      date: new Date().toISOString().split('T')[0],
      progress, // 계산된 성취도 추가
      subjectColor,
    }

    addWorkbook(newWorkbook)
    onClose()
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

  const handleSubjectClick = (subjectItem) => {
    setSubject(subjectItem.title)
    setSubjectColor(subjectItem.color)
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
              placeholder="문제집 이름을 입력하세요"
              ref={nameInputRef}
            />
            <SubjectListContainer>
              {subjectList.map((item) => (
                <SubjectItem
                  key={item.id}
                  onClick={() => handleSubjectClick(item)}
                  selected={subject === item.title}
                >
                  <SubjectColorBox color={item.color} />
                  <SubjectName>{item.title}</SubjectName>
                </SubjectItem>
              ))}
            </SubjectListContainer>
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
          </InputContainer>
        </ModalContent>
        <SelectedColorCode>
          <ColorLabel>과목 색상</ColorLabel>
          <SelectedColorBox color={subjectColor} />
        </SelectedColorCode>
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
