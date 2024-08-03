import styled from 'styled-components'

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`

export const ModalContainer = styled.div`
  background: white;
  padding: 30px;
  border-radius: 8px;
  width: 650px;
  height: 400px;
  max-width: 90%;
  position: relative;
  display: flex;
`

export const IconWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`
export const IconImage = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 30px;
  position: absolute;
  top: 35px;
  right: 35px;
  cursor: pointer;
`

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 0.3;
  height: 100%;
  padding: 2px 20px;
  box-sizing: border-box;
`

export const ImageContainer = styled.div`
  flex: 1;
  background-image: url('/src/assets/planner.png');
  background-size: cover;
  background-position: center;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
`

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 0px;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`

export const FormGroup = styled.div`
  margin-bottom: 15px;
`

export const Label = styled.label`
  margin-bottom: 5px;
  display: block;
  font-weight: bold;
`

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  margin-top: 5px;
  border-radius: 4px;
  border: 1px solid #ddd;

  &:focus {
    outline: none;
  }
`

export const SubmitButton = styled.button`
  background-color: #8b3dff;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 8px;
`
