import { useCallback } from "react";

/**
 * 특정 ID를 가진 요소로 부드럽게 스크롤을 이동시키는 커스텀 훅
 *
 * @param {number} offset 스크롤이 이동한 후, 요소가 위치할 화면 상의 여백 (default 0)
 * @returns {Function} 특정 ID를 가진 요소로 부드럽게 스크롤을 이동시키는 함수
 */
const useScrollToElementById = (offset = 0) => {
  const scrollToElementById = useCallback(
    (id: string) => {
      const element = document.getElementById(id);
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        window.scrollTo({
          top: elementTop - offset,
          behavior: "smooth",
        });
      }
    },
    [offset]
  );

  return scrollToElementById;
};

export default useScrollToElementById;
