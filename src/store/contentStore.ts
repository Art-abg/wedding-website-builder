import { create } from 'zustand';

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  image?: string;
}

export interface TravelItem {
  id: string;
  name: string;
  address: string;
  websiteUrl: string;
  bookingNote: string;
  imageUrl?: string;
}

export interface RegistryItem {
  id: string;
  name: string;
  price: string;
  purchaseUrl: string;
  imageUrl?: string;
  isCashFund: boolean;
}

export interface WeddingPartyMember {
  id: string;
  name: string;
  role: 'kavor' | 'kavort' | 'bestman' | 'bridesmaid' | 'groomsman' | 'other';
  photo?: string;
  description?: string;
}

export interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  location: string;
  type: 'church' | 'reception' | 'party' | 'other';
  description?: string;
  customLogo?: string;
}

export interface SiteContent {
  names: string;
  date: string;
  location: string;
  blessing: string;
  hero: {
    headline: string;
    subheadline: string;
    backgroundImage: string;
    layoutMode: 'centered' | 'split' | 'cover';
  };
  ceremony: {
    churchName: string;
    address: string;
    time: string;
    notes: string;
  };
  reception: {
    venueName: string;
    address: string;
    time: string;
    notes: string;
  };
  weddingParty: WeddingPartyMember[];
  schedule: ScheduleItem[];
  story: TimelineEvent[];
  travel: TravelItem[];
  registry: RegistryItem[];
  sectionLayouts: {
    hero: 'centered' | 'cover' | 'split';
    timeline: 'vertical' | 'zigzag' | 'cards';
    weddingParty: 'grid' | 'carousel';
  };
  registryUrl: string;
  rsvpDeadline: string;
  audio: {
    trackUrl: string;
    isPlaying: boolean;
    volume: number;
  };
  sectionVisibility: {
    hero: boolean;
    ceremony: boolean;
    reception: boolean;
    weddingParty: boolean;
    story: boolean;
    schedule: boolean;
    travel: boolean;
    registry: boolean;
    rsvp: boolean;
  };
}

interface ContentState {
  content: SiteContent;
  updateContent: (updates: Partial<SiteContent>) => void;
  updateHero: (updates: Partial<SiteContent['hero']>) => void;
  updateCeremony: (updates: Partial<SiteContent['ceremony']>) => void;
  updateReception: (updates: Partial<SiteContent['reception']>) => void;
  updateStoryEvent: (id: string, updates: Partial<TimelineEvent>) => void;
  addStoryEvent: () => void;
  removeStoryEvent: (id: string) => void;
  addPartyMember: () => void;
  removePartyMember: (id: string) => void;
  updatePartyMember: (id: string, updates: Partial<WeddingPartyMember>) => void;
  addHotel: () => void;
  removeHotel: (id: string) => void;
  updateHotel: (id: string, updates: Partial<TravelItem>) => void;
  addRegistryItem: () => void;
  removeRegistryItem: (id: string) => void;
  updateRegistryItem: (id: string, updates: Partial<RegistryItem>) => void;
  updateAudio: (updates: Partial<SiteContent['audio']>) => void;
  toggleSection: (section: keyof SiteContent['sectionVisibility']) => void;
  addScheduleItem: () => void;
  removeScheduleItem: (id: string) => void;
  updateScheduleItem: (id: string, updates: Partial<ScheduleItem>) => void;
  updateSectionLayout: (section: keyof SiteContent['sectionLayouts'], layout: string) => void;
}

const DEFAULT_CONTENT: SiteContent = {
  names: "Աdelays & Դdelays",
  date: "Հdelays 24, 2026",
  location: "Երdelays, Հայdelays",
  blessing: "Մdelays բdelays delays մեdelays",
  hero: {
    headline: "Աdelays & Delays",
    subheadline: "Մenq պdelays enq",
    backgroundImage: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
    layoutMode: "cover"
  },
  ceremony: {
    churchName: "Սdelay Grigdelays",
    address: "Yeznik Koghbatsi St, Yerevan",
    time: "14:00",
    notes: "Crowning ceremony at 2pm"
  },
  reception: {
    venueName: "Ararat Hall",
    address: "Northern Ave, Yerevan",
    time: "18:00",
    notes: "Cocktails 6pm, Dinner 7pm"
  },
  weddingParty: [
    { id: "k1", name: "Armen Petrosyan", role: "kavor", description: "Our beloved Kavor" }
  ],
  schedule: [
    { id: "s1", time: "14:00", title: "Crowning Ceremony", location: "St. Gayane Church", type: "church", description: "The holy sacrament of marriage." },
    { id: "s2", time: "18:00", title: "Reception", location: "Dvin Hall", type: "reception", description: "Dinner, dancing, and celebration." }
  ],
  story: [
    { id: "1", year: "2020", title: "First Meeting", description: "We met at a friend's wedding.", image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop" },
    { id: "2", year: "2023", title: "Khosk-Arnel", description: "David's family came to ask for Anna's hand.", image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=2070&auto=format&fit=crop" },
    { id: "3", year: "2024", title: "Engagement", description: "Nshan ceremony at Cascade." }
  ],
  travel: [
    { id: "t1", name: "Marriott Yerevan", address: "Republic Square", websiteUrl: "#", bookingNote: "Code: WEDDING26", imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80" }
  ],
  registry: [
    { id: "r1", name: "Honeymoon Fund", price: "", purchaseUrl: "#", isCashFund: true, imageUrl: "https://images.unsplash.com/photo-1520970014086-2208d157e9e2?auto=format&fit=crop&q=80" }
  ],
  registryUrl: "",
  rsvpDeadline: "September 1, 2026",
  audio: { trackUrl: "", isPlaying: false, volume: 0.5 },
  sectionVisibility: { hero: true, ceremony: true, reception: true, weddingParty: true, story: true, schedule: true, travel: true, registry: true, rsvp: true },
  sectionLayouts: { hero: 'centered', timeline: 'vertical', weddingParty: 'grid' }
};

export const useContentStore = create<ContentState>((set) => ({
  content: DEFAULT_CONTENT,
  updateContent: (updates) => set((state) => ({ content: { ...state.content, ...updates } })),
  updateHero: (updates) => set((state) => ({ content: { ...state.content, hero: { ...state.content.hero, ...updates } } })),
  updateCeremony: (updates) => set((state) => ({ content: { ...state.content, ceremony: { ...state.content.ceremony, ...updates } } })),
  updateReception: (updates) => set((state) => ({ content: { ...state.content, reception: { ...state.content.reception, ...updates } } })),
  updateStoryEvent: (id, updates) => set((state) => ({
    content: { ...state.content, story: state.content.story.map(e => e.id === id ? { ...e, ...updates } : e) }
  })),
  addStoryEvent: () => set((state) => ({
    content: { ...state.content, story: [...state.content.story, { id: Math.random().toString(36).substr(2, 9), year: "Year", title: "New Event", description: "" }] }
  })),
  removeStoryEvent: (id) => set((state) => ({ content: { ...state.content, story: state.content.story.filter(e => e.id !== id) } })),
  addPartyMember: () => set((state) => ({
    content: { ...state.content, weddingParty: [...state.content.weddingParty, { id: Math.random().toString(36).substr(2, 9), name: "Name", role: "other", description: "" }] }
  })),
  removePartyMember: (id) => set((state) => ({ content: { ...state.content, weddingParty: state.content.weddingParty.filter(m => m.id !== id) } })),
  updatePartyMember: (id, updates) => set((state) => ({
    content: { ...state.content, weddingParty: state.content.weddingParty.map(m => m.id === id ? { ...m, ...updates } : m) }
  })),
  addHotel: () => set((state) => ({
    content: { ...state.content, travel: [...state.content.travel, { id: Math.random().toString(36).substr(2, 9), name: "Hotel", address: "", websiteUrl: "", bookingNote: "", imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80" }] }
  })),
  removeHotel: (id) => set((state) => ({ content: { ...state.content, travel: state.content.travel.filter(h => h.id !== id) } })),
  updateHotel: (id, updates) => set((state) => ({
    content: { ...state.content, travel: state.content.travel.map(h => h.id === id ? { ...h, ...updates } : h) }
  })),
  addRegistryItem: () => set((state) => ({
    content: { ...state.content, registry: [...state.content.registry, { id: Math.random().toString(36).substr(2, 9), name: "Gift", price: "$100", purchaseUrl: "#", isCashFund: false, imageUrl: "https://images.unsplash.com/photo-1512909481869-0eaa1e9817ba?auto=format&fit=crop&q=80" }] }
  })),
  removeRegistryItem: (id) => set((state) => ({ content: { ...state.content, registry: state.content.registry.filter(r => r.id !== id) } })),
  updateRegistryItem: (id, updates) => set((state) => ({
    content: { ...state.content, registry: state.content.registry.map(r => r.id === id ? { ...r, ...updates } : r) }
  })),
  updateAudio: (updates) => set((state) => ({ content: { ...state.content, audio: { ...state.content.audio, ...updates } } })),
  toggleSection: (section) => set((state) => ({
    content: { ...state.content, sectionVisibility: { ...state.content.sectionVisibility, [section]: !state.content.sectionVisibility[section] } }
  })),
  addScheduleItem: () => set((state) => ({
    content: { ...state.content, schedule: [...state.content.schedule, { id: Math.random().toString(36).substr(2, 9), time: "12:00", title: "New Event", location: "", type: "other" }] }
  })),
  removeScheduleItem: (id) => set((state) => ({ content: { ...state.content, schedule: state.content.schedule.filter(s => s.id !== id) } })),
  updateScheduleItem: (id, updates) => set((state) => ({
    content: { ...state.content, schedule: state.content.schedule.map(s => s.id === id ? { ...s, ...updates } : s) }
  })),
  updateSectionLayout: (section, layout) => set((state) => ({
    content: { ...state.content, sectionLayouts: { ...state.content.sectionLayouts, [section]: layout } }
  }))
}));
