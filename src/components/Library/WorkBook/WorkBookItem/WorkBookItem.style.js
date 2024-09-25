import styled from 'styled-components'

export const StyledWorkBookItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 10px;
  width: calc(50% - 15px); /* 두 세로 줄을 위한 너비 설정 (50%) */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  height: 100px; /* 각 항목의 높이를 고정 */
`
export const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-left: 50px;
`

export const BookTitle = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
`

export const BookSubject = styled.span`
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 5px;
`

export const DateText = styled.span`
  font-size: 0.875rem;
  color: #777;
  margin-top: 5px;
`
