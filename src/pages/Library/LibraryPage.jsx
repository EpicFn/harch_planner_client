import MainContentBox from '@components/MainContentBox/MainContentBox'
import { DailyPlannerContainer } from '@pages/Library/LibraryPage.style'

export default function LibraryPage() {
  const dailyPlannerJSX = (
    <div>
      <p>서재</p>
    </div>
  )
  return (
    <DailyPlannerContainer>
      <MainContentBox content={dailyPlannerJSX} />
    </DailyPlannerContainer>
  )
}
