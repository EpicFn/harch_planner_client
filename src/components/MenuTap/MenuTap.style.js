import styled from 'styled-components'

export const MenuTapStyled = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex: ${(props) => (props.icontab ? '0 0 50px' : '1 0 0')};
  width: ${(props) => (props.icontab ? '50px' : 'auto')};
  align-self: stretch;
  border-radius: 8px 8px 0px 0px;
  border-top: 1px solid rgba(222, 222, 222, 0.5);
  border-right: 1px solid rgba(222, 222, 222, 0.5);
  border-left: 1px solid rgba(222, 222, 222, 0.5);
  background: ${(props) =>
    props.active === 'true' ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  padding: 3px 0;
  cursor: pointer;
`
