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
  justify-content: flex-start;
  align-items: center;
  width: 380px;
  height: 565px; // 부모 컨테이너와 같은 높이로 설정
  background-color: #f9f9f9;
  padding: 20px;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  margin-right: 20px;
  border-radius: 8px;
  flex-shrink: 0;
  overflow-y: scroll;

  //스크롤바는 커스터마이징해봤는데 디자인 수정 필요할거같으면 가능합니다
  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #b0b0b0;
    background: linear-gradient(180deg, #c4c4c4, #8e8e8e);
    border-radius: 10px;
    border: 2px solid transparent;
    background-clip: content-box;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(180deg, #b0b0b0, #7a7a7a);
  }

  &::-webkit-scrollbar-track {
    background-color: #e0e0e0;
    border-radius: 10px;
  }
`

export const MonthGoalList = styled.h3`
  margin-top: 0px;
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
  position: relative;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  align-items: center;
  margin-bottom: 16px;
`

export const YearTitle = styled.h1`
  font-size: 3rem;
  margin: 10px;
  display: inline-block;
  white-space: nowrap;
`

export const MonthTitle = styled.h1`
  font-size: 3rem;
  margin: 0;
  display: inline-block;
  white-space: nowrap;
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

export const ContextMenu = styled.div`
  position: absolute;
  width: 120px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  overflow: hidden;
  top: 50px; /* 원하는 위치에 맞춰 조정 */
  right: 20px; /* 오른쪽 하단 고정 */

  div:first-child {
    border-bottom: 0.3px solid gray;
  }
`

export const ContextMenuItem = styled.div`
  padding: 4px 15px;
  font-size: 14px;
  color: #333;
  background-color: #fff;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;

  &:hover {
    background-color: #f5f5f5;
    color: #007bff; /* hover 시 텍스트 색상 변경 */
  }

  &:active {
    background-color: #e0e0e0; /* 클릭 시 배경 색상 */
  }
`
//캘린더에 이벤트 추가 시 사용되는 컴포넌트
export const EventContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 100%;
  border-radius: 4px;
  height: 13.2px;
  outline: none;
  color: #505050;
  font-size: small;
  background-color: #e5e5ec;
`

export const ArrowButton = styled.button`
  background-color: #fff;
  border: 1px solid #ccc;
  color: #333;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 8px;
  margin: 0px 0px 0px 15px;
  border-radius: 20%; /* 원형 버튼 */
  width: 40px; /* 버튼 너비 */
  height: 40px; /* 버튼 높이 */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 버튼에 약간의 그림자 추가 */
  transition: all 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }

  &:active {
    background-color: #e0e0e0;
    color: #0056b3;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 클릭 시 그림자 변화 */
  }

  &:focus {
    outline: none;
  }
`

export const GlobalStyle = createGlobalStyle`
  .fc .fc-daygrid-event-harness {
    display: flex;
    justify-content: center;
  }
  .fc .fc-daygrid-event {
    background-color: #E5E5EC;
    width: 80%;
    height: auto;
    padding: 5px;
    box-sizing: border-box;
    border-radius: 4px;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 5px;
    border: none;
  }
  
  .fc-h-event .fc-event-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .fc-daygrid-day-frame {
    height: 88px;
  }

  .fc .fc-toolbar.fc-header-toolbar {
    position: absolute;
  }

  .fc .fc-toolbar-title {
    display: none
  }
  .fc-direction-ltr .fc-toolbar > * > :not(:first-child) {
    display: none
  }

  .fc .fc-event-title.fc-sticky {
    color: #505050 !important;
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

  .fc .fc-daygrid-day .fc-daygrid-day-number {
    color: #505050 !important;
    font-weight: medium;
  }
`
