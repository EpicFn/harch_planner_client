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
import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from '@fullcalendar/react'
import { useEffect, useState } from 'react'

export default function Calendar() {
  const [events] = useState([
    { title: '수능특강 국어 3지문 끝내기', date: '2024-08-01' },
    { title: '과탐 전체 끝내기', date: '2024-08-07' },
    { title: '수능형식 수학 시작', date: '2024-08-14' },
    {
      title: '수능특강 국어 남은 지문 마무리, 수학학원 등록',
      date: '2024-08-21',
    },
    { title: '입시설명회, 캠퍼스 투어 다녀오기', date: '2024-08-28' },
  ])

  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(null)

  const handleMonthChange = (arg) => {
    const newMonth = arg.view.currentStart.getMonth() + 1
    setCurrentMonth(newMonth)
  }

  useEffect(() => {
    // 페이지 로드시 현재 월로 상태 업데이트 해줬습니다
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
            plugins={[dayGridPlugin]}
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
            viewDidMount={handleMonthChange}
            viewDidUpdate={handleMonthChange}
            height="auto"
            contentHeight="auto"
          />
        </CalendarContainer>
      </Container>
    </>
  )
}
