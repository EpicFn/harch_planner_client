import styled from 'styled-components'

export const PreferencesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 783px;
  max-height: 783px;
  background-color: white;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin-top: 18px;
`

export const PreferencesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 8px 35px;
  border-bottom: 1px solid #ddd;
  box-sizing: border-box;
  font-size: 24px;
  font-family: 'Ephesis';
`

export const PreferencesContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 726px;
  font-size: 24px;
  font-family: 'Ephesis';
`

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`

export const Sidebar = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid #ddd;
`

export const SidebarItem = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 15px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  box-sizing: border-box;
  background-color: ${(props) => (props.selected ? '#f0f0f0' : 'transparent')};
`

export const Content = styled.div`
  flex: 4;
  padding: 10px 20px;
`

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;

  .profile-pic {
    font-size: 50px;
    margin-bottom: 10px;
  }

  .user-name {
    font-size: 24px;
    margin-bottom: 5px;
  }

  .user-id,
  .user-pw {
    margin-bottom: 5px;
  }

  .icon {
    font-size: 30px;
    margin-top: 20px;
  }
`

export const WorkbookDetails = styled.div`
  font-size: 16px;
  margin-top: 4px;
`

export const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

export const UserInfoHeader = styled.h3`
  margin-bottom: 25px;
  margin-top: 0px;
  font-size: 26px;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  width: 100%;
  box-sizing: border-box;
`

export const UserInfoCard = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 50px 40px;
  margin-top: 80px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  position: relative;
`

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`

export const InfoIcon = styled.span`
  font-size: 20px;
  color: #777;
  margin-right: 10px;
`

export const InfoText = styled.span`
  font-size: 18px;
  color: #555;
  margin-right: 15px;
  width: 80px;
  max-width: 80px;
`

export const StyledInput = styled.input`
  width: 70%;
  padding: 10px 15px;
  font-size: 16px;
  color: #555;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  outline: none;

  &::placeholder {
    color: #aaa;
  }
`

export const ProfilePic = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #ddd;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: #555;
`

export const EditButton = styled.button`
  padding: 10px 15px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100px;
  position: absolute;
  right: 20px;
  bottom: 10px;
`

export const ThemeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  h3 {
    margin-bottom: 25px;
    margin-top: 0px;
    font-size: 26px;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    width: 100%;
    box-sizing: border-box;
  }

  span {
    margin-bottom: 20px;
    font-size: 30px;
    font-weight: bold;
    color: #333;
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }
`
export const ThemeBoxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  justify-content: flex-start;
  margin-top: 20px;
  box-sizing: border-box;
`

export const ThemeBox = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 8px;
  border: 0.5px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.5); //가독성 향상 시키기
  cursor: pointer;
  background-color: ${(props) => props.bgcolor};
  box-shadow: ${(props) =>
    props.selected ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none'};
  outline: none;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
    transition: all 0.3s ease-in-out;
  }
`
