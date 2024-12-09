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

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  height: 386px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

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

export const ModalInputBox = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 338px;
  max-width: 338px;
`

export const Input = styled.input`
  width: 100%;
  padding: 10px 0px;
  border: none;
  border-bottom: 1px solid black;
  transition: border-color 0.3s ease;
  font-size: large;

  &:focus {
    border-bottom: 2px solid #6c63ff;
    outline: none;
  }
`

export const Circle = styled.div`
  position: absolute;
  right: 0px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #6c63ff;
  cursor: pointer;
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`

export const SaveButton = styled.button`
  padding: 10px 20px;
  margin-top: 5px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`

export const TextMemo = styled.textarea`
  width: 80%;
  height: 189px;
  margin-top: 10px;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`

export const DateDisplay = styled.div`
  width: 80%;
  font-size: 16px;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin: 10px 0;
  padding: 8px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
`
