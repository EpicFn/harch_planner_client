import styled from 'styled-components'

export const MainContentBoxContainer = styled.div`
  margin: 0 146px;
`

export const MenuList = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  justify-content: space-evenly;
  padding-left: 0;
  margin-bottom: 0;
`

export const MenuTap = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 8px 8px 0px 0px;
  border-top: 1px solid rgba(222, 222, 222, 0.5);
  border-right: 1px solid rgba(222, 222, 222, 0.5);
  border-left: 1px solid rgba(222, 222, 222, 0.5);
  background: ${(props) =>
    props.on ? 'rgba(255, 255, 255, 0.80)' : 'rgba(255, 255, 255, 0.50)'};
  padding: 3px 0;
`

export const ContentBox = styled.div`
  height: 572px;
  flex-shrink: 0;
  border-radius: 0px 0px 12px 12px;
  border: 1px solid #dedede;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
`
