import { Sidebar as SidebarComponent } from "@/components";

interface SidebarProps {
  folders: Folder[];
}

export default function Sidebar({ folders }: SidebarProps) {
  return (
    <div id="sidenav" className="w-0 md:w-[var(--sidebar-width)] duration-300">
      <nav>
        <SidebarComponent
          folders={[
            ...folders,
            ...folders,
            ...folders,
            ...folders,
            ...folders,
            ...folders,
            ...folders,
            ...folders,
            ...folders,
            ...folders,
            ...folders,
            ...folders,
          ]}
        />
      </nav>
    </div>
  );
}
