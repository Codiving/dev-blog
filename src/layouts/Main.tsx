type MainProps = React.HTMLAttributes<HTMLDivElement>;

export default function Main({ children }: MainProps) {
  return (
    <main className={"p-4 transition-all duration-300 ease-in-out"}>
      {children}
    </main>
  );
}
