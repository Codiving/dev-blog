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
import { useRouter } from "next/navigation";

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
  Jest: (props: IconProps) => <JavaScriptIcon {...props} />,
  TypeScript: (props: IconProps) => <TypeScriptIcon {...props} />,
  Next: (props: IconProps) => <NextJSIcon {...props} />,
  React: (props: IconProps) => <ReactIcon {...props} />,
  GraphQL: (props: IconProps) => <ReactIcon {...props} />,
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
  path?: string;
  depth: number;
}

export default function ItemName({
  onToggleOpen,
  isFile,
  isOpen,
  folderName,
  fileName,
  path,
  depth,
}: ItemNameProps) {
  const router = useRouter();

  return (
    <div
      className="flex items-center justify-between"
      style={{
        paddingLeft: depth * 10,
        borderLeft: depth
          ? "1px solid var(--sidebar-border-default)"
          : undefined,
        letterSpacing: depth ? undefined : 1.1,
        paddingTop: depth && !isFile ? 4 : 2,
        paddingBottom: depth && !isFile ? 4 : 2,
        cursor: isFile ? undefined : "pointer",
      }}
      onClick={() => {
        if (folderName) {
          onToggleOpen();
        } else {
          if (path) {
            router.push(`/${path}`);
          }
        }
      }}
    >
      <div className="flex items-center gap-[4px]">
        {folderName && FOLDER_ICON[folderName](FOLDER_ICON_STYLE)}
        <p
          className="flex items-center mt-[2px]"
          {...(folderName ? { "data-folder": true } : { "data-file": true })}
        >
          {folderName ?? fileName?.replace(".mdx", "")}
        </p>
      </div>
      <button
        className={clsx("transition-transform duration-300 ease-in-out", {
          hidden: isFile,
          "rotate-90": isOpen,
        })}
      >
        <ArrowRightIcon width={12} height={12} color="#666" />
      </button>
    </div>
  );
}
