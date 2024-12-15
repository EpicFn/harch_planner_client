// src/hooks/useCalendarEventOperations.js

import calendarAddEvent from '@apis/calendar/calendarAddEvent'
import { format } from 'date-fns'
import { useCallback } from 'react'

export default function useCalendarEventOperations({
  events,
  queryClient,
  currentYear,
  currentMonth,
  closeContextMenu,
  setIsEditing,
  setEditingEventId,
  newEventTitle,
  isNotificationVisible,
  setIsNotificationVisible,
}) {
  const handleAddEventSave = useCallback(
    async (title, memo, selectedDate) => {
      if (title && selectedDate) {
        try {
          const existingEvents = events.filter(
            (event) => event.date === selectedDate,
          )

          const updatedTaskList = [
            ...existingEvents.map((event) => ({
              title: event.title,
              memo: event.extendedProps.memo,
            })),
            {
              title,
              memo,
            },
          ]

          const eventData = {
            date: selectedDate,
            task_list: updatedTaskList,
          }

          await calendarAddEvent(eventData)

          if (isNotificationVisible === false) {
            setIsNotificationVisible(true)

            setTimeout(() => {
              setIsNotificationVisible(false)
            }, 3000)
          }
        } catch (error) {
          console.error('Error adding event:', error)
        } finally {
          queryClient.invalidateQueries([
            'calendarEvents',
            currentYear,
            currentMonth,
          ])
        }
      }
    },
    [events, queryClient, currentYear, currentMonth],
  )

  const handleSaveEditedEvent = useCallback(
    async (eventId) => {
      const targetEvent = events.find((event) => event.id === eventId)

      if (!targetEvent) {
        console.error('Target event not found for editing')
        return
      }

      const formattedDate = format(new Date(targetEvent.date), 'yyyy-MM-dd')
      const cachedData = queryClient.getQueryData([
        'calendarEvents',
        currentYear,
        currentMonth,
      ])
      if (!cachedData) {
        console.error('React Query 캐시에서 데이터를 가져오지 못했습니다.')
        return
      }

      const existingDayData = cachedData.find(
        (day) => day.date === formattedDate,
      ) || { task_list: [] }

      const updatedTaskList = existingDayData.task_list.map((task) =>
        task.title === targetEvent.title
          ? { ...task, title: newEventTitle }
          : task,
      )

      const updatedEventData = {
        date: formattedDate,
        task_list: updatedTaskList,
      }

      console.log('Updating event:', updatedEventData)

      try {
        await calendarAddEvent(updatedEventData)
        queryClient.setQueryData(
          ['calendarEvents', currentYear, currentMonth],
          (oldData) => {
            if (!oldData) return [updatedEventData]
            return oldData.map((day) =>
              day.date === formattedDate
                ? { ...day, task_list: updatedTaskList }
                : day,
            )
          },
        )
        setIsEditing(false)
        setEditingEventId(null)
      } catch (error) {
        console.error('Error updating event:', error)
        alert('일정을 수정하는 중 문제가 발생했습니다.')
      }
    },
    [
      events,
      queryClient,
      currentYear,
      currentMonth,
      newEventTitle,
      setIsEditing,
      setEditingEventId,
    ],
  )

  const handleDeleteEvent = useCallback(
    async (eventId) => {
      const targetEvent = events.find((event) => event.id === eventId)

      if (!targetEvent) {
        console.error('Target event not found for deletion.')
        alert('삭제하려는 이벤트를 찾을 수 없습니다.')
        return
      }

      const formattedDate = format(new Date(targetEvent.date), 'yyyy-MM-dd')

      try {
        queryClient.setQueryData(
          ['calendarEvents', currentYear, currentMonth],
          (oldData) => {
            if (!oldData) {
              console.error(
                'React Query 캐시에서 데이터를 가져오지 못했습니다.',
              )
              return []
            }

            const updatedDayData = oldData.map((day) => {
              if (day.date === formattedDate) {
                return {
                  ...day,
                  task_list: day.task_list.filter(
                    (task) => task.title !== targetEvent.title,
                  ),
                }
              }
              return day
            })

            return updatedDayData
          },
        )

        const updatedEventData = {
          date: formattedDate,
          task_list:
            queryClient
              .getQueryData(['calendarEvents', currentYear, currentMonth])
              ?.find((day) => day.date === formattedDate)?.task_list || [],
        }

        await calendarAddEvent(updatedEventData)
        console.log('Event successfully deleted.')
        closeContextMenu()
      } catch (error) {
        console.error('Error deleting event:', error)
        alert('이벤트 삭제 중 문제가 발생했습니다.')
      }
    },
    [events, queryClient, currentYear, currentMonth, closeContextMenu],
  )

  return {
    handleAddEventSave,
    handleSaveEditedEvent,
    handleDeleteEvent,
  }
}
