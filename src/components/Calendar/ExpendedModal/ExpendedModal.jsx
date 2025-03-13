import {
  CloseButton,
  EventItem,
  EventWrapper,
  ModalContainer,
  ModalOverlay,
  Title,
} from './ExpendedModal.style'

export default function ExpendedModal({
  isOpen,
  onClose,
  events,
  selectedDate,
}) {
  if (!isOpen) return null

  const formattedDate = new Date(selectedDate).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <ModalOverlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>닫기</CloseButton>
        <Title>{formattedDate}</Title>
        <EventWrapper>
          {events.map((event, index) => (
            <EventItem key={event.id} index={index}>
              {event.title}
            </EventItem>
          ))}
        </EventWrapper>
      </ModalContainer>
    </ModalOverlay>
  )
}
