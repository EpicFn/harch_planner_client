import {
  Button,
  ButtonWrapper,
  Input,
  ModalBackground,
  ModalContainer,
} from '@components/Calendar/EventModal/EventModal.style'
import { useRef, useState } from 'react'

export default function EventModal({ isOpen, onClose, onSave }) {
  const [title, setTitle] = useState('')
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
        <h2>일정 추가</h2>
        <Input
          type="text"
          placeholder="일정 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown} // 키 입력을 감지하는 핸들러 추가
        />
        <ButtonWrapper>
          <Button ref={ButtonRef} onClick={handleSave}>
            저장
          </Button>
        </ButtonWrapper>
      </ModalContainer>
    </ModalBackground>
  )
}
