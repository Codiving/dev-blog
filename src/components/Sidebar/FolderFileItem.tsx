"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import ItemName from "./ItemName";

interface FolderFileItemProps {
  folder: Folder;
  depth: number;
  onCloseSidebar: () => void;
}

export default function FolderFileItem({
  folder: { folderName, fileName = "", children = [], path },
  depth,
  onCloseSidebar,
}: FolderFileItemProps) {
  const isFile = Boolean(fileName);

  const [, ...pathname] = decodeURIComponent(usePathname()).split("/");

  const [isOpen, setIsOpen] = useState(
    pathname.length === 3
      ? pathname.includes(folderName as string) || pathname.includes(fileName)
      : false,
  );

  const onToggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <li
      style={{
        marginBottom: depth === 0 && isOpen ? 12 : 0,
      }}
    >
      <ItemName
        onToggleOpen={onToggleOpen}
        onCloseSidebar={onCloseSidebar}
        isFile={isFile}
        isOpen={isOpen}
        folderName={folderName}
        fileName={fileName}
        path={path}
        depth={depth}
      />

      {isOpen &&
        children.map((data, key) => (
          <FolderFileItem
            folder={data}
            key={key}
            depth={depth + 1}
            onCloseSidebar={onCloseSidebar}
          />
        ))}
    </li>
  );
}
