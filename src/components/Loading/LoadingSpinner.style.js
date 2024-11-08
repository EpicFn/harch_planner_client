import styled, { keyframes } from 'styled-components'

// Spinner 애니메이션
const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

// 로딩 스피너가 중앙에 위치하도록 설정
export const LoadingSpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: absolute;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
`

// Spinner 스타일
export const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 6px solid #ccc;
  border-top-color: #5a5daf;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`
