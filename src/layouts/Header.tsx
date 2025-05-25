import Link from "next/link";

export default function Header() {
  return (
    <header id="header">
      <Link href="/">
        <div className="flex items-center gap-[8px]">
          <span className="w-[40px] h-[40px] leading-[40px] text-center text-[24px] bg-black text-white rounded-[12px]">
            C
          </span>
          <span className="robotoMono text-[18px] font-bold italic">
            Codiving
          </span>
        </div>
      </Link>
    </header>
  );
}
