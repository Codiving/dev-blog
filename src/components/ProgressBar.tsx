"use client";

import { useScrollProgress } from "@/hooks";

export default function ProgressBar() {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 w-full h-progressbar z-50">
      <div
        className={"h-full transition-all bg-violet-800"}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
