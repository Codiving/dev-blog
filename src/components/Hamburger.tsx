"use client";
import clsx from "clsx";
import { useState } from "react";

export default function Hamburger() {
  const [open, setOpen] = useState(false);
  return (
    <ul
      className={clsx("hamburger-container", {
        active: open,
      })}
      onClick={() => {
        setOpen((prev) => !prev);
      }}
    >
      <li className="hamburger" />
      <li className="hamburger" />
      <li className="hamburger" />
    </ul>
  );
}
