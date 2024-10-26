import { FaSearch } from 'react-icons/fa'
import styled from 'styled-components'

export const LibraryContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 100px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #f5f5f5;
`
export const OngoingSection = styled.div`
  width: 60%; // 7:3 비율로 왼쪽 영역을 더 넓게 설정
  height: 650px;
  max-height: 650px;
  background-color: rgba(217, 217, 217, 0.5);
  border-radius: 8px;
  padding: 20px 40px;
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-y: scroll;
  color: black;

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
  background-color: rgba(217, 217, 217, 0.5);
  border-radius: 8px;
  padding: 20px 30px;
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-y: scroll;

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

export const CompletedSectionContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  align-items: center;
  gap: 20px;
  height: auto;
`

export const CompletedBookItem = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 15px;
  border-radius: 8px;
  font-size: 1rem;
  color: #333;
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

export const SearchContainer = styled.div`
  position: relative;
  width: 340px;
`

export const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 15px 0 40px; /* 왼쪽에 아이콘 공간 확보 */
  border: 1px solid #ddd;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  font-size: 1rem;
  color: #333;
  background-color: #f9f9f9;
  outline: none;
  transition:
    box-shadow 0.3s ease,
    border-color 0.3s ease;

  &:focus {
    border-color: #ff6b6b;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    background-color: #fff;
  }
`

export const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 15px; /* 입력 필드 내부 아이콘 위치 */
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 1rem;
`
