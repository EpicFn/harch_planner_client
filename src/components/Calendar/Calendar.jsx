import {
  CalendarContainer,
  Container,
  GlobalStyle,
  HeaderContainer,
  MonthLabel,
  MonthLabelBox,
  MonthTitle,
  SidebarContainer,
  WeekTaskAddButton,
  WeekTaskContainer,
  WeekTaskHeader,
  WeekTaskTitle,
} from '@components/Calendar/Calendar.style'
import EventModal from '@components/Calendar/EventModal'
import TaskItemComponent from '@components/Calendar/TaskItemComponent'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import calendarEventStore from '@stores/calendarEventStore'
import { useEffect, useState } from 'react'

export default function Calendar() {
  const { events, addEvent } = calendarEventStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)

  const [weekTasks, setWeekTasks] = useState({
    week1: [],
    week2: [],
    week3: [],
    week4: [],
    week5: [],
  })

  const weekTitles = {
    week1: '1주차',
    week2: '2주차',
    week3: '3주차',
    week4: '4주차',
    week5: '5주차',
  }

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

  const addWeekTask = (weekKey) => {
    setWeekTasks((prevTasks) => ({
      ...prevTasks,
      [weekKey]: [...prevTasks[weekKey], '주간목표 입력'],
    }))
  }

  const updateWeekTask = (weekKey, index, updatedTask) => {
    setWeekTasks((prevTasks) => {
      const updatedTasks = [...prevTasks[weekKey]]
      updatedTasks[index] = updatedTask
      return {
        ...prevTasks,
        [weekKey]: updatedTasks,
      }
    })
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
            {Object.keys(weekTasks).map((weekKey) => (
              <WeekTaskContainer key={weekKey}>
                <WeekTaskHeader>
                  <WeekTaskTitle>{weekTitles[weekKey]}</WeekTaskTitle>
                  <WeekTaskAddButton onClick={() => addWeekTask(weekKey)}>
                    +
                  </WeekTaskAddButton>
                </WeekTaskHeader>
                {weekTasks[weekKey].map((task, index) => (
                  <TaskItemComponent
                    key={index}
                    weekKey={weekKey}
                    task={task}
                    index={index}
                    updateWeekTask={updateWeekTask}
                  />
                ))}
              </WeekTaskContainer>
            ))}
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
