
export type FontFamily = string;

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
  border: string;
}

export interface ThemeFonts {
  heading: FontFamily;
  body: FontFamily;
  accent: FontFamily;
}

export interface ThemeSpacing {
  containerPadding: string;
  sectionGap: string;
}

export interface ThemeBorderRadius {
  button: string;
  card: string;
  image: string;
}

export interface ThemeLayout {
  hero: 'centered' | 'split' | 'cover';
  timeline: 'vertical' | 'zigzag' | 'cards';
  sectionSpacing: 'compact' | 'standard' | 'relaxed';
}

export interface Theme {
  id: string;
  name: string;
  colors: ThemeColors;
  fonts: ThemeFonts;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
  layout: ThemeLayout;
  // Visual characteristics for the selector card
  previewImage?: string; 
}

export type ThemeOverride = Partial<ThemeColors> & {
  fontHeading?: FontFamily;
  fontBody?: FontFamily;
};
