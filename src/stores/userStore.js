import { create } from 'zustand'

const useUserStore = create((set) => ({
  user: {
    id: '',
    password: '',
    profileImage: null,
    name: '', //유저 네임 추가
  },
  // db에 저장되어있는 임의의 사용자 데이터로 가정해놨습니다.
  dummyUser: {
    id: 'no2jfamily@naver.com',
    password: '123123',
    profileImage: null,
    name: '정준영',
  },
  setUser: (newUser) => set({ user: newUser }),
  login: () => {
    set((state) => ({ user: state.user }))
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
