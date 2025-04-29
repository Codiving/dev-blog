"use client";

import { Main } from "@/layouts";
import { useAppStore } from "@/stores";
import { useEffect } from "react";

interface MainContentsProps {
  readonly children: React.ReactNode;
  readonly folders: Folder[];
}

export default function MainContents({ children, folders }: MainContentsProps) {
  const onChangeFolders = useAppStore((state) => state.onChangeFolders);

  useEffect(() => {
    onChangeFolders(folders);
  }, [folders, onChangeFolders]);

  return (
    <div className="flex flex-col w-full py-10 px-4">
      <Main>{children}</Main>
    </div>
  );
}
