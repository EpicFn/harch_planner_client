import {
  BookInfo,
  BookSubject,
  BookTitle,
  DateText,
  ProgressCircle,
  StyledWorkBookItem,
} from '@components/Library/WorkBook/WorkBookItem/WorkBookItem.style'

export default function WorkBookItem({ workbook }) {
  return (
    <StyledWorkBookItem>
      <ProgressCircle>{workbook.progress}</ProgressCircle>
      <BookInfo>
        <BookTitle>{workbook.name}</BookTitle>
        <BookSubject>{workbook.subject}</BookSubject>
        <DateText>{workbook.date}</DateText>
      </BookInfo>
    </StyledWorkBookItem>
  )
}
