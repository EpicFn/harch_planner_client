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
  padding: 28px;
  border-radius: 8px;
  width: 550px;
  height: 500px;
  max-width: 90%; /* 화면 크기에 따라 최대 크기 제한 */
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;

  ${({ shaking }) =>
    shaking === 'true' &&
    css`
      animation: ${shake} 0.4s ease-in-out;
    `};
`

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 30px;
  position: absolute;
  top: 20px;
  right: 25px;
  cursor: pointer;
`

export const Title = styled.h2`
  margin-bottom: 10px;
  font-size: 24px; /* 적절한 폰트 크기 설정 */
  font-weight: bold;
  color: #333; /* 배경과 대조되는 색상 */
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`

export const FormGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center; /* Label과 Input을 수평 정렬 */
  justify-content: space-between; /* Label과 Input 간의 간격 */
  gap: 10px;
  width: 100%;
`

export const Label = styled.label`
  flex: 0.3; /* Label의 고정 너비 설정 */
  font-weight: bold;
  text-align: left;
`

export const Input = styled.input`
  flex: 1.2; /* Input이 Label보다 더 넓게 차지 */
  padding: 8px;
  box-sizing: border-box;
  border-radius: 4px;
  margin-right: 10px;
  border: 1px solid #ddd;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #8b3dff;
  }
`

export const CheckEmailButton = styled.button`
  flex: 0.25; /* 버튼 크기를 조정 */
  padding: 7px;
  border: none;
  border-radius: 4px;
  background-color: #8b3dff;
  color: white;
  font-weight: bold;
  margin-left: 10px;
  cursor: pointer;
  text-align: center;
  box-sizing: border-box;

  &:hover {
    background-color: #7a35e0;
  }
`

export const SignupButton = styled.button`
  background-color: #8b3dff;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 8px;
  width: 85%;
  margin-top: 20px;
  font-size: 16px;

  &:hover {
    background-color: #7a35e0;
  }
`

export const ErrorMessage = styled.div`
  font-size: small;
  font-weight: bold;
  color: red;
  margin-top: 5px;
  display: flex;
  justify-content: start;
`

export const FormBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 15px;
`

export const SignupText = styled.span`
  font-size: small;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

export const FormHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 20px;
`

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  color: black;
`
export const CertificationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
  width: 100%;
`

export const CertificationNumberInput = styled.input`
  padding: 8px 6px;
  text-align: center;
  width: 35%;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #8b3dff;
  }
`
export const SuccessIcon = styled.span`
  color: green;
  font-size: 1rem;
  margin-left: 0.5rem;
`
