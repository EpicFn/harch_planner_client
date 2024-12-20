// src/hooks/useMonthlyGoalOperations.js

import monthlyGoalAdd from '@apis/calendar/monthlyGoalAdd'
import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'

export default function useMonthlyGoalOperations({
  currentYear,
  currentMonth,
  monthGoalList,
  setMonthGoalList,
  setEditingGoal,
  goalRefs,
}) {
  const queryClient = useQueryClient()

  // 월간목표 추가
  const handleAddMonthGoal = useCallback(async () => {
    let updatedGoals = [] // 초기화
    try {
      const newGoal = `목표를 입력해주세요`
      updatedGoals = [...monthGoalList, newGoal]

      await monthlyGoalAdd({
        year: currentYear,
        month: currentMonth,
        goal: updatedGoals,
      })

      setMonthGoalList(updatedGoals)

      queryClient.setQueryData(
        ['monthlyGoals', currentYear, currentMonth],
        updatedGoals,
      )
    } catch (error) {
      console.error('Failed to add monthly goal:', error)
    }
  }, [currentYear, currentMonth, monthGoalList, queryClient, setMonthGoalList])

  // 월간목표 수정
  const handleEditMonthGoal = useCallback(
    (index) => {
      const goalText = monthGoalList[index]
      setEditingGoal({ index, text: goalText })

      setTimeout(() => {
        if (goalRefs.current[index]) {
          goalRefs.current[index].focus() // 편집 모드에서 포커스 설정
        }
      }, 0)
    },
    [monthGoalList, setEditingGoal, goalRefs],
  )

  // 월간목표 저장
  const handleSaveGoal = useCallback(
    async (index) => {
      const currentRef = goalRefs.current[index]

      if (currentRef && currentRef.textContent) {
        const updatedGoals = [...monthGoalList]
        updatedGoals[index] = currentRef.textContent

        try {
          await monthlyGoalAdd({
            year: currentYear,
            month: currentMonth,
            goal: updatedGoals,
          })

          setMonthGoalList(updatedGoals)
          setEditingGoal({ index: null, text: '' })

          queryClient.setQueryData(
            ['monthlyGoals', currentYear, currentMonth],
            updatedGoals,
          )
        } catch (error) {
          console.error('Failed to save goal:', error)
        }
      }
    },
    [
      currentYear,
      currentMonth,
      goalRefs,
      monthGoalList,
      queryClient,
      setMonthGoalList,
      setEditingGoal,
    ],
  )

  // 월간목표 삭제
  const handleDeleteGoal = useCallback(
    async (e, index) => {
      e.stopPropagation()
      const updatedGoals = monthGoalList.filter((_, i) => i !== index)

      try {
        await monthlyGoalAdd({
          year: currentYear,
          month: currentMonth,
          goal: updatedGoals,
        })

        setMonthGoalList(updatedGoals)

        queryClient.setQueryData(
          ['monthlyGoals', currentYear, currentMonth],
          updatedGoals,
        )
      } catch (error) {
        console.error('Failed to delete goal:', error)
      }
    },
    [currentYear, currentMonth, monthGoalList, queryClient, setMonthGoalList],
  )

  // 월간목표 텍스트 변경
  const handleGoalTextChange = useCallback(
    (index) => {
      if (goalRefs.current[index]) {
        setEditingGoal((prev) => ({
          ...prev,
          text: goalRefs.current[index].textContent,
        }))
      }
    },
    [setEditingGoal, goalRefs],
  )

  return {
    handleAddMonthGoal,
    handleEditMonthGoal,
    handleSaveGoal,
    handleDeleteGoal,
    handleGoalTextChange,
  }
}
