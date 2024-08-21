import { ContentBox, MainContentBoxContainer, MenuList, MenuTap } from "./MainContentBox.style";

//--------------------------------------------------------------------------
//TODO
//선택된 메뉴에 on 속성 넣어서 색 바꾸기
//uselocation 사용해서 content 부분에 url에 따라 다른 component 호출해서 넣어주기
//--------------------------------------------------------------------------

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