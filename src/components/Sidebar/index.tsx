import FolderFileItem from "./FolderFileItem";

type SidebarProps = {
  folders: Folder[];
};

export default function Sidebar({ folders }: SidebarProps) {
  return (
    <ul
      id="sidebar"
      className="p-[16px] pl-[var(--layout-padding)] flex flex-col w-0 md:w-full duration-300 opacity-0 
md:opacity-100"
    >
      {folders.map((folder, index) => (
        <FolderFileItem key={index} folder={folder} depth={0} />
      ))}
    </ul>
  );
}
