"use client";

import FolderFileItem from "./FolderFileItem";

interface FolderStructureProps {
  folders: Folder[];
}

export default function FolderStructure({ folders }: FolderStructureProps) {
  return (
    <ul>
      {folders.map((folder, index) => (
        <FolderFileItem folder={folder} key={index} />
      ))}
    </ul>
  );
}
