"use client";

import { CollapseIcon, ExpandIcon } from "@/icons";
import { useAppStore } from "@/stores";

export default function PostViewModeToggle() {
  const isWideView = useAppStore((state) => state.isWideView);
  const onToggleWideView = useAppStore((state) => state.onToggleWideView);

  return (
    <div className="inline-flex justify-end">
      <div
        className="inline-flex gap-2 w-fit cursor-pointer"
        onClick={onToggleWideView}
      >
        {isWideView ? (
          <CollapseIcon width={17} height={17} />
        ) : (
          <ExpandIcon width={17} height={17} />
        )}
        {isWideView ? <span>원래대로</span> : <span>넓게보기</span>}
      </div>
    </div>
  );
}
