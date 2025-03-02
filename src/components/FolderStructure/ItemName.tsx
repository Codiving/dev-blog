"use client";

import {
  ArrowRightIcon,
  CalendarIcon,
  CSSIcon,
  ErrorIcon,
  GitHubIcon,
  HTMLIcon,
  JavaScriptIcon,
  MemoirIcon,
  NextJSIcon,
  ProgrammingIcon,
  ReactIcon,
  TypeScriptIcon,
} from "@/icons";
import clsx from "clsx";

type FolderIcon = {
  [key in FolderName]: (props: IconProps) => React.ReactNode;
};

const FOLDER_ICON: FolderIcon = {
  프로그래밍: (props: IconProps) => <ProgrammingIcon {...props} />,
  에러: (props: IconProps) => <ErrorIcon {...props} />,
  회고록: (props: IconProps) => <MemoirIcon {...props} />,
  GitHub: (props: IconProps) => <GitHubIcon {...props} />,
  HTML: (props: IconProps) => <HTMLIcon {...props} />,
  CSS: (props: IconProps) => <CSSIcon {...props} />,
  JavaScript: (props: IconProps) => <JavaScriptIcon {...props} />,
  TypeScript: (props: IconProps) => <TypeScriptIcon {...props} />,
  Next: (props: IconProps) => <NextJSIcon {...props} />,
  React: (props: IconProps) => <ReactIcon {...props} />,
  "2025": (props: IconProps) => <CalendarIcon {...props} />,
};

const FOLDER_ICON_STYLE = {
  width: 18,
  height: 18,
  color: "#333",
};

interface ItemNameProps {
  onToggleOpen: () => void;
  isFile: boolean;
  isOpen: boolean;
  folderName?: FolderName;
  fileName?: string;
}

export default function ItemName({
  onToggleOpen,
  isFile,
  isOpen,
  folderName,
  fileName,
}: ItemNameProps) {
  return (
    <span
      className="whitespace-pre flex items-center gap-1 px-0 py-1.5 text-[0.975rem] cursor-pointer"
      onClick={onToggleOpen}
    >
      <button
        className={clsx(
          "p-1 bg-transparent border-none cursor-pointer flex items-center transition-transform duration-300 ease-in-out",
          {
            invisible: isFile,
            "rotate-90": isOpen,
          }
        )}
      >
        <ArrowRightIcon width={12} height={12} color="#666" />
      </button>

      {folderName && FOLDER_ICON[folderName](FOLDER_ICON_STYLE)}
      {folderName ?? fileName?.replace(".mdx", "")}
    </span>
  );
}
