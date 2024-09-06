import {
  CalendarContainer,
  Container,
  ContextMenu,
  ContextMenuItem,
  EventContent,
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
  const { events, addEvent, removeEvent, updateEvent } = calendarEventStore()
  console.log(events)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    eventId: null,
  })
  const [isEditing, setIsEditing] = useState(false) // 수정 모드 여부
  const [editingEventId, setEditingEventId] = useState(null) // 수정할 이벤트의 ID
  const [newEventTitle, setNewEventTitle] = useState('') // 수정 중인 제목

  const calendarRef = useRef(null)
  const editableRef = useRef(null)

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

  const handleAddEventSave = (title) => {
    if (title && selectedDate) {
      const eventId = Date.now().toString() // 고유한 ID 생성
      addEvent({ id: eventId, title, date: selectedDate }) // ID 포함하여 이벤트 추가
    }
    handleModalClose()
  }

  //수정 시 커서 맨끝으로 이동
  const moveCursorToEnd = (element) => {
    const range = document.createRange() // 새로운 range 생성
    const selection = window.getSelection() // 현재 선택 영역 가져오기
    range.selectNodeContents(element) // contentEditable의 모든 내용을 선택
    range.collapse(false) // collapse를 false로 설정하여 범위를 텍스트 끝으로 설정
    selection.removeAllRanges() // 현재 선택 영역을 모두 제거
    selection.addRange(range) // 새로 생성한 range를 추가하여 커서를 끝으로 이동
  }

  //캘린더 일정 수정
  const handleUpdateEvent = (eventId) => {
    setIsEditing(true) // 수정 모드로 전환
    setEditingEventId(eventId) // 수정할 이벤트 ID 저장
    const eventToUpdate = events.find((event) => event.id === eventId)
    setNewEventTitle(eventToUpdate.title) // 수정할 이벤트의 제목 저장
    setContextMenu({ visible: false, x: 0, y: 0, eventId: null }) // contextMenu 숨기기
    setTimeout(() => {
      if (editableRef.current) {
        moveCursorToEnd(editableRef.current) // 커서를 텍스트 끝으로 이동
        editableRef.current.focus() // 포커스 설정
      }
    }, 0)
  }

  //수정되는거 저장
  const handleSaveEditedEvent = (eventId) => {
    const updatedEvent = {
      id: eventId,
      title: newEventTitle,
      date: events.find((event) => event.id === eventId).date,
    }
    updateEvent(updatedEvent) // 수정된 이벤트 저장
    setIsEditing(false) // 수정 모드 종료
    setEditingEventId(null)
  }

  ////캘린더 일정 삭제
  const handleDeleteEvent = () => {
    if (contextMenu.eventId) {
      removeEvent(contextMenu.eventId)
    }
    setContextMenu({ visible: false, x: 0, y: 0, eventId: null })
  }

  //왼쪽 주차 목표 추가/수정
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
            eventContent={(info) => {
              return (
                <EventContent
                  contentEditable={
                    isEditing && editingEventId === info.event.id
                  }
                  ref={
                    isEditing && editingEventId === info.event.id
                      ? editableRef
                      : null
                  }
                  suppressContentEditableWarning={true}
                  onInput={(e) => setNewEventTitle(e.currentTarget.textContent)}
                  onBlur={() => handleSaveEditedEvent(info.event.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      e.currentTarget.blur()
                    }
                  }}
                >
                  {info.event.title}
                </EventContent>
              )
            }}
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
          onSave={handleAddEventSave}
        />

        {contextMenu.visible && (
          <ContextMenu style={{ top: contextMenu.y, left: contextMenu.x }}>
            <ContextMenuItem
              onClick={() => handleUpdateEvent(contextMenu.eventId)}
            >
              수정
            </ContextMenuItem>
            <ContextMenuItem onClick={handleDeleteEvent}>삭제</ContextMenuItem>
          </ContextMenu>
        )}
      </Container>
    </>
  )
}
