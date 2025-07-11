"use client";

import { Sidebar as SidebarComponent } from "@/components";
import { useWidth } from "@/hooks";
import clsx from "clsx";

interface SidebarProps {
  folders: Folder[];
  open: boolean;
  onCloseSidebar: () => void;
}

export default function Sidebar({
  folders,
  open,
  onCloseSidebar,
}: SidebarProps) {
  const isMD = useWidth();

  return (
    <>
      <div
        className={clsx("w-full md:w-[var(--sidebar-width)]", {
          "sidenav-top rounded-b-xl": isMD,
          "sidenav-left": !isMD,
          "max-h-0": isMD && !open,
          "max-h-[50dvh]": isMD && open,
        })}
        style={{
          transition: "max-height 0.5s ease",
        }}
      >
        <nav>
          <SidebarComponent folders={folders} onCloseSidebar={onCloseSidebar} />
        </nav>
      </div>

      <div
        onClick={onCloseSidebar}
        className={clsx(
          "top-[var(--nav-height)] opacity-0 fixed inset-0 md:w-0 md:h-0 md:hidden block w-full h-full bg-[rgba(0,0,0,0.7)] z-10 pointer-events-none",
          {
            "opacity-100": open,
          },
        )}
        style={{
          transition: "opacity 0.5s ease",
        }}
      />
    </>
  );
}
