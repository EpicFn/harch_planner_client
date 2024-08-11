import styled from 'styled-components'

export const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: url('/src/assets/studying.jpg') no-repeat center center fixed;
  background-size: cover;
  font-family: 'Poppins', sans-serif;
`

// 상단 헤더
export const HeaderContainer = styled.header`
  display: flex;
  justify-content: flex-end;
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

// 로그인 안내 텍스트
export const LoginPrompt = styled.span`
  color: white;
  margin-right: 10px;
  font-size: 1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
`

// 프로필 이미지
export const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  border-radius: 50%;
  border: 2px solid #fff;
  background-color: ${(props) =>
    props.src ? 'transparent' : '#555'}; /* 프로필 이미지가 없으면 회색 배경 */
  background-image: ${(props) => (props.src ? `url(${props.src})` : 'none')};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.src ? 'transparent' : 'white')};
  font-size: 0.875rem;
  text-transform: uppercase;
`

// 메인 콘텐츠 영역
export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-top: 90px; /* 헤더 공간 확보를 위한 패딩 */
  text-align: center;
  color: #ffffff;
`

// 페이지 타이틀
export const Header = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
`

// 서브텍스트
export const SubText = styled.p`
  font-size: 1.25rem;
  color: #f0f0f0;
  margin-bottom: 40px;
  max-width: 600px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
  background: rgba(0, 0, 0, 0.2);
  padding: 10px 20px;
  border-radius: 8px;
`

// 로그인 버튼
export const LoginButton = styled.button`
  background-color: #6a1b9a;
  color: white;
  border: none;
  padding: 12px 24px;
  cursor: pointer;
  border-radius: 8px;
  font-size: 18px;
  margin-top: 20px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s ease,
    background-color 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    background-color: #8e24aa;
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.15);
    transform: scale(1.05);
  }
`
