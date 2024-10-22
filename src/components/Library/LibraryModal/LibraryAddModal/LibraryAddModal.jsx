import {
  CloseButton,
  InputContainer,
  Line,
  ModalButton,
  ModalButtonContainer,
  ModalContainer,
  ModalContent,
  ModalInput,
  ModalLayout,
} from '@components/Library/LibraryModal/LibraryAddModal/LibraryAddModal.style'
import workBookContentStore from '@stores/workBookContentStore'
import { useRef, useState } from 'react'

export default function LibraryAddModal({ onClose }) {
  const addWorkbook = workBookContentStore((state) => state.addWorkbook)

  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')
  const [goalPages, setGoalPages] = useState('')
  const nameInputRef = useRef(null)
  const subjectInputRef = useRef(null)
  const goalPagesRef = useRef(null)

  const handleAddWorkbook = () => {
    const newWorkbook = {
      id: Date.now(),
      name,
      subject,
      goalPages: parseInt(goalPages, 10),
      date: new Date().toISOString().split('T')[0],
      progress: 0, // 초기 성취도는 0
    }

    addWorkbook(newWorkbook)
    onClose()
  }

  const handleKeyDown = (e, ref) => {
    if (e.key === 'Enter') {
      ref.current.blur()
    }
  }

  return (
    <ModalContainer>
      <ModalLayout>
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
            <ModalInput
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, subjectInputRef)}
              placeholder="과목 이름을 입력하세요"
              ref={subjectInputRef}
            />
            <ModalInput
              type="number"
              value={goalPages}
              onChange={(e) => setGoalPages(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, goalPagesRef)}
              placeholder="목표 페이지 수를 입력하세요"
              ref={goalPagesRef}
            />
          </InputContainer>
        </ModalContent>
        <Line />
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
