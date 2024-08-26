import MainContentBox from '@components/MainContentBox/MainContentBox'
import { DailyPlannerContainer } from './DailyPlanner.style'

export default function DailyPlanner() {
  const dailyPlannerJSX = (
    <div>
      <p>DailyPlanner</p>
    </div>
  )

  return (
    <DailyPlannerContainer>
      <MainContentBox content={dailyPlannerJSX} />
    </DailyPlannerContainer>
  )
}
