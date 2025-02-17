import { ProgressBar } from "@/components";

interface HeaderProps {
  readonly children: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <header className="h-header mt-progressbar w-full sticky top-0 bg-gray-500 z-10 flex flex-col justify-center">
      <ProgressBar />
      <div>{children}</div>
    </header>
  );
}
