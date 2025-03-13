import MainContentBox from '@components/MainContentBox/MainContentBox'
import { DailyPlannerContainer } from './DailyPlannerPage.style'
import DailyPlanner from '@components/DailyPlanner/DailyPlanner'
import { useParams } from 'react-router-dom'

export default function DailyPlannerPage() {

  const { date } = useParams();

  let dateObj;

  if (date) {
    const [year, month, day] = date.split('-');
    dateObj = new Date(year, month - 1, day);
  }

  else {
    dateObj = new Date();
  }


  return (
    <DailyPlannerContainer>
      <MainContentBox content={<DailyPlanner dateObj={dateObj} />} />
    </DailyPlannerContainer>
  )
}
