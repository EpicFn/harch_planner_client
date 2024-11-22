import { css, keyframes, styled } from 'styled-components'

const shake = keyframes`
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-5px);
  }
`

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6); // 더 어두운 배경
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

export const ModalLayout = styled.div`
  position: relative;
  background-color: #fff;
  padding: 40px;
  border-radius: 15px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  animation: fadeIn 0.3s ease-in-out;

  ${({ shaking }) =>
    shaking === 'true' &&
    css`
      animation:
        fadeIn 0.3s ease-in-out,
        ${shake} 0.4s ease-in-out;
    `};

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

export const ProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
`

export const ModalContent = styled.div`
  width: 100%;
  font-size: 1.25rem; // 더 작은 폰트 크기
  gap: 20px;
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px; // 간격 증가
  width: 100%;
`

export const ModalInput = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.1); // 내부 그림자
  transition: border-color 0.3s ease;
  box-sizing: border-box;

  &:focus {
    border-color: #6c63ff; // 포커스 시 테두리 색 변경
    outline: none;
  }
`

export const ModalPageInputBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 12px;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  height: auto;
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.1); // 내부 그림자
  transition: border-color 0.3s ease;
  box-sizing: border-box;

  &:focus {
    border-color: #6c63ff; // 포커스 시 테두리 색 변경
    outline: none;
  }
`

export const ModalPageInput = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  width: 150px;
  text-align: center;
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.1); // 내부 그림자
  transition: border-color 0.3s ease;
  box-sizing: border-box;

  &:focus {
    border-color: #6c63ff; // 포커스 시 테두리 색 변경
    outline: none;
  }
`

export const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 10px;
`

export const ModalButton = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  border: none;
  background-color: #6c63ff; // 기본 버튼 색
  color: white;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #5548c8; // 호버 시 색 변경
  }

  &:last-child {
    background-color: #ff6b6b; // 마지막 버튼(취소 버튼)은 빨간색
    color: white;
  }

  &:last-child:hover {
    background-color: #d9534f; // 취소 버튼 호버 색상
  }
`

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 20px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #aaa;

  &:hover {
    color: #555;
    transform: scale(1.1); // 호버 시 확대 효과
    transition: transform 0.2s ease-in-out;
  }
`

export const Line = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #ddd;
`

export const ColorPickerLabel = styled.div`
  margin-top: 20px;
  color: white;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.2;
  white-space: pre-line;
`

export const SelectedColorBox = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.color || '#ffffff'};
  border-radius: 4px;
`

export const SelectedColorCode = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  height: auto;
  margin-top: 10px;
  padding: 5px;
  font-size: 0.9rem;
  color: #333;
  background-color: #f0f0f0;
  border-radius: 5px;
  font-weight: bold;
`

export const ColorLabel = styled.span`
  font-size: 1rem;
  color: #333;
`

export const SubjectListContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  gap: 12px;
  margin-top: 15px;
`

export const SubjectItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid ${(props) => (props.selected ? '#6a5acd' : '#ccc')};
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? '#f0f0ff' : 'white')};
  &:hover {
    background-color: #f9f9f9;
  }
`

export const SubjectColorBox = styled.div`
  width: 15px;
  height: 15px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
`

export const SubjectName = styled.span`
  font-size: 16px;
  color: #333;
`
