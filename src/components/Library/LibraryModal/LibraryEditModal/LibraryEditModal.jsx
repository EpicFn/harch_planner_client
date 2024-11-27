import fetchSubjects from '@apis/subject/fetchSubject'
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
import { FormControl, MenuItem, Select } from '@mui/material'
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

export default function LibraryEditModal({ workbook, onClose }) {
  const updateWorkbook = workbookContentStore((state) => state.updateWorkbook)
  const removeWorkbook = workbookContentStore((state) => state.removeWorkbook)

  const [updatedBookName, setUpdatedBookName] = useState(workbook.title || '')

  //DropDown menu 가공을 위한 상태값
  const [updatedSubject, setUpdatedSubject] = useState(null)
  const [currentSubject, setCurrentSubject] = useState(workbook.subject || '')

  const [goalPages, setGoalPages] = useState(workbook.end_page || 0)
  const [studiedPages, setStudiedPages] = useState(workbook.start_page || 0) // 공부한 페이지 수
  const [progress, setProgress] = useState(workbook.progress || 0)

  const [subjectList, setSubjectList] = useState([])
  console.log(subjectList)

  const nameInputRef = useRef(null)
  const goalPagesRef = useRef(null)
  const studiedPagesRef = useRef(null)

  //과목 색상 리스트 반환 API
  useEffect(() => {
    const loadSubjects = async () => {
      try {
        const data = await fetchSubjects()
        setSubjectList(data)
      } catch (error) {
        console.error('Failed to load subjects:', error)
      }
    }

    loadSubjects()
  }, [])

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
      subject: updatedSubject || currentSubject,
      end_page: goalPages, // 필드 이름 확인
      start_page: studiedPages, // 필드 이름 확인
      progress,
    }

    updateWorkbook(workbook.id, updatedWorkbook)
    onClose()
  }

  const handleWorkBookDelete = async () => {
    try {
      await deleteBook(workbook.id)
      removeWorkbook(workbook.id)
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

  const handleSubjectChange = (event) => {
    const selectedSubject = subjectList.find(
      (item) => item.title === event.target.value,
    )
    //mui dropdown 메뉴에 객체는 안되서 단일값으로 세팅
    setUpdatedSubject(selectedSubject.title)
  }

  const data = {
    labels: ['진행률'],
    datasets: [
      {
        label: '진행률',
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

            <FormControl
              fullWidth
              style={{
                marginTop: '20px',
                width: '100%',
                alignItems: 'flex-start',
              }}
            >
              <InputLabel id="subject-select-label">과목 선택</InputLabel>
              <Select
                labelId="subject-select-label"
                value={updatedSubject || currentSubject || ''}
                onChange={handleSubjectChange}
                displayEmpty
                style={{
                  backgroundColor: '#fff',
                  width: '100%',
                  marginTop: '10px',
                }}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 200, // 드롭다운 최대 높이 (픽셀)
                      overflow: 'auto',
                      scrollbarWidth: 'thin',
                    },
                  },
                  sx: {
                    '&::-webkit-scrollbar': {
                      width: '12px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: 'linear-gradient(180deg, #c4c4c4, #8e8e8e)',
                      borderRadius: '10px',
                      border: '2px solid transparent',
                      backgroundClip: 'content-box',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                      background: 'linear-gradient(180deg, #b0b0b0, #7a7a7a)',
                    },
                    '&::-webkit-scrollbar-track': {
                      backgroundColor: '#e0e0e0',
                      borderRadius: '10px',
                    },
                  },
                }}
              >
                {subjectList.map((item) => (
                  <MenuItem key={item.id} value={item.title}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <div
                        style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          backgroundColor: item.color,
                          marginRight: '8px',
                        }}
                      ></div>
                      {item.title}
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
