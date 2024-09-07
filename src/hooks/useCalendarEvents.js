import calendarEventStore from '@stores/calendarEventStore'
import { useState } from 'react'

export default function useCalendarEvents() {
  const { events, addEvent, removeEvent, updateEvent } = calendarEventStore(
    (state) => ({
      events: state.events,
      addEvent: state.addEvent,
      removeEvent: state.removeEvent,
      updateEvent: state.updateEvent,
    }),
  )
  const [isFirstEventAdded, setIsFirstEventAdded] = useState(false)
  //처음 등록하는지를 따지기위해 상태 설정

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
