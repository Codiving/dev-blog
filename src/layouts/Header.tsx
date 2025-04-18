import { ProgressBar } from "@/components";

interface HeaderProps {
  readonly children: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <header className="px-[1.5rem] h-header mt-progressbar w-full sticky top-progressbar bg-gray-500 z-10 flex flex-col justify-center">
      <ProgressBar />
      <div>{children}</div>
    </header>
  );
}
