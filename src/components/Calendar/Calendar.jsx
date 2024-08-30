import {
  CalendarContainer,
  Container,
  GlobalStyle,
  HeaderContainer,
  MonthLabel,
  MonthLabelBox,
  MonthTitle,
  SidebarContainer,
  TaskItem,
  WeekTaskContainer,
  WeekTaskTitle,
} from '@components/Calendar/Calendar.style'
import EventModal from '@components/Calendar/EventModal'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import calendarEventStore from '@stores/calendarEventStore'
import { useEffect, useState } from 'react'

export default function Calendar() {
  const { events, addEvent } = calendarEventStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)

  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(null)

  const handleMonthChange = (arg) => {
    const newMonth = arg.view.currentStart.getMonth() + 1
    setCurrentMonth(newMonth)
  }

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr)
    setIsModalOpen(true)
  }
  console.log(isModalOpen)

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedDate(null)
  }

  const handleEventSave = (title) => {
    if (title && selectedDate) {
      addEvent({ title, date: selectedDate })
    }
    handleModalClose()
  }

  useEffect(() => {
    const initialMonth = today.getMonth() + 1
    setCurrentMonth(initialMonth)
  }, [])

  return (
    <>
      <GlobalStyle />
      <Container>
        <HeaderContainer>
          <MonthTitle>{currentMonth}</MonthTitle>
          <MonthLabelBox>
            <MonthLabel>월간목표</MonthLabel>
          </MonthLabelBox>
        </HeaderContainer>
        <CalendarContainer>
          <SidebarContainer>
            <WeekTaskContainer>
              <WeekTaskTitle>1주차</WeekTaskTitle>
              <TaskItem>수능특강 국어 3지문 끝내기</TaskItem>
            </WeekTaskContainer>
            <WeekTaskContainer>
              <WeekTaskTitle>2주차</WeekTaskTitle>
              <TaskItem>과탐 한권 끝내기</TaskItem>
              <TaskItem>모의고사 오답정리</TaskItem>
            </WeekTaskContainer>
            <WeekTaskContainer>
              <WeekTaskTitle>3주차</WeekTaskTitle>
              <TaskItem>수능형식 수학 시작</TaskItem>
            </WeekTaskContainer>
            <WeekTaskContainer>
              <WeekTaskTitle>4주차</WeekTaskTitle>
              <TaskItem>수능특강 국어 남은 지문 마무리</TaskItem>
              <TaskItem>수학학원 등록</TaskItem>
            </WeekTaskContainer>
            <WeekTaskContainer>
              <WeekTaskTitle>5주차</WeekTaskTitle>
              <TaskItem>입시설명회</TaskItem>
              <TaskItem>캠퍼스 투어 다녀오기</TaskItem>
            </WeekTaskContainer>
          </SidebarContainer>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            locale="ko"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: '',
            }}
            buttonText={{
              today: '오늘',
            }}
            datesSet={handleMonthChange}
            dateClick={handleDateClick}
            height="auto"
            contentHeight="auto"
          />
        </CalendarContainer>

        <EventModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSave={handleEventSave}
        />
      </Container>
    </>
  )
}
