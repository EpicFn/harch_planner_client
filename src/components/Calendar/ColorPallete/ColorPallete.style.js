import styled from 'styled-components'

export const ColorPaletteContainer = styled.div`
  display: flex;
  position: absolute;
  top: 25px;
  right: 0;
  padding: 8px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 100;
`

export const ColorCircle = styled.div`
  width: 16px;
  height: 16px;
  margin: 4px;
  border-radius: 50%;
  background-color: ${(props) => props.color}; /* 동적 색상 적용 */
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.2);
  }
`
