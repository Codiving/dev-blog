"use client";

import { create } from "zustand";

interface AppStore {
  open: boolean;
  onChangeOpen: (open: boolean) => void;
  folders: Folder[];
  onChangeFolders: (folders: Folder[]) => void;
}

const useAppStore = create<AppStore>((set) => ({
  open: false,
  onChangeOpen: (open: boolean) => set({ open }),
  folders: [],
  onChangeFolders: (folders) => set({ folders }),
}));

export default useAppStore;
