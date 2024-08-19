import { ContentBox, MainContentBoxContainer, MenuList, MenuTap } from "./MainContentBox.style";


export default function MainContentBox({content}) {
    return(
        <MainContentBoxContainer>
            <MenuList>
                <MenuTap>달력</MenuTap>
                <MenuTap on>일일 플래너</MenuTap>
                <MenuTap>공부 기록</MenuTap>
                <MenuTap>서재</MenuTap>
            </MenuList>
            <ContentBox>
                {content}
            </ContentBox>
        </MainContentBoxContainer>
    )
}