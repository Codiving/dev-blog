declare global {
  // folder
  type FolderName =
    | "프로그래밍"
    | "에러"
    | "회고록"
    | "GitHub"
    | "HTML"
    | "CSS"
    | "JavaScript"
    | "TypeScript"
    | "Next"
    | "React"
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
