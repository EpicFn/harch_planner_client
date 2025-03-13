import Library from '@components/Library/Library'
import MainContentBox from '@components/MainContentBox/MainContentBox'
import { DailyPlannerContainer } from '@pages/Library/LibraryPage.style'

export default function LibraryPage() {
  return (
    <DailyPlannerContainer>
      <MainContentBox content={<Library />} />
    </DailyPlannerContainer>
  )
}
