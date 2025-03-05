import styled from 'styled-components'

export const MainContentBoxContainer = styled.div`
  margin: 0 146px;
  margin-bottom: 40px;
`

export const MenuList = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  justify-content: space-evenly;
  padding-left: 0;
  margin-bottom: 0;
`

export const ContentBox = styled.div`
  height: 750px;
  flex-shrink: 0;
  border: 1px solid #dedede;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
`

export const ContextMenu = styled.div`
  position: absolute;
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  cursor: pointer;
  transition: transform 0.2s ease-in;

  &:hover {
    transform: scale(1.12);
  }
`
