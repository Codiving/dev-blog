"use client";

import { Main, Sidebar } from "@/layouts";
import { useAppStore } from "@/stores";
import { useEffect } from "react";
import FolderStructure from "./FolderStructure";

interface MainContentsProps {
  readonly children: React.ReactNode;
  readonly folders: Folder[];
}

export default function MainContents({ children, folders }: MainContentsProps) {
  const isWideView = useAppStore((state) => state.isWideView);
  const onToggleWideView = useAppStore((state) => state.onToggleWideView);

  const onChangeFolders = useAppStore((state) => state.onChangeFolders);

  useEffect(() => {
    onChangeFolders(folders);
  }, [folders, onChangeFolders]);

  return (
    <div className="flex justify-center">
      <div className="flex w-full mx-auto max-w-screen-xl py-10 px-4 bg-slate-500">
        <Sidebar isWideView={isWideView}>
          <FolderStructure folders={folders} />
        </Sidebar>
        <Main>
          <button onClick={onToggleWideView}>넓게 보기</button>
          {children}
        </Main>
      </div>
    </div>
  );
}
