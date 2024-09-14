import MainContentBox from '@components/MainContentBox/MainContentBox'
import { DailyPlannerContainer } from '@pages/Record/RecordPage.style'

export default function RecordPage() {
  const dailyPlannerJSX = (
    <div>
      <p>공부기록</p>
    </div>
  )
  return (
    <DailyPlannerContainer>
      <MainContentBox content={dailyPlannerJSX} />
    </DailyPlannerContainer>
  )
}
