import { create } from 'zustand'

const workBookContentStore = create((set) => ({
  workbooks: [],
  setWorkbooks: (newWorkbooks) => set({ workbooks: newWorkbooks }),
  addWorkbook: (newWorkbook) =>
    set((state) => ({
      workbooks: [...state.workbooks, newWorkbook],
    })),
  updateWorkbook: (id, updatedWorkbook) =>
    set((state) => {
      const newWorkbooks = state.workbooks.map((workbook) =>
        workbook.id === id ? updatedWorkbook : workbook,
      )
      return { workbooks: newWorkbooks }
    }),
  removeWorkbook: (id) =>
    set((state) => {
      const newWorkbooks = state.workbooks.filter(
        (workbook) => workbook.id !== id,
      )
      return { workbooks: newWorkbooks }
    }),
}))

export default workBookContentStore
