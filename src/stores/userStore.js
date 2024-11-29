import { create } from 'zustand'

const useUserStore = create((set) => ({
  user: {
    id: '',
    userid: '',
    username: '',
    email: '',
    soundSetting: 0, // sound_setting 기본값
  },
  setUser: (newUser) => set({ user: newUser }),
  login: (userData) => {
    set(() => ({ user: userData })) // 로그인 시 상태 업데이트
  },
  logout: () =>
    set({
      user: {
        id: '',
        userid: '',
        username: '',
        email: '',
        soundSetting: 0,
      },
    }),
}))

export default useUserStore
