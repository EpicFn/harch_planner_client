import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'default',
      setTheme: (newTheme) => set(() => ({ theme: newTheme })),
    }),
    {
      name: 'theme-storage', // 로컬 스토리지의 키 이름
      getStorage: () => localStorage, // 로컬 스토리지를 명시적으로 지정
    },
  ),
)

export default useThemeStore
