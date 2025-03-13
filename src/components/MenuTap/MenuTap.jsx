import { MenuTapStyled } from '@components/MenuTap/MenuTap.style'

export default function MenuTap({ active, onClick, children, icontab }) {
  return (
    <MenuTapStyled active={active} onClick={onClick} icontab={icontab}>
      {children}
    </MenuTapStyled>
  )
}
