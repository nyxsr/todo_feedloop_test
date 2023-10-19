import { create } from 'zustand'

export const useToggleAdd = create((set) => ({
  toggleAdd: false,
  activeToggle: () => set(() => ({ toggleAdd:true })),
  disableToggle: () => set({ toggleAdd: false }),
}))