"use client";

import { ErrorIcon } from "@/icons";
import { useAppStore } from "@/stores";
import clsx from "clsx";
import { useEffect } from "react";

type SidebarProps = React.HTMLAttributes<HTMLDivElement>;

export default function Sidebar({ children }: SidebarProps) {
  console.log("children : ", children);
  const { open, onChangeOpen } = useAppStore();

  useEffect(() => {
    const handleResize = () => {
      if (open && window.innerWidth < 1260) {
        onChangeOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [onChangeOpen, open]);

  return (
    <div
      className={clsx(
        "bg-gray-900 text-white flex flex-col shrink-0 shadow-lg transition-all duration-500",
        { "w-0 p-0 overflow-hidden": !open },
        { "w-[280px] p-4 ": open }
      )}
    >
      <nav className="sticky top-[76px] flex flex-col gap-4">
        <a
          href="#"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800"
        >
          <ErrorIcon className="w-5 h-5" />
          <span className="text-white">Dashboard</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800"
        >
          <ErrorIcon className="w-5 h-5" />
          <span className="text-white">Profile</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800"
        >
          <ErrorIcon className="w-5 h-5" />
          <span className="text-white">Settings</span>
        </a>
      </nav>
    </div>
  );
}
