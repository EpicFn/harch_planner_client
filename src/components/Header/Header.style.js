import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 35px;
  box-sizing: border-box;
  width: 100%;
  height: 85px;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5); /* 짙은 회색 반투명 배경 */
  backdrop-filter: blur(10px); /* 배경 흐림 효과 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3); /* 살짝의 그림자 효과 */
`
export const NavLinks = styled.nav`
  display: flex;
  gap: 30px;
  width: 500px;
  max-width: 500px;
  justify-content: space-evenly;

  a {
    color: white;
    text-decoration: none;
    font-size: 18px;
    transition: transform 0.3s ease; /* 부드러운 애니메이션 설정 */

    &:hover {
      transform: scale(1.15); /* 글자 크기 확대 */
    }
  }
`
