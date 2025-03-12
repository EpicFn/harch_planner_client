import { Container, SiderBarArea, ContentArea } from "./Record.style";
import RecordMain from "./RecordMain";
import RecordSiderBar from "./RecordSiderBar";

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