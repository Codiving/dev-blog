"use client";

import { useState } from "react";
import ItemName from "./FolderStructure/ItemName";

interface FolderFileItemProps {
  folder: Folder;
  depth: number;
}

function FolderFileItem({
  folder: { folderName, fileName, children = [], path },
  depth,
}: FolderFileItemProps) {
  const isFile = Boolean(fileName);

  const [isOpen, setIsOpen] = useState(false);

  const onToggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <li
      style={{
        marginBottom: depth === 0 && isOpen ? 12 : 0,
      }}
    >
      <ItemName
        onToggleOpen={onToggleOpen}
        isFile={isFile}
        isOpen={isOpen}
        folderName={folderName}
        fileName={fileName}
        path={path}
        depth={depth}
      />

      {isOpen &&
        children.map((data, key) => (
          <FolderFileItem folder={data} key={key} depth={depth + 1} />
        ))}
    </li>
  );
}

type SidebarProps = {
  folders: Folder[];
};

export default function Sidebar({ folders }: SidebarProps) {
  return (
    <ul className="p-[16px] flex flex-col">
      {folders.map((folder, index) => (
        <FolderFileItem key={index} folder={folder} depth={0} />
      ))}
    </ul>
  );
}
