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
export const SubjectCircle = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: ${(props) => props.color || '#ccc'};
  margin-right: 8px;
`

export const StudyEnvironmentContainer = styled.div`
  h3 {
    margin-bottom: 25px;
    margin-top: 0px;
    font-size: 26px;
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
`

export const WorkbookContainer = styled.div`
  margin-bottom: 16px;
  padding-bottom: 8px;
`

export const WorkbookHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  span {
    margin-left: 8px;
    font-size: 18px;
    font-weight: 600;
  }
`

export const WorkbookDetails = styled.div`
  font-size: 16px;
  margin-top: 4px;
`

export const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  h3 {
    margin-bottom: 25px;
    margin-top: 0px;
    font-size: 26px;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    width: 100%;
    box-sizing: border-box;
  }

  .user-name {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .user-info {
    margin-bottom: 8px;
  }
`

export const ThemeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  h3 {
    margin-bottom: 25px;
    margin-top: 0px;
    font-size: 26px;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    width: 100%;
    box-sizing: border-box;
  }
`
