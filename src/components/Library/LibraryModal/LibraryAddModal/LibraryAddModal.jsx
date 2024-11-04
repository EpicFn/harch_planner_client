import {
  CloseButton,
  ColorLabel,
  ColorPickerContainer,
  ColorPickerLabel,
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
} from '@components/Library/LibraryModal/LibraryAddModal/LibraryAddModal.style'
import workbookContentStore from '@stores/workbookContentStore'
import { useRef, useState } from 'react'
import { HexColorPicker } from 'react-colorful'

export default function LibraryAddModal({ onClose }) {
  const addWorkbook = workbookContentStore((state) => state.addWorkbook)

  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')
  const [goalPages, setGoalPages] = useState('')
  const [studiedPages, setStudiedPages] = useState('') // 공부한 페이지 수
  const [subjectColor, setSubjectColor] = useState('')
  const [shaking, setIsShaking] = useState('false')

  const nameInputRef = useRef(null)
  const subjectInputRef = useRef(null)
  const goalPagesRef = useRef(null)
  const studiedPagesRef = useRef(null)

  const handleAddWorkbook = () => {
    if (!name || !subject || !goalPages || !studiedPages) {
      setIsShaking('true') // 진동 트리거
      setTimeout(() => setIsShaking('false'), 300) // 애니메이션 후 상태 리셋
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
    return goal > 0 ? Math.round((studied / goal) * 100) : 0
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
            <ModalInput
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, subjectInputRef)}
              placeholder="과목 이름을 입력하세요"
              ref={subjectInputRef}
            />
            <ModalPageInputBox>
              <ModalPageInput
                type="number"
                value={studiedPages}
                onChange={(e) => setStudiedPages(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, studiedPagesRef)}
                placeholder="진행한 페이지"
                ref={studiedPagesRef}
              />
              <ModalPageInput
                type="number"
                value={goalPages}
                onChange={(e) => setGoalPages(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, goalPagesRef)}
                placeholder="목표 페이지"
                ref={goalPagesRef}
              />
            </ModalPageInputBox>
          </InputContainer>
        </ModalContent>
        <SelectedColorCode>
          <ColorLabel>과목 색상</ColorLabel>
          <SelectedColorBox color={subjectColor} />
        </SelectedColorCode>
        <ColorPickerContainer>
          <HexColorPicker
            color={subjectColor ? subjectColor : '색상을 선택하세요'}
            onChange={(newColor) => {
              if (/^#[0-9A-F]{6}$/i.test(newColor)) {
                setSubjectColor(newColor)
              }
            }}
          />
          <ColorPickerLabel>과목 색상을 {'\n'} 선택하세요.</ColorPickerLabel>
        </ColorPickerContainer>
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
