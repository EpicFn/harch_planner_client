import { create } from 'zustand'

const calendarEventStore = create((set) => ({
  events: [],
  addEvent: (newEvent) =>
    set((state) => ({ events: [...state.events, newEvent] })),
  removeEvent: (eventDate) =>
    set((state) => ({
      events: state.events.filter((event) => event.date !== eventDate),
    })),
}))

export default calendarEventStore
