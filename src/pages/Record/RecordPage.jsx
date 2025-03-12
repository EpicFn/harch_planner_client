import MainContentBox from '@components/MainContentBox/MainContentBox'
import { DailyPlannerContainer } from '@pages/Record/RecordPage.style'
import Record from '@components/Record/Record'

export default function RecordPage() {
  const dailyPlannerJSX = (
    <div>
      <p>공부기록</p>
    </div>
  )
  return (
    <DailyPlannerContainer>
      <MainContentBox content={<Record />} />
    </DailyPlannerContainer>
  )
}
