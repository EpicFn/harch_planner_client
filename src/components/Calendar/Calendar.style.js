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
  width: 310px;
  height: 100%; // 부모 컨테이너와 같은 높이로 설정
  background-color: #f9f9f9;
  padding: 15px;
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

export const MonthGoalList = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 0px;
  font-weight: bold;
  font-size: 1.1rem;
`
export const MonthGoalItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-between;
  width: 95%;
  font-weight: bold;
  font-size: 1.1rem;
  margin-top: 20px;
`

export const MonthGoalTask = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f9f9f9;
  padding: 8px;
  margin: 5px 0;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  font-size: 14px;
  width: 95%;
  color: #333;
  box-sizing: border-box;
  outline: none;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.4);
  }
`

export const MonthGoalText = styled.div`
  flex: 1;
  outline: none;
  background-color: transparent;
  border: none;
  cursor: text;
  font-size: 14px;
  box-sizing: border-box;
`

export const MonthGoalAddButton = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 22px;
  top: 3px;
  right: 20px;
  border-radius: 50%;
  border: 1px solid #4caf50;
  background-color: white;
  color: #4caf50;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    background-color: #4caf50;
    color: white;
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
  }
`

export const MonthGoalDeleteButton = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: -22px;
  background-color: transparent;
  border: none;
  color: red;
  cursor: pointer;
  font-size: 1.1rem;
  padding: 0px;
`

export const CalendarContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  flex-grow: 1;
  padding: 30px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 100%;
  box-sizing: border-box;
`

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  align-items: center;
  margin-bottom: 16px;
`

export const SidebarHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: auto;
`

export const YearBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export const YearTitle = styled.h1`
  font-size: 1rem;
  margin-bottom: 10px;
  display: inline-block;
  white-space: nowrap;
`

export const CalendarIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-left: 6px;
`

export const MonthTitle = styled.h1`
  font-size: 2.5rem;
  margin: 0;
  display: inline-block;
  white-space: nowrap;
`

export const MonthMoveBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`

export const MonthArrowButton = styled.button`
  color: #333;
  border: none;
  background-color: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 12px;
  margin: 0px 0px 0px 10px;
  border-radius: 20%; /* 원형 버튼 */
  width: 20px; /* 버튼 너비 */
  height: 20px; /* 버튼 높이 */
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
  position: relative;
  display: block;
  width: 160px;
  min-width: 160px;
  border-radius: 0px;
  height: 100%;
  line-height: 37px;
  min-height: 37px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center; /* 가로 중앙 정렬 */
  outline: none;
  color: #505050;
  background-color: #ffffff !important;
  font-size: 0.8rem;
  padding: 5px 0px;
  box-sizing: border-box;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 8px;
    height: 100%;
    background-color: #007bff; /* 원하는 색상 */
  }
`
//일정 추가 시에 태스크 2개가 넘어갈 경우 나오는 숫자
export const MoreLinkStyled = styled.div`
  background-color: #ccff90;
  color: black;
  padding: 3px 3px;
  box-sizing: border-box;
  border-radius: 5px;
  font-weight: medium;

  &:hover {
    transform: scale(1.1);
    background-color: #ccff90; // hover 시에도 동일한 배경색 유지
  }
`

export const GlobalStyle = createGlobalStyle`
  .fc .fc-daygrid-event-harness {
    width: calc(100% - 12px) !important; /* 양쪽 여백을 고려 */
    margin: 0 auto;
  }

  .fc .fc-daygrid-day-top {
    position: relative;
  }

  .fc .fc-daygrid-event {//EventComponent의 부모 컴포넌트
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    width: auto;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    height: 25px;
    box-sizing: border-box;
    border-radius: 0px;
    margin: 0 auto;
    margin-bottom: 5px;
    font-size: 0.9rem;
    border: none;
  }
  
  .fc-h-event .fc-event-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .fc-daygrid-day-frame {
    height: 98px;
    max-height: 98px;
    position: relative;
    overflow: hidden;
  }

  //기본 팝업 지움(구글링)
  .fc-popover {
    visibility: hidden;
  }

  .fc .fc-toolbar.fc-header-toolbar {
    position: absolute;
  }

/* 커스텀 more-link 스타일 */
  .custom-more-link {
    position: absolute;
    left: 10px;  /* 날짜 옆으로 이동 */
    top: -80px;
    transform: translateY(-50%); /* 정확한 중앙 배치 */
    background-color: white; /* 필요 시 배경 색상 추가 */
    padding: 0 5px;
    font-size: 12px;
    font-weight: bold;
    color: blue; /* 원하는 색상으로 변경 */
    cursor: pointer;
    z-index: 10; /* 다른 요소 위에 표시되도록 설정 */
    display: block; /* 레이아웃을 차지하지 않도록 display 설정 */
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

  .fc .fc-more-link {
    background-color: transparent !important; 
    color: inherit !important; 
    box-shadow: none !important;
    border: none !important;
  }

  .fc .fc-more-link:hover {
    background-color: transparent !important;
  }
`
