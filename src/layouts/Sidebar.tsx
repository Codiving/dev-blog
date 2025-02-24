import clsx from "clsx";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isWideView: boolean;
}

export default function Sidebar({ isWideView, children }: SidebarProps) {
  return (
    <div
      className={clsx(
        `transition-all duration-300 ease-in-out overflow-hidden bg-gray-200 p-4`,
        isWideView ? "w-0 opacity-0" : "w-sidebar opacity-100"
      )}
    >
      {children}
    </div>
  );
}
