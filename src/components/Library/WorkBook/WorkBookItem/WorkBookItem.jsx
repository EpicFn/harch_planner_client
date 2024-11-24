import { useEffect, useState } from 'react'

import {
  BookInfo,
  BookSubject,
  BookTitle,
  DateText,
  StyledWorkbookItem,
} from '@components/Library/WorkBook/WorkBookItem/WorkBookItem.style'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export default function WorkbookItem({ workbook, onClick, status }) {
  const [animatedProgress, setAnimatedProgress] = useState(0)

  const progressColor = (progress) => {
    if (progress < 30) return '#ff6b6b'
    if (progress < 70) return '#ffca3a'
    return '#8ac926'
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedProgress(workbook.progress)
    }, 300) // 300ms 후에 실제 progress 값으로 전환

    return () => clearTimeout(timeout)
  }, [workbook.progress])

  return (
    <StyledWorkbookItem onClick={onClick} status={status}>
      <div
        style={{
          width: 80,
          height: 80,
          backgroundColor: 'white',
          borderRadius: '50%',
        }}
      >
        <CircularProgressbar
          value={animatedProgress}
          text={`${animatedProgress}%`}
          styles={buildStyles({
            pathColor: progressColor(animatedProgress), // 진행도 색상
            textColor: '#000',
            trailColor: '#d6d6d6', // 남은 진행도 색상
            textSize: '1.5rem',
            pathTransitionDuration: 0.5,
          })}
          round={true}
          strokeWidth={10}
        />
      </div>
      <BookInfo>
        <BookTitle>{workbook.title}</BookTitle>
        <BookSubject>{workbook.subject}</BookSubject>
        <DateText>{workbook.date}</DateText>
      </BookInfo>
    </StyledWorkbookItem>
  )
}
