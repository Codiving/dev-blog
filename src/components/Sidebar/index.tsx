import FolderFileItem from "./FolderFileItem";

type SidebarProps = {
  folders: Folder[];
};

export default function Sidebar({ folders }: SidebarProps) {
  return (
    <ul className="p-[16px] pl-[var(--layout-padding)] flex flex-col">
      {folders.map((folder, index) => (
        <FolderFileItem key={index} folder={folder} depth={0} />
      ))}
    </ul>
  );
}
