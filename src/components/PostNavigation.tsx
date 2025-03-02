"use client";

import { useClosestHeading } from "@/hooks";
import useContentHeadings, { Heading } from "@/hooks/useContentHeadings";
import useScrollToElementById from "@/hooks/useScrollToElementById";
import clsx from "clsx";

export default function PostNavigation() {
  const headings: Heading[] = useContentHeadings();
  const scrollToElementById = useScrollToElementById();
  const head = useClosestHeading();

  return (
    <nav className="w-56 hidden shrink-0 lg:block">
      <ul className="sticky top-[100px] flex flex-col gap-[16px]">
        <li>
          <p className="text-[1.2rem] font-bold text-[#6b7280]">목차</p>
        </li>
        {headings.map(({ id }, key) => (
          <li
            className={clsx("cursor-pointer text-[#6b7280]", {
              "font-bold": head === id,
            })}
            key={key}
            onClick={() =>
              scrollToElementById(id.toLocaleLowerCase().replaceAll(" ", "-"))
            }
          >
            {id}
          </li>
        ))}
      </ul>
    </nav>
  );
}
