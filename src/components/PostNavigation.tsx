"use client";

import { useClosestHeading } from "@/hooks";
import useContentHeadings, { Heading } from "@/hooks/useContentHeadings";
import useScrollToElementById from "@/hooks/useScrollToElementById";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

export default function PostNavigation() {
  const headings: Heading[] = useContentHeadings();
  const scrollToElementById = useScrollToElementById();
  const head = useClosestHeading();

  const [top, setTop] = useState(0);
  const [height, setHeight] = useState(0);

  const liRefs = useRef<(HTMLLIElement | null)[]>(
    new Array(headings.length + 1).fill(null),
  );

  useEffect(() => {
    if (!head) return;

    const idx = headings.findIndex((h) => h.id === head);
    if (idx === -1 || !liRefs.current[idx + 1]) return;

    // offset 계산
    let offset = 0;
    for (let i = 0; i <= idx + 1; i++) {
      offset += liRefs.current[i]?.offsetHeight || 0;
    }

    const heightValue = liRefs.current[idx + 1]?.offsetHeight || 0;

    if (heightValue > 0) {
      setTop(offset - heightValue); // 선택한 항목의 시작 위치로 조정
      setHeight(heightValue);
    }
  }, [head, headings]);

  return (
    <nav
      className="hidden shrink-0 lg:block h-fit w-[250px] sticky"
      style={{
        borderLeft: "1px solid var(--sidebar-border-default)",
        top: `calc(var(--nav-height) + 16px)`,
      }}
    >
      <ul className="sticky top-[100px] flex flex-col text-[14px]">
        <li
          className="pl-16 py-8"
          ref={(ref) => {
            liRefs.current[0] = ref;
          }}
        >
          <p className="font-bold text-[#6b7280]">On this page</p>
        </li>
        {headings.map(({ id }, key) => {
          return (
            <li
              ref={(ref) => {
                liRefs.current[key + 1] = ref;
              }}
              className={clsx(
                "pl-16 py-8 cursor-pointer text-[#6b7280] leading-[1.4]",
                {
                  "font-bold": head === id,
                },
              )}
              key={key}
              onClick={() =>
                scrollToElementById(id.toLocaleLowerCase().replaceAll(" ", "-"))
              }
            >
              {id}
            </li>
          );
        })}
      </ul>
      <div
        className="absolute w-1 top-0 duration-300"
        style={{
          backgroundColor: "var(--sidebar-border-active)",
          top,
          height,
        }}
      />
    </nav>
  );
}
