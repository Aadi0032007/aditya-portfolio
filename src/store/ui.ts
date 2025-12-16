import { create } from 'zustand';

export type SectionId = 'hero' | 'summary' | 'education' | 'achievements' | 'experience' | 'projects' | 'skills' | 'contact';

interface UIState {
  activeSection: SectionId;
  setActiveSection: (id: SectionId) => void;
  pointer: { x: number; y: number };
  setPointer: (x: number, y: number) => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeSection: 'hero',
  setActiveSection: (id) => set({ activeSection: id }),
  pointer: { x: 0, y: 0 },
  setPointer: (x, y) => set({ pointer: { x, y } }),
  theme: 'dark',
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
    }
    return { theme: newTheme };
  })
}));
