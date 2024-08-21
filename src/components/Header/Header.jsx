import { DdayBox, HeaderContainer, LogoBox, UserNicknameBox, UserProfileBox } from "./Header.style";

//TODO : 
//prop로 값 보내기
//nameBox 올렸을 때 setting 메뉴 띄우기

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