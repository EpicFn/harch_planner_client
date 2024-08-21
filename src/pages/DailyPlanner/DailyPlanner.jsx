import Header from "@components/Header/Header";
import { DailyPlannerContainer } from "./DailyPlanner.style";
import MainContentBox from "@components/MainContentBox/MainContentBox";

export default function DailyPlanner() {
    
    const dailyPlannerJSX = 
        <div>
            <p>DailyPlanner</p>
        </div>
        

    return(
        <DailyPlannerContainer>
            <Header />
            <MainContentBox content={dailyPlannerJSX}/>
        </DailyPlannerContainer>        
    )
}