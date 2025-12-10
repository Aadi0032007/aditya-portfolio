import { create } from 'zustand';

export type SectionId = 'hero' | 'summary' | 'experience' | 'projects' | 'skills' | 'contact';

interface UIState {
  activeSection: SectionId;
  pointer: { x: number; y: number };
  setActiveSection: (section: SectionId) => void;
  setPointer: (x: number, y: number) => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeSection: 'hero',
  pointer: { x: 0, y: 0 },
  setActiveSection: (activeSection) => set({ activeSection }),
  setPointer: (x, y) => set({ pointer: { x, y } })
}));
