import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { ThemeVariants } from '@/shared';

interface SettingsType {
  alwaysOnTop: boolean;
  isMinimalUI: boolean;
  maxCharToShow: number;
  mergeDuplicates: boolean;
  autoClear: boolean;
  showButtonStroke: boolean;
}

interface StoreType {
  settings: SettingsType;
  setSettings: (settings: SettingsType) => void;

  theme: ThemeVariants;
  setTheme: (theme: ThemeVariants) => void;
}

export const useStore = create<StoreType>()(
  persist(
    (set) => ({
      settings: {
        alwaysOnTop: true,
        isMinimalUI: false,
        maxCharToShow: 5,
        mergeDuplicates: true,
        autoClear: false,
        showButtonStroke: true,
      },
      setSettings: (settings) => set({ settings }),

      theme: 'dark',
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'app-storage' },
  ),
);
