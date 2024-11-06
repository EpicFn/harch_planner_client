import {
  CloseButton,
  InputContainer,
  Line,
  ModalButton,
  ModalButtonContainer,
  ModalContainer,
  ModalContent,
  ModalInput,
  ModalLayout,
  ModalPageInput,
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

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export default function LibraryEditModal({ workbook, onClose, workbookIndex }) {
  const updateWorkbook = workbookContentStore((state) => state.updateWorkbook)
  const removeWorkbook = workbookContentStore((state) => state.removeWorkbook)

  const [updatedName, setUpdatedName] = useState(workbook.name || '')
  const [updatedSubject, setUpdatedSubject] = useState(workbook.subject || '')
  const [goalPages, setGoalPages] = useState(workbook.goalPages || 0)
  const [studiedPages, setStudiedPages] = useState(workbook.studiedPages) // 공부한 페이지 수
  const [progress, setProgress] = useState(workbook.progress || 0)

  const nameInputRef = useRef(null)
  const subjectInputRef = useRef(null)
  const goalPagesRef = useRef(null)
  const studiedPagesRef = useRef(null)

  useEffect(() => {
    if (workbook) {
      setUpdatedName(workbook.name || '')
      setUpdatedSubject(workbook.subject || '')
    }
  }, [workbook])

  useEffect(() => {
    // 성취도 계산 함수
    const calculateProgress = () => {
      const startPage = parseInt(studiedPages, 10)
      const endPage = parseInt(goalPages, 10)

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
      name: updatedName,
      subject: updatedSubject,
      goalPages,
      studiedPages,
      progress,
    }

    updateWorkbook(workbookIndex, updatedWorkbook)
    onClose()
  }

  const handleWorkBookDelete = () => {
    removeWorkbook(workbookIndex)
    onClose()
  }

  const handleKeyDown = (e, ref) => {
    if (e.key === 'Enter') {
      ref.current.blur() // Enter 키를 누르면 해당 input의 포커스 해제
    }
  }

  const data = {
    labels: [workbook.date], // X축 레이블
    datasets: [
      {
        label: '주간 진행률',
        data: [workbook.progress], // Y축 데이터, 처음엔 하나만
        backgroundColor: '#ff6b6b', // 막대 색상
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
        },
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
                pathColor: '#ff6b6b', // 진행도 색상
                textColor: '#000',
                trailColor: '#d6d6d6', // 남은 진행도 색상
                textSize: '1.5rem',
              })}
            />
          </ProgressContainer>
          <InputContainer>
            <ModalInput
              type="text"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, nameInputRef)}
              placeholder="문제집 이름을 입력하세요"
              ref={nameInputRef}
            />
            <ModalInput
              type="text"
              value={updatedSubject}
              onChange={(e) => setUpdatedSubject(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, subjectInputRef)}
              placeholder="과목 이름을 입력하세요"
              ref={subjectInputRef}
            />
          </InputContainer>
          <ModalPageInput
            type="number"
            value={studiedPages}
            onChange={(e) => setStudiedPages(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, studiedPagesRef)}
            ref={studiedPagesRef}
          />
          <ModalPageInput
            type="number"
            value={goalPages}
            onChange={(e) => setGoalPages(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, goalPagesRef)}
            ref={goalPagesRef}
          />
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
