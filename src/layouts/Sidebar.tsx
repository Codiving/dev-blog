import clsx from "clsx";
import { twMerge } from "tailwind-merge";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isWideView: boolean;
}

export default function Sidebar({
  isWideView,
  children,
  className,
}: SidebarProps) {
  return (
    <div
      className={twMerge(
        clsx(
          `shrink-0 transition-all duration-300 ease-in-out p-4`,
          isWideView ? "w-0 opacity-0" : "w-sidebar opacity-100"
        ),
        className
      )}
    >
      {children}
    </div>
  );
}
