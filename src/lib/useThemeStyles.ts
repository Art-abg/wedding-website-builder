import { useThemeStore } from '../store/themeStore';
import type { CSSProperties } from 'react';

export const useThemeStyles = (): CSSProperties => {
  const { getEffectiveTheme } = useThemeStore();
  const theme = getEffectiveTheme();

  return {
    '--color-primary': theme.colors.primary,
    '--color-secondary': theme.colors.secondary,
    '--color-background': theme.colors.background,
    '--color-surface': theme.colors.surface,
    '--color-text': theme.colors.text,
    '--color-muted': theme.colors.muted,
    '--color-border': theme.colors.border,
    
    '--font-heading': theme.fonts.heading,
    '--font-body': theme.fonts.body,
    '--font-accent': theme.fonts.accent,
    
    '--radius-button': theme.borderRadius.button,
    '--radius-card': theme.borderRadius.card,
    '--radius-image': theme.borderRadius.image,

    '--spacing-container': theme.spacing.containerPadding,
    '--spacing-section': theme.spacing.sectionGap,
  } as CSSProperties;
};
