import styled from 'styled-components'

export const LibraryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 60px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #f5f5f5;
`
export const OngoingSection = styled.div`
  width: 60%; // 7:3 비율로 왼쪽 영역을 더 넓게 설정
  height: 650px;
  max-height: 650px;
  background-color: white;
  border-radius: 8px;
  padding: 20px 40px;
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-y: scroll;
  color: black;
`

export const OngoingSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  margin-bottom: 50px;
`

export const OngoingSectionContent = styled.div`
  display: flex;
  flex-wrap: wrap; /* 줄 바꿈을 허용 */
  gap: 20px;
`

export const CompletedSection = styled.div`
  width: 30%; // 오른쪽 영역
  height: 650px;
  max-height: 650px;
  background-color: white;
  border-radius: 8px;
  padding: 20px 40px;
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
`

export const BookList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

export const BookItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

export const AddButton = styled.button`
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 8px;
  width: 80px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.2s ease-in;
  }
`
