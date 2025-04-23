"use client";

import { CollapseIcon, ExpandIcon } from "@/icons";
import { useAppStore } from "@/stores";
import { useEffect } from "react";

export default function PostViewModeToggle() {
  const isWideView = useAppStore((state) => state.isWideView);
  const onToggleWideView = useAppStore((state) => state.onToggleWideView);

  useEffect(() => {
    const onClose = () => {
      if (!isWideView && window.innerWidth < 1270) {
        onToggleWideView();
      }
    };
    window.addEventListener("resize", onClose);

    return () => {
      window.removeEventListener("resize", onClose);
    };
  }, [isWideView, onToggleWideView]);

  return (
    <div className="invisible lg:visible inline-flex justify-end">
      <div
        className="inline-flex gap-2 w-fit cursor-pointer"
        onClick={onToggleWideView}
      >
        {isWideView ? (
          <CollapseIcon width={17} height={17} />
        ) : (
          <ExpandIcon width={17} height={17} />
        )}
        {isWideView ? <span>카테고리</span> : <span>넓게보기</span>}
      </div>
    </div>
  );
}
