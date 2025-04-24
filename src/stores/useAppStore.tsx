"use client";

import { create } from "zustand";

interface AppStore {
  folders: Folder[];
  onChangeFolders: (folders: Folder[]) => void;
}

const useAppStore = create<AppStore>((set) => ({
  folders: [],
  onChangeFolders: (folders) => set({ folders }),
}));

export default useAppStore;
