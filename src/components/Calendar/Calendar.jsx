import calendarAddEvent from '@apis/calendar/calendarAddEvent'
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
import useCalendarFetchEvents from '@hooks/useCalendarFetchEvents'
import useContextMenu from '@hooks/useContextMenu'
import calendarEventStore from '@stores/calendarEventStore'
import { useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useEffect, useRef, useState } from 'react'

export default function Calendar() {
  const queryClient = useQueryClient()
  const today = new Date()
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1)

  const {
    events,
    addCalendarEvent,
    removeEvent,
    updateEvent,
    isFirstEventAdded,
    setIsFirstEventAdded,
  } = useCalendarEvents()

  const { contextMenu, openContextMenu, closeContextMenu } = useContextMenu()
  const { calendarData, isLoading, isError, error } = useCalendarFetchEvents(
    currentYear,
    currentMonth,
  )

  const addEvent = calendarEventStore((state) => state.addEvent)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isNotificationVisible, setIsNotificationVisible] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)

  const [isEditing, setIsEditing] = useState(false) // 수정 모드 여부
  const [editingEventId, setEditingEventId] = useState(null) // 수정할 이벤트의 ID
  const [newEventTitle, setNewEventTitle] = useState('') // 수정 중인 제목

  console.log(events)

  //월간목표 상태관리
  const [monthGoalList, setMonthGoalList] = useState([])
  const [editingGoal, setEditingGoal] = useState({ index: null, text: '' })

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

  const handleAddEventSave = async (title, memo) => {
    if (title && selectedDate) {
      try {
        // 기존 날짜의 이벤트 가져오기
        const existingEvents = events.filter(
          (event) => event.date === selectedDate,
        )

        const updatedTaskList = [
          ...existingEvents.map((event) => ({
            title: event.title,
            memo: event.extendedProps.memo,
          })),
          {
            title,
            memo,
          },
        ]

        const event = {
          date: selectedDate,
          task_list: updatedTaskList,
        }

        // API 호출
        await calendarAddEvent(event)

        // React Query 데이터 갱신
      } catch (error) {
        console.error('Error adding event:', error)
      } finally {
        queryClient.invalidateQueries([
          'calendarEvents',
          currentYear,
          currentMonth,
        ])
      }
    }
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

  //캘린더 일정 수정 로직
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

  //수정 후 엔터 누르면 함수 발동
  const handleSaveEditedEvent = async (eventId) => {
    const targetEvent = events.find((event) => event.id === eventId)

    const formattedDate = format(new Date(targetEvent.date), 'yyyy-MM-dd')

    const cachedData = queryClient.getQueryData([
      'calendarEvents',
      currentYear,
      currentMonth,
    ])
    if (!cachedData) {
      //캐시 없을 경우 안전장치 세팅 해놓기!
      console.error('React Query 캐시에서 데이터를 가져오지 못했습니다.')
      return
    }
    // 해당 날짜의 기존 일정 가져오기
    const existingDayData = cachedData.find(
      (day) => day.date === formattedDate,
    ) || { task_list: [] }

    // 수정된 일정 포함한 새로운 task_list 생성
    const updatedTaskList = existingDayData.task_list.map((task) =>
      task.title === targetEvent.title
        ? { ...task, title: newEventTitle } // 제목 수정
        : task,
    )

    const updatedEventData = {
      date: formattedDate,
      task_list: updatedTaskList,
    }

    console.log('Updating event:', updatedEventData)

    try {
      await calendarAddEvent(updatedEventData)

      queryClient.setQueryData(
        ['calendarEvents', currentYear, currentMonth],
        (oldData) => {
          //현재 달에 해당하는 캐시의 데이터가 없다면 updatedEventData로 갱신
          if (!oldData) return [updatedEventData]

          //기존 tanstack query의 데이터를 순회
          return oldData.map((day) =>
            day.date === formattedDate
              ? { ...day, task_list: updatedTaskList }
              : day,
          )
        },
      )
      // 수정 모드 종료
      setIsEditing(false)
      setEditingEventId(null)
    } catch (error) {
      console.error('Error updating event:', error)
      alert('일정을 수정하는 중 문제가 발생했습니다.')
    }
  }

  ////캘린더 일정 삭제 -> 점심 먹고 와서 고고고
  const handleDeleteEvent = async () => {
    if (contextMenu.eventId) {
      const targetEvent = events.find(
        (event) => event.id === contextMenu.eventId,
      )

      if (!targetEvent) {
        console.error('Target event not found.')
        alert('삭제하려는 이벤트를 찾을 수 없습니다.')
        return
      }

      const formattedDate = format(new Date(targetEvent.date), 'yyyy-MM-dd')

      try {
        // React Query 캐시 업데이트
        queryClient.setQueryData(
          ['calendarEvents', currentYear, currentMonth],
          (oldData) => {
            if (!oldData) {
              console.error(
                'React Query 캐시에서 데이터를 가져오지 못했습니다.',
              )
              return []
            }

            // 업데이트된 데이터를 생성
            const updatedDayData = oldData.map((day) => {
              if (day.date === formattedDate) {
                return {
                  ...day,
                  task_list: day.task_list.filter(
                    (task) => task.title !== targetEvent.title,
                  ),
                }
              }
              return day
            })

            return updatedDayData
          },
        )

        // 서버 요청: 업데이트된 데이터 전송
        const updatedEventData = {
          date: formattedDate,
          task_list:
            queryClient
              .getQueryData(['calendarEvents', currentYear, currentMonth])
              ?.find((day) => day.date === formattedDate)?.task_list || [],
        }

        await calendarAddEvent(updatedEventData)

        console.log('Event successfully deleted.')
        closeContextMenu()
      } catch (error) {
        console.error('Error deleting event:', error)
        alert('이벤트 삭제 중 문제가 발생했습니다.')
      }
    }
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

  useEffect(() => {
    if (calendarData) {
      const formattedEvents = calendarData.flatMap((item) =>
        item.task_list.map((task) => ({
          id: `${item.date}-${task.title}-${Math.random()}`, // 고유 ID 생성
          title: task.title,
          date: item.date,
          extendedProps: { memo: task.memo },
        })),
      )

      //tanstack-query를 통해 받아온 데이터로 갱신하기 전 기존 상태 이벤트 초기화
      calendarEventStore.getState().clearEvents()

      //이를 통해 서버 상태와 동기화
      formattedEvents.forEach((event) => addEvent(event))
    }
  }, [calendarData, addEvent])

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
          selectedDate={selectedDate}
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
