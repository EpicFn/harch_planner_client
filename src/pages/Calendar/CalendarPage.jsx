import MainContentBox from '@components/MainContentBox/MainContentBox'
import { DailyPlannerContainer } from '@pages/Calendar/CalendarPage.style'

export default function CalendarPage() {
  const dailyPlannerJSX = (
    <div>
      <p>Calendar</p>
    </div>
  )
  return (
    <DailyPlannerContainer>
      <MainContentBox content={dailyPlannerJSX} />
    </DailyPlannerContainer>
  )
}
