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
      login: (inputId, inputPassword) => {
        set((state) => {
          if (
            inputId === state.dummyUser.id &&
            inputPassword === state.dummyUser.password
          ) {
            return { user: state.dummyUser } // 입력값이 일치하면 dummyUser로 설정
          } else {
            return state // 입력값이 일치하지 않으면 상태 변경하지 않음
          }
        })
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
