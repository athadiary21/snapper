import { create } from 'zustand';

interface Screenshot {
  id: string;
  url: string;
  thumbnail?: string;
  title: string;
  createdAt: Date;
}

interface Preset {
  id: string;
  name: string;
  settings: {
    backgroundColor?: string;
    padding?: number;
    borderRadius?: number;
    shadow?: boolean;
    shadowColor?: string;
  };
}

interface AppState {
  screenshots: Screenshot[];
  currentScreenshot: string | null;
  presets: Preset[];
  selectedPreset: Preset | null;
  isCapturing: boolean;
  
  // Actions
  addScreenshot: (screenshot: Screenshot) => void;
  removeScreenshot: (id: string) => void;
  setCurrentScreenshot: (url: string | null) => void;
  setPresets: (presets: Preset[]) => void;
  selectPreset: (preset: Preset | null) => void;
  setIsCapturing: (capturing: boolean) => void;
  setScreenshots: (screenshots: Screenshot[]) => void;
}

export const useStore = create<AppState>((set) => ({
  screenshots: [],
  currentScreenshot: null,
  presets: [],
  selectedPreset: null,
  isCapturing: false,
  
  addScreenshot: (screenshot) =>
    set((state) => ({ screenshots: [screenshot, ...state.screenshots] })),
  
  removeScreenshot: (id) =>
    set((state) => ({
      screenshots: state.screenshots.filter((s) => s.id !== id),
    })),
  
  setCurrentScreenshot: (url) => set({ currentScreenshot: url }),
  
  setPresets: (presets) => set({ presets }),
  
  selectPreset: (preset) => set({ selectedPreset: preset }),
  
  setIsCapturing: (capturing) => set({ isCapturing: capturing }),
  
  setScreenshots: (screenshots) => set({ screenshots }),
}));
