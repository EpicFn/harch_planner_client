import { Container, SiderBarArea, ContentArea } from "./Record.style";
import RecordMain from "./RecordMain/RecordMain";
import RecordSiderBar from "./RecordSideBar/RecordSiderBar";

export default function Record() {

    return (
        <Container>
            <SiderBarArea>
                <RecordSiderBar />
            </SiderBarArea>
            <ContentArea>
                <RecordMain />
            </ContentArea>
        </Container>
    )
}