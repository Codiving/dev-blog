"use client";

import { Main, Sidebar } from "@/layouts";
import { useState } from "react";

interface MainContentsProps {
  readonly children: React.ReactNode;
}

export default function MainContents({ children }: MainContentsProps) {
  const [isWideView, setIsWideView] = useState(false);

  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-6xl bg-slate-500">
        <Sidebar isWideView={isWideView}>
          {/* <FolderStructure /> */}
          <span>sidebar</span>
        </Sidebar>
        <Main>
          <button onClick={() => setIsWideView(!isWideView)}>넓게 보기</button>
          {children}
        </Main>
      </div>
    </div>
  );
}
