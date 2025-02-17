import { RefObject, useEffect, useState } from "react";

interface UseClosestHeadingProps {
  offset?: number;
  containerRef: RefObject<HTMLElement>;
}

/**
 * 뷰포트 상단에 가장 가까운 제목을 추적하는 커스텀 훅
 *
 * @param {number} offset 스크롤 위치로부터 가장 가까운 제목을 찾을 때, 기준이 되는 offset (default 0)
 * @param {React.RefObject<HTMLElement>} params.containerRef 제목 요소들을 포함하는 컨테이너의 레퍼런스
 * @returns {string | null} 뷰포트 상단에 가까운 제목의 텍스트 내용. 제목이 없으면 `null` 반환
 */
const useClosestHeading = ({
  offset = 0,
  containerRef,
}: UseClosestHeadingProps) => {
  const [contentHeading, setContentHeading] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;

      const headings: HTMLHeadingElement[] = Array.from(
        containerRef.current.querySelectorAll("h1, h2, h3, h4, h5, h6")
      );

      let closest: HTMLHeadingElement | null = null;
      let minDistance = Number.MAX_VALUE;

      for (const heading of headings) {
        const rect = heading.getBoundingClientRect();
        const distance = Math.abs(rect.top - offset);

        if (rect.top <= offset && distance < minDistance) {
          minDistance = distance;
          closest = heading;
        }
      }

      setContentHeading(closest?.textContent || null);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [containerRef, offset]);

  return contentHeading;
};

export default useClosestHeading;
