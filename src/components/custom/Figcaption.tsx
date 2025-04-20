"use client";

import { useRef, useState } from "react";

interface FigcaptionProps {
  children: string;
}

export default function Figcaption(props: FigcaptionProps) {
  const [text, setText] = useState("Copy");

  const figRef = useRef<HTMLElement | null>(null);

  if (props.children !== "Copy") {
    return <figcaption {...props} />;
  }

  return (
    <figcaption
      {...props}
      ref={figRef}
      onClick={() => {
        const figcaptionEl = figRef.current;

        if (figcaptionEl) {
          const parent = figcaptionEl.parentElement;
          if (!parent) return;

          const pre = Array.from(parent.children).find(
            (el) => el.tagName.toLowerCase() === "pre"
          );

          if (pre) {
            const code = pre.querySelector("code");
            const pureText = code?.textContent || "";
            navigator.clipboard
              .writeText(pureText)
              .then(() => {
                console.log("복사 완료");
                setText("Copied");
                setTimeout(() => setText("Copy"), 1000);
              })
              .catch((err) => {
                console.error("복사 실패:", err);
              });
          }
        }
      }}
    >
      {text}
    </figcaption>
  );
}
