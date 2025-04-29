import Hamburger from "@/components/Hamburger";

interface HeaderProps {
  readonly children: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <header className="px-[1.5rem] h-header w-full sticky bg-gray-500 z-10 top-0 flex gap-4 items-center">
      <Hamburger />
      {children}
    </header>
  );
}
