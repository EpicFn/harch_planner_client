import {
  CalendarContainer,
  CalendarIcon,
  Container,
  ContextMenu,
  ContextMenuItem,
  EventContent,
  GlobalStyle,
  HeaderContainer,
  MonthArrowButton,
  MonthGoalAddButton,
  MonthGoalDeleteButton,
  MonthGoalItem,
  MonthGoalList,
  MonthGoalTask,
  MonthGoalText,
  MonthMoveBox,
  MonthTitle,
  MoreLinkStyled,
  SidebarContainer,
  SidebarHeader,
  YearBox,
  YearTitle,
} from '@components/Calendar/Calendar.style'
import EventModal from '@components/Calendar/EventModal/EventModal'
import ExpendedModal from '@components/Calendar/ExpendedModal/ExpendedModal'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import useCalendarEvents from '@hooks/useCalendarEvents'
import useContextMenu from '@hooks/useContextMenu'
import { useEffect, useRef, useState } from 'react'

export default function Calendar() {
  const {
    events,
    addCalendarEvent,
    removeEvent,
    updateEvent,
    isFirstEventAdded,
    setIsFirstEventAdded,
  } = useCalendarEvents()
  const { contextMenu, openContextMenu, closeContextMenu } = useContextMenu()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isNotificationVisible, setIsNotificationVisible] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)

  const [isEditing, setIsEditing] = useState(false) // 수정 모드 여부
  const [editingEventId, setEditingEventId] = useState(null) // 수정할 이벤트의 ID
  const [newEventTitle, setNewEventTitle] = useState('') // 수정 중인 제목

  //월간목표 상태관리
  const [monthGoalList, setMonthGoalList] = useState([])
  const [editingGoal, setEditingGoal] = useState({ index: null, text: '' })

  const today = new Date()
  const [currentYear, setCurrentYear] = useState(null)
  const [currentMonth, setCurrentMonth] = useState(null)

  //캘린더 일자에 2개 넘어갈 경우 로직 상태
  const [isExpendeModalOpen, setIsExpendeModalOpen] = useState(false)
  const [selectedDateEvents, setSelectedDateEvents] = useState([])

  const calendarRef = useRef(null)
  const editableRef = useRef(null)
  const goalRefs = useRef([])

  const handlePrevClick = () => {
    const calendarApi = calendarRef.current.getApi()
    calendarApi.prev()
  }

  const handleNextClick = () => {
    const calendarApi = calendarRef.current.getApi()
    calendarApi.next()
  }

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
    if (isNotificationVisible) {
      setIsNotificationVisible(false)
    }
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setSelectedDate(null)
  }

  const handleAddEventSave = (title) => {
    if (title && selectedDate) {
      const eventId = Date.now().toString() // 고유한 ID 생성
      addCalendarEvent({ id: eventId, title, date: selectedDate }) // ID 포함하여 이벤트 추가
    }
    if (!isFirstEventAdded) {
      setIsFirstEventAdded(true) // 처음 추가된 이후로는 모달을 띄우지 않도록 상태 변경
      setIsNotificationVisible(true)
      setTimeout(() => {
        setIsNotificationVisible(false)
      }, 3000)
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
    closeContextMenu() // contextMenu 숨기기
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
    closeContextMenu()
  }

  //월간목표 추가
  const handleAddMonthGoal = () => {
    setMonthGoalList((prevGoals) => [...prevGoals, `목표를 입력해주세요`])
  }

  //월간목표 수정
  const handleEditMonthGoal = (index) => {
    const goalText = monthGoalList[index]
    setEditingGoal({ index, text: goalText })
    setTimeout(() => {
      if (goalRefs.current[index]) {
        goalRefs.current[index].focus() // 편집 모드에서 포커스 설정
      }
    }, 0)
  }

  const handleDeleteGoal = (e, index) => {
    e.stopPropagation()
    setMonthGoalList((prevGoals) => prevGoals.filter((_, i) => i !== index))
  }

  // 월간목표 저장
  const handleSaveGoal = (index) => {
    const currentRef = goalRefs.current[index]

    if (currentRef && currentRef.textContent) {
      console.log('Saving goal:', currentRef.textContent) // 디버깅을 위해 출력
      const updatedGoals = [...monthGoalList]
      updatedGoals[index] = currentRef.textContent // goalRefs에서 textContent 가져옴
      setMonthGoalList(updatedGoals)
      setEditingGoal({ index: null, text: '' }) // 편집 모드 종료
    }
  }

  // 월간목표 텍스트 변경
  const handleGoalTextChange = (index) => {
    if (goalRefs.current[index]) {
      setEditingGoal((prev) => ({
        ...prev,
        text: goalRefs.current[index].textContent, // ref에서 텍스트 가져오기
      }))
    }
  }

  useEffect(() => {
    const initialMonth = today.getMonth() + 1
    setCurrentMonth(initialMonth)
  }, [])

  useEffect(() => {
    goalRefs.current = Array(monthGoalList.length)
      .fill(null)
      .map((_, i) => goalRefs.current[i] || null)
  }, [monthGoalList])

  return (
    <>
      <GlobalStyle />
      <Container>
        <CalendarContainer>
          <SidebarContainer>
            <HeaderContainer>
              <SidebarHeader>
                <YearBox>
                  <YearTitle>{currentYear}</YearTitle>
                  <CalendarIcon src="/src/assets/calendar.png" />
                </YearBox>
                <MonthMoveBox>
                  <MonthTitle>{currentMonth + '월'}</MonthTitle>
                  <MonthArrowButton onClick={handlePrevClick}>
                    {'<'}
                  </MonthArrowButton>
                  <MonthArrowButton onClick={handleNextClick}>
                    {'>'}
                  </MonthArrowButton>
                </MonthMoveBox>
              </SidebarHeader>
              {isNotificationVisible && (
                <div
                  style={{
                    position: 'absolute',
                    right: '35px',
                    backgroundColor: '#f0f0f0',
                    padding: '10px 20px',
                    borderRadius: '4px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    zIndex: 1000,
                    opacity: isNotificationVisible ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out',
                  }}
                >
                  <span>수정, 삭제는 우 클릭을 통해 가능합니다</span>
                </div>
              )}
            </HeaderContainer>
            <MonthGoalList>
              월간목표
              <MonthGoalAddButton onClick={handleAddMonthGoal}>
                +
              </MonthGoalAddButton>
              <MonthGoalItem>
                {monthGoalList.map((goal, index) => (
                  <MonthGoalTask key={index}>
                    <MonthGoalText
                      contentEditable={editingGoal.index === index}
                      suppressContentEditableWarning={true}
                      ref={(el) => {
                        if (el) goalRefs.current[index] = el
                      }}
                      onInput={handleGoalTextChange}
                      onBlur={() =>
                        goalRefs.current[index] && handleSaveGoal(index)
                      } // 안전하게 null 체크
                      onClick={() => handleEditMonthGoal(index)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          goalRefs.current[index]?.blur() // null 체크 후 blur
                        }
                      }}
                    >
                      {editingGoal.index === index ? editingGoal.text : goal}
                    </MonthGoalText>
                    <MonthGoalDeleteButton
                      onClick={(e) => handleDeleteGoal(e, index)}
                    >
                      X
                    </MonthGoalDeleteButton>
                  </MonthGoalTask>
                ))}
              </MonthGoalItem>
            </MonthGoalList>
          </SidebarContainer>
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={events}
            locale="ko"
            headerToolbar={false}
            datesSet={handleMonthChange}
            dateClick={handleDateClick}
            dayMaxEvents={2}
            moreLinkContent={(arg) => {
              // 추가적인 이벤트 수를 표시
              return <MoreLinkStyled>+{arg.num}</MoreLinkStyled>
            }}
            moreLinkClassNames="custom-more-link"
            moreLinkClick={(arg) => {
              // 클릭 시 ExpendedModal 열기
              setSelectedDate(arg.date)
              setSelectedDateEvents(arg.allSegs.map((seg) => seg.event))
              setIsExpendeModalOpen(true)

              return false
            }}
            eventContent={(info) => {
              return (
                <EventContent
                  key={info.event.id} // FullCalendar가 제공하는 고유 이벤트 ID 사용
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
            eventOrder={'id'}
            eventDidMount={(info) => {
              info.el.addEventListener('contextmenu', (e) => {
                e.preventDefault()

                const mouseX = Math.min(e.pageX, window.innerWidth - 150)
                const mouseY = Math.min(e.pageY, window.innerHeight - 100)

                openContextMenu(mouseX, mouseY, info.event.id)
              })
            }}
            height="auto"
            contentHeight="auto"
          />
          {isExpendeModalOpen && (
            <ExpendedModal
              isOpen={isExpendeModalOpen}
              onClose={() => setIsExpendeModalOpen(false)}
              selectedDate={selectedDate}
              events={selectedDateEvents}
            />
          )}
        </CalendarContainer>

        <EventModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSave={handleAddEventSave}
        />

        {contextMenu.visible && (
          <ContextMenu
            style={{ top: `${contextMenu.y}px`, left: `${contextMenu.x}px` }}
          >
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
