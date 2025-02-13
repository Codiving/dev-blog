import ProgressBar from "@/components/ProgressBar";

interface HeaderProps {
  readonly children: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <header className="h-header mt-1 w-full sticky top-0 bg-red-500 z-10 flex flex-col justify-center">
      <ProgressBar />
      <div>{children}</div>
    </header>
  );
}
