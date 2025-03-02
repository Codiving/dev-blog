"use client";

import { useEffect, useRef, useState } from "react";

export default function Comments() {
  const [mounted, setMounted] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
    }
  }, [mounted]);

  useEffect(() => {
    const scriptElement = document.createElement("script");
    scriptElement.setAttribute("src", "https://giscus.app/client.js");
    scriptElement.setAttribute(
      "data-repo",
      process.env.NEXT_PUBLIC_COMMENT_REPO as string
    );
    scriptElement.setAttribute(
      "data-repo-id",
      process.env.NEXT_PUBLIC_COMMENT_REPO_ID as string
    );
    scriptElement.setAttribute("data-category", "Announcements");
    scriptElement.setAttribute(
      "data-category-id",
      process.env.NEXT_PUBLIC_COMMENT_CATEGORY_ID as string
    );
    scriptElement.setAttribute("data-mapping", "pathname");
    scriptElement.setAttribute("data-strict", "0");
    scriptElement.setAttribute("data-reactions-enabled", "1");
    scriptElement.setAttribute("data-emit-metadata", "0");
    scriptElement.setAttribute("data-input-position", "bottom");
    scriptElement.setAttribute("data-theme", "light");
    scriptElement.setAttribute("data-lang", "ko");
    scriptElement.setAttribute("data-loading", "lazy");
    scriptElement.setAttribute("crossorigin", "anonymous");
    scriptElement.async = true;

    setTimeout(() => {
      ref.current?.appendChild(scriptElement);
    }, 300);
  }, []);

  if (!mounted) return null;

  return <div ref={ref} />;
}
