"use client";
import { useAppStore } from "@/stores";
import clsx from "clsx";

export default function Hamburger() {
  const { open, onChangeOpen } = useAppStore();
  return (
    <ul
      className={clsx("hamburger-container", {
        active: open,
      })}
      onClick={() => {
        onChangeOpen(!open);
      }}
    >
      <li className="hamburger" />
      <li className="hamburger" />
      <li className="hamburger" />
    </ul>
  );
}
