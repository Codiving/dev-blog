import { useEffect, useState } from "react";

export interface Heading {
  tag: string;
  id: string;
}

/**
 * 지정된 컨테이너 내에서 모든 제목 요소를 추출하여 배열로 반환하는 커스텀 훅
 */
const useContentHeadings = () => {
  const [contentHeadings, setContentHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const post = document.querySelector("#post");
    const updateHeadings = () => {
      if (!post) return;

      const headings = Array.from(
        post.querySelectorAll("h1, h2, h3, h4, h5, h6")
      ).map((heading) => ({
        tag: heading.tagName,
        id: heading.textContent || "",
      }));

      setContentHeadings(headings);
    };

    updateHeadings();
  }, []);

  return contentHeadings;
};

export default useContentHeadings;
