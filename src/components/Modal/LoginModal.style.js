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
  width: 700px;
  height: 500px;
  max-width: 700px;
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
  width: 345px;
  max-width: 345px;
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
  width: 100%;
  box-sizing: border-box;
`

export const FormGroup = styled.div`
  margin-bottom: 5px;
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
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: white;

  &:focus {
    outline: none;
    background-color: white;
  }
`

export const SubmitButton = styled.button`
  background-color: #8b3dff;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 8px;
  margin-top: 10px;
`
export const ErrorMessage = styled.div`
  width: 300px;
  font-size: small;
  font-weight: bold;
  color: red;
  height: 1.5em; /* 고정 높이 설정 */
  line-height: 1.5em; /* 고정 높이에 맞춘 라인 높이 설정 */
`
