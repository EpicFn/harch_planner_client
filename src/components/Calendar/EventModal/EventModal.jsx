import {
  ButtonWrapper,
  Circle,
  DateDisplay,
  Input,
  ModalBackground,
  ModalContainer,
  ModalInputBox,
  SaveButton,
  TextMemo,
} from '@components/Calendar/EventModal/EventModal.style'
import { formatDateToKorean } from '@utils/formatDateToKorean'
import { useRef, useState } from 'react'

export default function EventModal({ isOpen, onClose, onSave, selectedDate }) {
  const [title, setTitle] = useState('')
  const [memo, setMemo] = useState('')
  const ButtonRef = useRef(null)
  const [shaking, setIsShaking] = useState('false')

  const handleSave = () => {
    if (title.trim()) {
      onSave(title)
      setTitle('')
      onClose()
    } else {
      setIsShaking('true')
      setTimeout(() => setIsShaking('false'), 400)
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (ButtonRef.current) {
        ButtonRef.current.click()
      }
    }
  }

  if (!isOpen) return null

  return (
    <ModalBackground onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()} shaking={shaking}>
        <ModalInputBox>
          <Input
            type="text"
            placeholder="일정 추가"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown} // 키 입력을 감지하는 핸들러 추가
          />
          <Circle />
        </ModalInputBox>

        <DateDisplay>{formatDateToKorean(selectedDate)}</DateDisplay>
        <TextMemo value={memo} readOnly />
        <ButtonWrapper>
          <SaveButton ref={ButtonRef} onClick={handleSave}>
            저장
          </SaveButton>
        </ButtonWrapper>
      </ModalContainer>
    </ModalBackground>
  )
}
