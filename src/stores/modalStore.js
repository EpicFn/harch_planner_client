import { create } from 'zustand'

const ModalStore = create((set) => ({
  isLoginModalOpen: false,
  isSignupModalOpen: false,
  openLoginModal: () => set({ isLoginModalOpen: true }),
  openSignupModal: () =>
    set({ isSignupModalOpen: true, isLoginModalOpen: false }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),
  closeSignupModal: () => set({ isSignupModalOpen: false }),
}))

export default ModalStore
