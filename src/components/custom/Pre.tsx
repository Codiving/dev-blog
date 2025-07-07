"use client";

import { CopiedIcon, CopyIcon } from "@/icons";
import { useCallback, useRef, useState } from "react";

interface PreProps {
  children: string;
}

export default function Pre(props: PreProps) {
  const preRef = useRef<HTMLPreElement | null>(null);
  const [copied, setCopied] = useState(false);

  const copyCode = useCallback(() => {
    if (preRef.current) {
      const codeElement = preRef.current.querySelector("code");
      if (codeElement) {
        const pureText = codeElement.textContent || "";
        navigator.clipboard
          .writeText(pureText)
          .then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1000);
          })
          .catch((err) => {
            console.error("복사 실패:", err);
          });
      }
    }
  }, []);

  return (
    <pre {...props} className="overflow-auto" ref={preRef}>
      {props.children}
      <div
        onClick={copyCode}
        className="absolute right-25 top-40 w-25 h-25 rounded-[4px] cursor-pointer"
      >
        {copied ? <CopiedIcon /> : <CopyIcon />}
      </div>
    </pre>
  );
}
