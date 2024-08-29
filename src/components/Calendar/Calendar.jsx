import {
  CalendarContainer,
  GlobalStyle,
  HeaderContainer,
  MonthLabel,
  MonthTitle,
} from '@components/Calendar/Calendar.style'
import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from '@fullcalendar/react'

export default function Calendar() {
  return (
    <>
      <GlobalStyle />
      <CalendarContainer>
        <HeaderContainer>
          <MonthTitle>7</MonthTitle>
          <MonthLabel>월간목표</MonthLabel>
        </HeaderContainer>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={[
            { title: '수능특강 국어 3지문 끝내기', date: '2024-08-01' },
            { title: '과탐 전체 끝내기', date: '2024-08-07' },
            { title: '수능형식 수학 시작', date: '2024-08-14' },
            {
              title: '수능특강 국어 남은 지문 마무리, 수학학원 등록',
              date: '2024-08-21',
            },
            { title: '입시설명회, 캠퍼스 투어 다녀오기', date: '2024-08-28' },
          ]}
          locale="ko"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek,dayGridDay',
          }}
          buttonText={{
            today: '오늘',
            month: '월간',
            week: '주간',
            day: '일간',
          }}
          height="auto"
          contentHeight="auto"
        />
      </CalendarContainer>
    </>
  )
}
