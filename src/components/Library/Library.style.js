import { FaPlus, FaSearch } from 'react-icons/fa'
import styled from 'styled-components'

export const LibraryContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: #f5f5f5;
`
export const OngoingSection = styled.div`
  flex-grow: 2;
  width: 1024px;
  height: 100%;
  background-color: white;
  padding: 12px 60px;
  box-sizing: border-box;
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

export const OngoingSubject = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  height: 50px;
  background-color: #f0f0f0;
  color: #333;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  margin-top: 30px;
  box-sizing: border-box;
`

export const CompletedSubject = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  height: 50px;
  background-color: #f0f0f0;
  color: #333;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  margin-top: 30px;
  box-sizing: border-box;
`

export const OngoingSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  margin-bottom: 20px;
`

export const CompletedSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  margin-bottom: 30px;
`

export const Sidebar = styled.div`
  flex-grow: 0.5;
  max-width: 28%; /* 1:3 비율 설정 */
  height: 100%;
  background-color: rgba(217, 217, 217, 0.5);
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const OngoingSectionContent = styled.div`
  display: flex;
  flex-wrap: wrap; /* 줄 바꿈을 허용 */
  gap: 40px;
`

export const CompletedSectionContent = styled.div`
  display: flex;
  flex-wrap: wrap; /* 줄 바꿈을 허용 */
  gap: 40px;
`

export const CompletedSection = styled.div`
  flex-grow: 2;
  width: 1024px;
  height: 100%;
  background-color: white;
  padding: 12px 60px;
  box-sizing: border-box;
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
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
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

export const SearchContainer = styled.div`
  position: relative;
  width: auto;
  height: auto;
`

export const SearchInput = styled.input`
  width: 300px;
  height: 40px;
  padding: 0 15px 0 40px; /* 왼쪽에 아이콘 공간 확보 */
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
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
export const SubjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: auto;
  align-items: center;
  margin-top: 15px;
`

export const SubjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: auto;
  margin-top: 15px;
`
export const SubjectTitle = styled.span`
  font-size: 1.1rem;
  color: #333;
`

export const AddSubjectButton = styled(FaPlus)`
  font-size: 1.2rem;
  cursor: pointer;
  color: #333;

  &:hover {
    transform: scale(1.1);
    transition: transform 0.2s ease-in;
  }
`
export const SubjectContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 350px;
  margin-top: 30px;
  padding: 20px;
  font-size: 16px;
  overflow-y: scroll;
  overflow-x: hidden;

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
export const SubjectContentItem = styled.div`
  font-size: 0.875rem;
  color: #333;
  padding-left: 16px;
  margin-bottom: 4px;

  &:hover {
    color: #6200ea;
  }
`
export const SubjectCircle = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: ${(props) => props.color || '#ccc'};
  margin-right: 8px;
`
export const SubjectTitleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-top: 12px;
  padding-left: 10px;
  cursor: pointer;
`

export const SubjectToggleIcon = styled.span`
  margin-left: auto;
  transform: rotate(${(props) => (props.isopen === 'true' ? '90deg' : '0deg')});
  transition: transform 0.3s ease;
  font-size: 2rem;
  line-height: 1;
  display: flex;
  align-items: center;
  cursor: pointer;
`

export const SubjectName = styled.span`
  font-size: 16px;
  color: #333;
  font-weight: bold;
`

// 문제집 항목 스타일
export const WorkbookItemStyled = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  padding-left: 65px;
  margin-top: 5px;
  font-size: 0.9rem;
  color: #333;
`
