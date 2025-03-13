import Calendar from '@components/Calendar/Calendar'
import MainContentBox from '@components/MainContentBox/MainContentBox'
import { DailyPlannerContainer } from '@pages/Calendar/CalendarPage.style'

export default function CalendarPage() {
  return (
    <DailyPlannerContainer>
      <MainContentBox content={<Calendar />} />
    </DailyPlannerContainer>
  )
}
