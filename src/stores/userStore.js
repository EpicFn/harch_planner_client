import { create } from 'zustand'

const useUserStore = create((set) => ({
  user: {
    id: 'no2jfamily@naver.com',
    password: 'testpassword',
    profileImage: null,
  },
  setUser: (newUser) => set({ user: newUser }),
}))

export default useUserStore
