import { create } from 'zustand'

const loginModalStore = create((set) => ({
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}))

export default loginModalStore
