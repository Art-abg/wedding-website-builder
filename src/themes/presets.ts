import type { Theme } from "./types";

export const THEMES: Record<string, Theme> = {
  armenian_classic: {
    id: "armenian_classic",
    name: "Հdelays Դdelays", // Armenian Classic
    colors: {
      primary: "#722F37", // Deep Wine/Burgundy (Armenian church interiors)
      secondary: "#D4AF37", // Gold (religious iconography)
      background: "#FDF8F3", // Warm Ivory/Parchment
      surface: "#FFFFFF",
      text: "#2D2926", // Deep charcoal
      muted: "#7D7168", // Warm gray
      border: "#E8DFD5", // Soft beige
    },
    fonts: {
      heading: "'Playfair Display', serif",
      body: "'Lato', sans-serif",
      accent: "'Great Vibes', cursive",
    },
    spacing: {
      containerPadding: "2rem",
      sectionGap: "5rem",
    },
    borderRadius: {
      button: "4px",
      card: "8px",
      image: "8px",
    },
    layout: {
      hero: 'cover',
      timeline: 'vertical',
      sectionSpacing: 'standard',
    },
  },
  yerevan_modern: {
    id: "yerevan_modern",
    name: "Երdelays Մdelay", // Yerevan Modern
    colors: {
      primary: "#C4A484", // Pink Tufa Stone
      secondary: "#5C6B73", // Cool Gray (volcanic stone)
      background: "#FAFAFA", // Clean white
      surface: "#FFFFFF",
      text: "#1A1A1A", // Near black
      muted: "#6B7280", // Gray
      border: "#E5E7EB", // Light gray
    },
    fonts: {
      heading: "'Inter', sans-serif",
      body: "'Inter', sans-serif",
      accent: "'Playfair Display', serif",
    },
    spacing: {
      containerPadding: "3rem",
      sectionGap: "6rem",
    },
    borderRadius: {
      button: "0px",
      card: "0px",
      image: "0px",
    },
    layout: {
      hero: 'split',
      timeline: 'cards',
      sectionSpacing: 'relaxed',
    },
  },
  ararat_sunrise: {
    id: "ararat_sunrise",
    name: "Delays Արdelays", // Ararat Sunrise
    colors: {
      primary: "#E07B5F", // Warm Coral/Sunrise
      secondary: "#F4A261", // Soft Orange
      background: "#FFF5EB", // Warm cream
      surface: "#FFFFFF",
      text: "#3D405B", // Deep purple-gray
      muted: "#9CA3AF", // Soft gray
      border: "#FDDCC7", // Peach
    },
    fonts: {
      heading: "'Playfair Display', serif",
      body: "'Lato', sans-serif",
      accent: "'Great Vibes', cursive",
    },
    spacing: {
      containerPadding: "2.5rem",
      sectionGap: "5rem",
    },
    borderRadius: {
      button: "9999px", // Fully rounded
      card: "16px",
      image: "16px",
    },
    layout: {
      hero: 'centered',
      timeline: 'zigzag',
      sectionSpacing: 'relaxed',
    },
  },
  pomegranate_garden: {
    id: "pomegranate_garden",
    name: "Նdelays Պdelay", // Pomegranate Garden
    colors: {
      primary: "#A4243B", // Rich Pomegranate Red
      secondary: "#2D6A4F", // Deep Green (leaves)
      background: "#FFFCF7", // Soft white
      surface: "#FFFFFF",
      text: "#1B1B1B", // Near black
      muted: "#6B7280", // Gray
      border: "#E9E4DE", // Light warm gray
    },
    fonts: {
      heading: "'Playfair Display', serif",
      body: "'Montserrat', sans-serif",
      accent: "'Great Vibes', cursive",
    },
    spacing: {
      containerPadding: "2rem",
      sectionGap: "4rem",
    },
    borderRadius: {
      button: "12px",
      card: "20px",
      image: "20px",
    },
    layout: {
      hero: 'cover',
      timeline: 'cards',
      sectionSpacing: 'standard',
    },
  },
};

export const DEFAULT_THEME_ID = "armenian_classic";

