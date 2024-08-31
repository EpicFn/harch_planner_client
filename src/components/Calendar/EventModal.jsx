import {
  Button,
  ButtonWrapper,
  ErrorMessage,
  Input,
  ModalBackground,
  ModalContainer,
} from '@components/Calendar/EventModal.style'
import { useEffect, useRef, useState } from 'react'

export default function EventModal({ isOpen, onClose, onSave }) {
  const [title, setTitle] = useState('')
  const [erroeMessage, setErrorMessage] = useState('')
  const ButtonRef = useRef(null)

  const handleSave = () => {
    if (title.trim()) {
      onSave(title)
      setTitle('')
      onClose()
    } else {
      setErrorMessage('일정을 입력하세요')
      console.log('Title is empty')
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

  useEffect(() => {
    setErrorMessage('')
  }, [isOpen])

  if (!isOpen) return null

  return (
    <ModalBackground onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <h2>일정 추가</h2>
        <Input
          type="text"
          placeholder="일정 제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleKeyDown} // 키 입력을 감지하는 핸들러 추가
        />
        {erroeMessage && <ErrorMessage>{erroeMessage}</ErrorMessage>}
        <ButtonWrapper>
          <Button ref={ButtonRef} onClick={handleSave}>
            저장
          </Button>
        </ButtonWrapper>
      </ModalContainer>
    </ModalBackground>
  )
}
