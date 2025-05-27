import { useEffect, useState } from "react";

/**
 * 뷰포트 상단에 가장 가까운 제목을 추적하는 커스텀 훅
 *
 * @returns {string | null} 뷰포트 상단에 가까운 제목의 텍스트 내용. 제목이 없으면 `null` 반환
 */

const OFFSET = 80;
const useClosestHeading = () => {
  const [contentHeading, setContentHeading] = useState<string | null>(null);

  useEffect(() => {
    const post = document.querySelector("#post");
    const onScroll = () => {
      if (!post) return;

      const headings: HTMLHeadingElement[] = Array.from(
        post.querySelectorAll("h1, h2, h3, h4, h5, h6"),
      );

      let closest: HTMLHeadingElement | null = null;
      let minDistance = Number.MAX_VALUE;

      for (const heading of headings) {
        const rect = heading.getBoundingClientRect();
        const distance = Math.abs(rect.top - OFFSET);

        if (rect.top <= OFFSET && distance < minDistance) {
          minDistance = distance;
          closest = heading;
        }
      }

      setContentHeading(closest?.textContent || null);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return contentHeading;
};

export default useClosestHeading;
