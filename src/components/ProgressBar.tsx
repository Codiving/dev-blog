"use client";

import { useScrollProgress } from "@/hooks";

export default function ProgressBar() {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 w-full h-progressbar bg-gray-200 z-50">
      <div
        className={"h-full bg-blue-500 transition-all"}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
