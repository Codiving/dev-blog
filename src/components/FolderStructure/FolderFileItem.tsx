"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ItemName from "./ItemName";

interface FolderFileItemProps {
  folder: Folder;
}

export default function FolderFileItem({
  folder: { folderName, fileName, children = [], path },
}: FolderFileItemProps) {
  const isFile = Boolean(fileName);

  const [isOpen, setIsOpen] = useState(false);

  const onToggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <li className="list-none">
      <ItemName
        onToggleOpen={onToggleOpen}
        isFile={isFile}
        isOpen={isOpen}
        folderName={folderName}
        fileName={fileName}
        path={path}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="pl-4 overflow-hidden flex flex-col justify-end"
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          >
            {children.map((data, key) => (
              <FolderFileItem folder={data} key={key} />
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </li>
  );
}
