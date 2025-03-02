"use client";

import FolderFileItem from "./FolderFileItem";

interface FolderStructureProps {
  folders: Folder[];
}

export default function FolderStructure({ folders }: FolderStructureProps) {
  return (
    <ul id="folder_structure" className="sticky top-[100px]">
      {folders.map((folder, index) => (
        <FolderFileItem folder={folder} key={index} />
      ))}
    </ul>
  );
}
