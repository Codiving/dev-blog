import { RefObject, useEffect, useState } from "react";

export interface Heading {
  tag: string;
  text: string; // 추후 id로 변경
}

interface UseContentHeadingsProps {
  containerRef: RefObject<HTMLElement>;
}

/**
 * 지정된 컨테이너 내에서 모든 제목 요소를 추출하여 배열로 반환하는 커스텀 훅
 *
 * @param {React.RefObject<HTMLElement>} params.containerRef - 제목 요소들을 포함하는 컨테이너의 레퍼런스
 * @returns {Array} - 컨테이너 내의 모든 제목 정보를 담은 배열. 각 항목은 `tag`(태그 이름)과 `text`(텍스트 내용)를 포함하는 객체
 */
const useContentHeadings = ({ containerRef }: UseContentHeadingsProps) => {
  const [contentHeadings, setContentHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const updateHeadings = () => {
      if (!containerRef?.current) return;

      const headings = Array.from(
        containerRef.current.querySelectorAll("h1, h2, h3, h4, h5, h6")
      ).map((heading) => ({
        tag: heading.tagName,
        text: heading.textContent || "",
      }));

      setContentHeadings(headings);
    };

    updateHeadings();
  }, [containerRef]);

  return contentHeadings;
};

export default useContentHeadings;
