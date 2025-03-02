"use client";

import { create } from "zustand";

interface AppStore {
  isWideView: boolean;
  onToggleWideView: () => void;

  folders: Folder[];
  onChangeFolders: (folders: Folder[]) => void;
}

const useAppStore = create<AppStore>((set, get) => ({
  isWideView: false,
  onToggleWideView: () => set({ isWideView: !get().isWideView }),

  folders: [],
  onChangeFolders: (folders) => set({ folders }),
}));

export default useAppStore;
