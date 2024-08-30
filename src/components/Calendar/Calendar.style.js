import styled, { createGlobalStyle } from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column; // 사이드바와 캘린더를 가로로 배치
  justify-content: flex-start; // 시작 부분에 정렬
  width: 100%;
  height: 100%; // 전체 화면 높이에 맞추기
  padding: 30px 80px;
  box-sizing: border-box;
  align-items: center;
`

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 430px;
  height: 565px; // 부모 컨테이너와 같은 높이로 설정
  background-color: #f9f9f9;
  padding: 20px;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  margin-right: 20px;
  border-radius: 8px;
  flex-shrink: 0;
  overflow-y: scroll;
`

export const WeekTaskContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
  border-bottom: 1px solid #e5e5ec;
`

export const WeekTaskTitle = styled.h3`
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
`

export const TaskItem = styled.div`
  font-size: 16px;
  color: #666;
  margin-bottom: 5px;
  background-color: #e5e5ec;
  padding: 8px;
  border-radius: 4px;
`

export const CalendarContainer = styled.div`
  display: flex;
  width: 100%;
  flex-grow: 1;
  padding: 30px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: calc(100% - 80px); // 부모 컨테이너와 같은 높이로 설정
  box-sizing: border-box;
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

export const MonthLabelBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 76px;
  margin-left: 15px;
  border: 1px solid #cacad7;
  border-radius: 8px;
`

export const MonthLabel = styled.h2`
  font-size: 20px;
  color: #505050;
  margin-left: 30px;
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
    width: 70%;
    height: auto;
    padding: 5px;
    box-sizing: border-box;
    border-radius: 4px;
    text-align: center;
    margin: 0 auto;
    border: none;
  }

  .fc-daygrid-day-frame {
    height: 80px;
  }

  .fc .fc-toolbar.fc-header-toolbar {
    margin-bottom: 0.4rem;
  }

  .fc .fc-event-title.fc-sticky {
    color: #505050 !important;
  }

  .fc .fc-col-header-cell.fc-day-sun {
    color: red;
  }

  .fc .fc-col-header-cell.fc-day-sat {
    color: blue;
  }

  .fc .fc-col-header-cell.fc-day-mon,
  .fc .fc-col-header-cell.fc-day-tue,
  .fc .fc-col-header-cell.fc-day-wed,
  .fc .fc-col-header-cell.fc-day-thu,
  .fc .fc-col-header-cell.fc-day-fri {
    color: black;
  }

  .fc .fc-col-header-cell.fc-day a {
    color: inherit;
    text-decoration: none;
  }

  .fc .fc-daygrid-day.fc-day-sun .fc-daygrid-day-number {
    color: red !important;
    font-weight: bold;
  }

  .fc .fc-daygrid-day.fc-day-sat .fc-daygrid-day-number {
    color: blue !important;
    font-weight: bold;
  }

  .fc .fc-daygrid-day:not(.fc-day-sun):not(.fc-day-sat) .fc-daygrid-day-number {
    color: black !important;
    font-weight: medium;
  }
`
