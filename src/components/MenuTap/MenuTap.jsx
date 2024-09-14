import { MenuTapStyled } from '@components/MenuTap/MenuTap.style'

export default function MenuTap({ active, onClick, children }) {
  return (
    <MenuTapStyled active={active} onClick={onClick}>
      {children}
    </MenuTapStyled>
  )
}
