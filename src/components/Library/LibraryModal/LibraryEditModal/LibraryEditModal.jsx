import {
  BookInfoContainer,
  CloseButton,
  InputLabel,
  Line,
  ModalButton,
  ModalButtonContainer,
  ModalContainer,
  ModalContent,
  ModalInput,
  ModalLayout,
  ModalPageInput,
  PagesInfoContainer,
  ProgressContainer,
} from '@components/Library/LibraryModal/LibraryEditModal/LibraryEditModal.style'
import workbookContentStore from '@stores/workbookContentStore'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import { useEffect, useRef, useState } from 'react'
import { Bar } from 'react-chartjs-2'
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

import deleteBook from '@apis/book/deleteBook'
import { ModalPageInputBox } from '@components/Library/LibraryModal/LibraryAddModal/LibraryAddModal.style'
import useCalculateProgressColor from '@hooks/useCalculateProgressColor'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export default function LibraryEditModal({ workbook, onClose, workbookIndex }) {
  const updateWorkbook = workbookContentStore((state) => state.updateWorkbook)
  const removeWorkbook = workbookContentStore((state) => state.removeWorkbook)

  const [updatedBookName, setUpdatedBookName] = useState(workbook.title || '')
  const [updatedSubject, setUpdatedSubject] = useState(workbook.subject || '')
  const [goalPages, setGoalPages] = useState(workbook.end_page || 0)
  const [studiedPages, setStudiedPages] = useState(workbook.start_page || 0) // 공부한 페이지 수
  const [progress, setProgress] = useState(workbook.progress || 0)

  const nameInputRef = useRef(null)
  const subjectInputRef = useRef(null)
  const goalPagesRef = useRef(null)
  const studiedPagesRef = useRef(null)

  useEffect(() => {
    if (workbook) {
      setUpdatedBookName(workbook.title || '')
      setUpdatedSubject(workbook.subject || '')
    }
  }, [workbook])

  useEffect(() => {
    // 성취도 계산 함수
    const calculateProgress = () => {
      const startPage = parseInt(studiedPages || 0, 10)
      const endPage = parseInt(goalPages || 0, 10)
      setGoalPages(endPage)
      setStudiedPages(startPage)

      if (startPage > endPage) {
        return 0
      }

      return endPage > 0
        ? Math.min(Math.round((startPage / endPage) * 100), 100)
        : 0
    }

    setProgress(calculateProgress())
  }, [goalPages, studiedPages])

  const handleUpdateWorkbook = () => {
    const updatedWorkbook = {
      ...workbook,
      title: updatedBookName,
      subject: updatedSubject,
      end_page: goalPages, // 필드 이름 확인
      start_page: studiedPages, // 필드 이름 확인
      progress,
    }

    updateWorkbook(workbookIndex, updatedWorkbook)
    onClose()
  }

  const handleWorkBookDelete = async () => {
    try {
      await deleteBook(workbook.id)
      removeWorkbook(workbookIndex)
      onClose() // 모달 닫기
    } catch (error) {
      console.error('Failed to delete the workbook:', error)
    }
  }

  const handleKeyDown = (e, ref) => {
    if (e.key === 'Enter') {
      ref.current.blur() // Enter 키를 누르면 해당 input의 포커스 해제
    }
  }

  const data = {
    labels: ['진행률'],
    datasets: [
      {
        label: '주간 진행률',
        data: [workbook.progress], // Y축 데이터, 처음엔 하나만
        backgroundColor: [useCalculateProgressColor(workbook.progress)],
      },
    ],
  }

  const options = {
    responsive: true, // 반응형 설정
    maintainAspectRatio: false, // 가로 세로 비율 유지 해제
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // X축 격자선 제거
        },
      },
      y: {
        ticks: {
          beginAtZero: true, // Y축이 0부터 시작하도록 설정
          callback: (value) => `${value}%`,
        },
        max: 100,
      },
    },
    barThickness: 20, // 막대 두께 설정
  }

  return (
    <ModalContainer>
      <ModalLayout>
        <CloseButton onClick={onClose}>×</CloseButton>
        <ModalContent>
          <ProgressContainer>
            {/* 성취도 표시 */}
            <CircularProgressbar
              value={progress}
              text={`${progress}%`}
              styles={buildStyles({
                pathColor: useCalculateProgressColor(progress), // 진행도 색상
                textColor: '#000',
                trailColor: '#d6d6d6', // 남은 진행도 색상
                textSize: '1.5rem',
              })}
            />
          </ProgressContainer>
          <BookInfoContainer>
            <ModalPageInputBox>
              <InputLabel>교재 이름</InputLabel>
              <ModalInput
                type="text"
                value={updatedBookName}
                onChange={(e) => setUpdatedBookName(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, nameInputRef)}
                placeholder="교재 이름을 입력하세요"
                ref={nameInputRef}
              />
            </ModalPageInputBox>

            <ModalPageInputBox>
              <InputLabel>과목</InputLabel>
              <ModalInput
                type="text"
                value={updatedSubject}
                onChange={(e) => setUpdatedSubject(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, subjectInputRef)}
                placeholder="과목 이름을 입력하세요"
                ref={subjectInputRef}
              />
            </ModalPageInputBox>
          </BookInfoContainer>
          <PagesInfoContainer>
            <InputLabel>시작 페이지</InputLabel>
            <ModalPageInput
              type="number"
              value={studiedPages}
              onChange={(e) => setStudiedPages(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, studiedPagesRef)}
              ref={studiedPagesRef}
            />
            <InputLabel>마지막 페이지</InputLabel>
            <ModalPageInput
              type="number"
              value={goalPages}
              onChange={(e) => setGoalPages(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, goalPagesRef)}
              ref={goalPagesRef}
            />
          </PagesInfoContainer>
        </ModalContent>
        <Line />
        <div style={{ width: '100%', height: '300px' }}>
          <Bar data={data} options={options} />
        </div>
        <ModalButtonContainer>
          <ModalButton onClick={handleUpdateWorkbook}>수정완료</ModalButton>
          <ModalButton
            onClick={handleWorkBookDelete}
            style={{ backgroundColor: 'red' }}
          >
            삭제
          </ModalButton>
        </ModalButtonContainer>
      </ModalLayout>
    </ModalContainer>
  )
}
