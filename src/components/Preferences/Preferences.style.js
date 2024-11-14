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
  cursor: pointer;
  box-sizing: border-box;

  &:hover {
    background-color: #f0f0f0;
  }
`

export const Content = styled.div`
  flex: 4;
  padding: 20px;
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
