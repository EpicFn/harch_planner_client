import { create } from 'zustand'

const calendarEventStore = create((set) => ({
  events: [],
  addEvent: (newEvent) =>
    set((state) => ({ events: [...state.events, newEvent] })),
  updateEvent: (updatedEvent) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event,
      ),
    })),
  removeEvent: (eventId) =>
    set((state) => ({
      events: state.events.filter((event) => event.id !== eventId), // ID 기준으로 삭제
    })),
}))

export default calendarEventStore
