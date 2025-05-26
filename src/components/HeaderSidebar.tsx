"use client";

import { useWidth } from "@/hooks";
import { Header, Sidebar } from "@/layouts";
import { useEffect, useState } from "react";

interface HeaderSidebarProps {
  folders: Folder[];
}

export default function HeaderSidebar({ folders }: HeaderSidebarProps) {
  const [open, setOpen] = useState(false);

  const isMD = useWidth();

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (!isMD) {
      setOpen(false);
    }
  }, [isMD]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  return (
    <>
      <Header open={open} onOpenSidebar={handleOpen} />
      <Sidebar folders={folders} open={open} onCloseSidebar={handleClose} />
    </>
  );
}
