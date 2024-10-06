import MainContentBox from '@components/MainContentBox/MainContentBox'
import { DailyPlannerContainer } from './DailyPlannerPage.style'
import DailyPlanner from '@components/DailyPlanner/DailyPlanner'

export default function DailyPlannerPage() {

  return (
    <DailyPlannerContainer>
      <MainContentBox content={<DailyPlanner />} />
    </DailyPlannerContainer>
  )
}
