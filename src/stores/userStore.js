import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useUserStore = create(
  persist(
    (set) => ({
      user: {
        id: '',
        password: '',
        profileImage: null,
        name: '', // 유저 네임 추가
      },
      dummyUser: {
        id: 'no2jfamily@naver.com',
        password: '123123',
        profileImage: null,
        name: '정준영',
      },
      setUser: (newUser) => set({ user: newUser }),
      login: () => {
        set((state) => ({ user: state.dummyUser })) // 로그인하면 dummyUser를 유저로 설정
      },
      logout: () =>
        set({
          user: {
            id: '',
            password: '',
            profileImage: null,
            name: '', // 로그아웃 시 유저 정보 초기화
          },
        }),
    }),
    {
      name: 'user-storage', // 로컬 스토리지에 저장될 키
      getStorage: () => localStorage, // 기본적으로 localStorage에 저장되도록 설정
    },
  ),
)

export default useUserStore
