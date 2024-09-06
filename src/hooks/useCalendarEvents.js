import calendarEventStore from '@stores/calendarEventStore'
import { useState } from 'react'

export default function useCalendarEvents() {
  const { events, addEvent, removeEvent, updateEvent } = calendarEventStore()
  const [isFirstEventAdded, setIsFirstEventAdded] = useState(false)

  const addCalendarEvent = (event) => {
    addEvent(event)
    if (!isFirstEventAdded) {
      setIsFirstEventAdded(true)
    }
  }

  return {
    events,
    addCalendarEvent,
    removeEvent,
    updateEvent,
    isFirstEventAdded,
    setIsFirstEventAdded,
  }
}
