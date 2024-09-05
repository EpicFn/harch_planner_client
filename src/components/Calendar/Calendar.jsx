import {
  CalendarContainer,
  Container,
  ContextMenu,
  ContextMenuItem,
  GlobalStyle,
  HeaderContainer,
  MonthTitle,
  SidebarContainer,
  WeekTaskAddButton,
  WeekTaskContainer,
  WeekTaskHeader,
  WeekTaskTitle,
  YearTitle,
} from '@components/Calendar/Calendar.style'
import EventModal from '@components/Calendar/EventModal'
import TaskItemComponent from '@components/Calendar/TaskItemComponent'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import calendarEventStore from '@stores/calendarEventStore'
import { useEffect, useRef, useState } from 'react'

export default function Calendar() {
  const { events, addEvent, removeEvent } = calendarEventStore()
  console.log(events)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    eventId: null,
  })

  const calendarRef = useRef(null)

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
  const [currentYear, setCurrentYear] = useState(null)
  const [currentMonth, setCurrentMonth] = useState(null)

  const handleYearChange = (newYear) => {
    setCurrentYear(newYear)
  }

  const handleMonthChange = (arg) => {
    const newMonth = arg.view.currentStart.getMonth() + 1
    const newYear = arg.view.currentStart.getFullYear()

    setCurrentMonth(newMonth)
    if (newYear !== currentYear) {
      handleYearChange(newYear) // 년도가 변경될 경우 handleYearChange 호출
    }
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
      const eventId = Date.now().toString() // 고유한 ID 생성
      addEvent({ id: eventId, title, date: selectedDate }) // ID 포함하여 이벤트 추가
    }
    handleModalClose()
  }

  const handleDeleteEvent = () => {
    if (contextMenu.eventId) {
      removeEvent(contextMenu.eventId)
    }
    setContextMenu({ visible: false, x: 0, y: 0, eventId: null })
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
    const handleClickOutside = (e) => {
      if (contextMenu.visible) {
        setContextMenu({ visible: false, x: 0, y: 0, eventId: null })
      }
    }

    window.addEventListener('click', handleClickOutside)

    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  }, [contextMenu.visible])

  useEffect(() => {
    const initialMonth = today.getMonth() + 1
    setCurrentMonth(initialMonth)
  }, [])

  return (
    <>
      <GlobalStyle />
      <Container>
        <HeaderContainer>
          <YearTitle>{currentYear + '년'}</YearTitle>
          <MonthTitle>{currentMonth + '월'}</MonthTitle>
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
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            locale="ko"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: '',
            }}
            datesSet={handleMonthChange}
            dateClick={handleDateClick}
            eventDidMount={(info) => {
              info.el.addEventListener('contextmenu', (e) => {
                e.preventDefault()

                const rect = info.el.getBoundingClientRect() // 우클릭한 이벤트 요소의 위치를 기준으로 좌표 설정

                setContextMenu({
                  visible: true,
                  x: rect.right - 30,
                  y: rect.bottom - 20,
                  eventId: info.event.id,
                })
              })
            }}
            height="auto"
            contentHeight="auto"
          />
        </CalendarContainer>

        <EventModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSave={handleEventSave}
        />

        {contextMenu.visible && (
          <ContextMenu style={{ top: contextMenu.y, left: contextMenu.x }}>
            <ContextMenuItem onClick={handleDeleteEvent}>수정</ContextMenuItem>
            <ContextMenuItem onClick={handleDeleteEvent}>삭제</ContextMenuItem>
          </ContextMenu>
        )}
      </Container>
    </>
  )
}
