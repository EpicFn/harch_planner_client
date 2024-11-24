import styled from 'styled-components'

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

export const ModalLayout = styled.div`
  position: relative;
  background-color: #f0f0f0;
  padding: 40px;
  border-radius: 10px;
  width: 750px;
  max-width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 20px;

  animation: fadeIn 0.3s ease-in-out; // 애니메이션 추가

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
  height: 120px;
`

export const ModalContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  font-size: 1.5rem;
  gap: 20px;
`

export const BookInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 400px;
  height: auto;
  gap: 10px;
`

export const InputLabel = styled.label`
  font-size: 0.9rem;
  font-weight: bold;
`

export const InputDescription = styled.span`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 10px;
`

export const ModalPageInputBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 27px;
  padding: 30px 0px;
  box-sizing: border-box;
`

export const ModalInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  width: 200px;
  height: 35px;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;

  &:focus {
    border-color: #007bff; /* 포커스 시 테두리 색상 */
    outline: none;
    box-shadow: 0px 0px 5px rgba(0, 123, 255, 0.5);
  }

  &:hover {
    background-color: #f9f9f9; /* hover 시 배경 색상 변경 */
  }
`

export const ModalPageInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  width: 80px;
  height: 39px;
  box-sizing: border-box;
  text-align: center;
  transition: all 0.2s ease-in-out;

  &:focus {
    border-color: #007bff; /* 포커스 시 테두리 색상 */
    outline: none;
    box-shadow: 0px 0px 5px rgba(0, 123, 255, 0.5);
  }

  &:hover {
    background-color: #f9f9f9; /* hover 시 배경 색상 변경 */
  }
`

export const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 10px;
`

export const ModalButton = styled.button`
  padding: 10px 20px;
  background-color: white;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100px;

  &:last-child {
    background-color: #ff6b6b;
    color: white;
  }
`
export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 15px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #888;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.2s ease-in;
  }
`
export const Line = styled.hr`
  width: 98%;
  height: 1px;
  background-color: gray;
`

export const PagesInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 10px;
  width: auto;
  height: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 5px 10px;
  box-sizing: border-box;
`
