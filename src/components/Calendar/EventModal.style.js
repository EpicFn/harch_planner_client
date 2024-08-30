import styled from 'styled-components'

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
  height: 200px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`

export const Input = styled.input`
  width: 80%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`
export const ErrorMessage = styled.div`
  display: flex;
  justify-content: flex-start;
  color: red;
  font-weight: bold;
  width: 85%;
`
