import ColorPalette from '@components/Calendar/ColorPallete/ColorPallete'
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
import { useEffect, useRef, useState } from 'react'

export default function EventModal({
  isOpen,
  onClose,
  onSave,
  selectedDate,
  onViewColor,
  onSelectColor,
  eventColor,
  showColorOption,
}) {
  const [title, setTitle] = useState('')
  const [memo, setMemo] = useState('')

  const ButtonRef = useRef(null)
  const [shaking, setIsShaking] = useState('false')

  const handleSave = () => {
    if (title.trim()) {
      onSave(title, memo)
      setTitle('')
      setMemo('')
      onSelectColor('#0307FF')
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

  useEffect(() => {
    setTitle('')
    setMemo('')
    onSelectColor('#0307FF')
  }, [isOpen])

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
          <Circle onClick={onViewColor} color={eventColor} />
          {showColorOption && <ColorPalette onSelectColor={onSelectColor} />}
        </ModalInputBox>

        <DateDisplay>{formatDateToKorean(selectedDate)}</DateDisplay>
        <TextMemo value={memo} onChange={(e) => setMemo(e.target.value)} />
        <ButtonWrapper>
          <SaveButton ref={ButtonRef} onClick={handleSave}>
            저장
          </SaveButton>
        </ButtonWrapper>
      </ModalContainer>
    </ModalBackground>
  )
}
