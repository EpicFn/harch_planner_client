import { DdayBox, HeaderContainer, LogoBox, UserNicknameBox, UserProfileBox } from "./Header.style";

export default function Header() {
    return(
        <HeaderContainer>
            <LogoBox>
                Harch
            </LogoBox>
            <UserProfileBox>
                <DdayBox>
                    D-154
                </DdayBox>
                <UserNicknameBox>
                    User0309
                </UserNicknameBox>
            </UserProfileBox>
        </HeaderContainer>
    )
}