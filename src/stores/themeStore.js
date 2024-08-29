import { create } from 'zustand'

const useThemeStore = create((set) => ({
  theme: '#E1E1E1',
  setTheme: (newTheme) => set(() => ({ theme: newTheme })),
}))

export default useThemeStore
