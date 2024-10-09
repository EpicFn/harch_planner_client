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
  width: 600px;
  max-width: 100%;
  height: 440px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
`

export const ProgressContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
`

export const ModalContent = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  align-items: center;
  font-size: 1.5rem;
  gap: 20px;
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  gap: 10px;
`

export const ModalInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  width: 320px;
  height: 39px;
  box-sizing: border-box;
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
  transition: color 0.2s ease;

  &:hover {
    color: #ff5a5a;
  }
`
