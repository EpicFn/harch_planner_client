import styled, { createGlobalStyle } from 'styled-components'

export const CalendarContainer = styled.div`
  padding: 30px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%; // 캘린더 전체 너비를 100%로 설정
  max-width: 1500px; // 최대 너비를 설정하여 깨짐 방지
  height: 700px;
  min-height: 714px;
  margin: 0 auto;
  box-sizing: border-box;
  margin-top: 20px;
`

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 16px;
`

export const MonthTitle = styled.h1`
  font-size: 4rem;
  margin: 0;
`

export const MonthLabel = styled.h2`
  font-size: 1.5rem;
  color: #666;
`

export const GlobalStyle = createGlobalStyle`

  .fc .fc-daygrid-event-harness {
    display: flex;
    justify-content: center;
  }
  .fc .fc-daygrid-event {
    background-color: #E5E5EC;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 80%; // 이벤트의 너비를 100%로 설정하여 셀에 맞춤
    height: auto;
    padding: 5px;
    box-sizing: border-box;
    border-radius: 4px;
    text-align: center;
    margin: 0 auto;
    border: none;
  }


  .fc-daygrid-day-frame {
    height: 80px; // 셀의 높이를 고정하여 크기 문제 해결
  }

  .fc .fc-event-title.fc-sticky {
    color: #505050 !important;
  }
  
  .fc .fc-col-header-cell.fc-day-sun {
    color: red; /* 일요일은 빨간색 */
  }

  .fc .fc-col-header-cell.fc-day-sat {
    color: blue; /* 토요일은 파란색 */
  }

  .fc .fc-col-header-cell.fc-day-mon,
  .fc .fc-col-header-cell.fc-day-tue,
  .fc .fc-col-header-cell.fc-day-wed,
  .fc .fc-col-header-cell.fc-day-thu,
  .fc .fc-col-header-cell.fc-day-fri {
    color: black; /* 나머지 요일은 검정색 */
  }

  /* a 태그의 기본 스타일을 재설정하여 요일별 색상이 제대로 적용되도록 함 */
  .fc .fc-col-header-cell.fc-day a {
    color: inherit;
    text-decoration: none;
  }

  /* 날짜 번호 색상 변경 */
  .fc .fc-daygrid-day.fc-day-sun .fc-daygrid-day-number {
    color: red !important; /* 일요일은 빨간색 */
    font-weight: bold;
  }

  .fc .fc-daygrid-day.fc-day-sat .fc-daygrid-day-number {
    color: blue !important; /* 토요일은 파란색 */
    font-weight: bold;
  }

  .fc .fc-daygrid-day:not(.fc-day-sun):not(.fc-day-sat) .fc-daygrid-day-number {
    color: black !important; /* 나머지 요일은 검정색 */
    font-weight: medium;
  }
`
