import { create } from 'zustand'

const useUserStore = create((set) => ({
  user: {
    id: '',
    password: '',
    profileImage: null,
    name: '', //유저 네임 추가
  },
  // 임의의 사용자 데이터를 일단 연동 전이라 설정해놨습니다
  dummyUser: {
    id: 'no2jfamily@naver.com',
    password: '123123',
    profileImage: null,
    name: '정준영',
  },
  setUser: (newUser) => set({ user: newUser }),
  login: () => {
    set((state) => ({ user: state.dummyUser }))
  },
  logout: () =>
    set({
      user: {
        id: '',
        password: '',
        profileImage: null,
      },
    }),
}))

export default useUserStore
