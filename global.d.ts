import { SVGProps } from "react";

declare global {
  // icon
  type IconProps = SVGProps<SVGSVGElement> & {
    width?: React.CSSProperties["width"];
    height?: React.CSSProperties["height"];
  };

  // folder
  type FolderName =
    | "프로그래밍"
    | "에러"
    | "회고록"
    | "GitHub"
    | "HTML"
    | "CSS"
    | "Jest"
    | "JavaScript"
    | "TypeScript"
    | "Next"
    | "React"
    | "GraphQL"
    | "2025";

  interface Folder {
    folderName?: FolderName;
    children?: Folder[];
    path?: string;
    fileName?: string;
    childCount: number;
  }
}

export {};
