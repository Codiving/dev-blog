"use client";

import { Heading } from "@/hooks/useContentHeadings";
import useScrollToElementById from "@/hooks/useScrollToElementById";

interface PostNavigationProps {
  headings: Heading[];
}

export default function PostNavigation({ headings }: PostNavigationProps) {
  const scrollToElementById = useScrollToElementById();

  return (
    <nav className="bg-slate-400 w-56 hidden shrink-0 lg:block">
      <ul>
        {headings.map(({ text }, key) => (
          <li key={key} onClick={() => scrollToElementById(text)}>
            {text}
          </li>
        ))}
      </ul>
    </nav>
  );
}
