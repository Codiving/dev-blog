"use client";

import { HamburgerIcon } from "@/icons";
import clsx from "clsx";
import Link from "next/link";

interface HeaderProps {
  open: boolean;
  onOpenSidebar: () => void;
}

export default function Header({ open, onOpenSidebar }: HeaderProps) {
  return (
    <header
      id="header"
      className={clsx({
        "opacity-90": !open,
      })}
    >
      <Link href="/">
        <div className="flex items-center gap-[8px]">
          <span className="w-[40px] h-[40px] leading-[40px] text-center text-[24px] bg-black text-white rounded-[12px]">
            C
          </span>
          <span className="robotoMono text-[18px] font-bold italic">
            Codiving
          </span>
        </div>
      </Link>
      <div className="cursor-pointer md:hidden" onClick={onOpenSidebar}>
        <HamburgerIcon width={60} height={60} />
      </div>
    </header>
  );
}
