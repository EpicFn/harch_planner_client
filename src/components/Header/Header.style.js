import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 146px;
  margin-top: 30px;
`

export const LogoBox = styled.div`
  font-family: 'Ephesis';
  font-weight: 400;
  font-style: normal;
  font-size: 40px;
`

export const UserProfileBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const DdayBox = styled.div`
  padding-right: 8px;
`

export const UserNicknameBox = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
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
export const ThemeButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`

export const ThemeButton = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-left: 10px;
  flex-shrink: 0;
  border: 2px solid #dedede;
  cursor: pointer;
  background-color: ${(props) => props.color};
  &:hover {
    border-color: #ccc;
  }
`
export const Logo = styled.img`
  height: 50px;
  max-height: 50px;
  width: auto;
`
