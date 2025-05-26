import FolderFileItem from "./FolderFileItem";

type SidebarProps = {
  folders: Folder[];
  onCloseSidebar: () => void;
};

export default function Sidebar({ folders, onCloseSidebar }: SidebarProps) {
  return (
    <ul className="p-[16px] pl-[var(--layout-padding)] flex flex-col">
      {folders.map((folder, index) => (
        <FolderFileItem
          key={index}
          folder={folder}
          depth={0}
          onCloseSidebar={onCloseSidebar}
        />
      ))}
    </ul>
  );
}
