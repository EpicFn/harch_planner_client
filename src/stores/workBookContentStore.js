import { create } from 'zustand'

const workBookContentStore = create((set) => ({
  workbooks: [],
  setWorkbooks: (newWorkbooks) => set({ workbooks: newWorkbooks }),
  addWorkbook: (newWorkbook) =>
    set((state) => ({
      workbooks: [...state.workbooks, newWorkbook],
    })),
  updateWorkbook: (index, updatedWorkbook) =>
    set((state) => {
      const newWorkbooks = [...state.workbooks]
      newWorkbooks[index] = updatedWorkbook
      return { workbooks: newWorkbooks }
    }),
  removeWorkbook: (index) =>
    set((state) => {
      const newWorkbooks = state.workbooks.filter((_, i) => i !== index)
      return { workbooks: [...newWorkbooks] }
    }),
}))

export default workBookContentStore
