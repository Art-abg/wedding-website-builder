import { create } from 'zustand';
import type { Theme, ThemeOverride, ThemeFonts } from '../themes/types';
import { THEMES, DEFAULT_THEME_ID } from '../themes/presets';

interface ThemeState {
  currentThemeId: string;
  overrides: ThemeOverride;
  // Actions
  setThemeId: (id: string) => void;
  setPrimaryColor: (color: string) => void;
  setFonts: (fonts: Partial<ThemeFonts>) => void;
  resetUpdates: () => void;
  // Computed (helper)
  getEffectiveTheme: () => Theme;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  currentThemeId: DEFAULT_THEME_ID,
  overrides: {},

  setThemeId: (id) => set({ currentThemeId: id, overrides: {} }), // Reset overrides on theme switch? Maybe better to keep them? User requirement says "Override...". Usually switching presets resets customization. Let's reset for now.
  
  setPrimaryColor: (color) => set((state) => ({
    overrides: { ...state.overrides, primary: color }
  })),

  setFonts: (fonts) => set((state) => ({
    overrides: { 
      ...state.overrides, 
      fontHeading: fonts.heading || state.overrides.fontHeading,
      fontBody: fonts.body || state.overrides.fontBody
    }
  })),

  resetUpdates: () => set({ overrides: {} }),

  getEffectiveTheme: () => {
    const { currentThemeId, overrides } = get();
    const baseTheme = THEMES[currentThemeId] || THEMES[DEFAULT_THEME_ID];
    
    // Merge overrides
    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        ...overrides, // This works because overrides keys match ThemeColors partial keys
        // Need to be careful if overrides has keys not in ThemeColors directly (it doesn't, it is Partial<ThemeColors>)
      },
      fonts: {
        ...baseTheme.fonts,
        heading: overrides.fontHeading || baseTheme.fonts.heading,
        body: overrides.fontBody || baseTheme.fonts.body,
      }
    };
  }
}));
