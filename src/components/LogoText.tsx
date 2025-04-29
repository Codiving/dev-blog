"use client";
import { useRouter } from "next/navigation";

export default function LogoText() {
  const router = useRouter();

  return (
    <span
      className="cursor-pointer text-white font-bold text-[1.4rem] mt-[4px]"
      onClick={() => {
        router.push("/");
      }}
    >
      Codiving&apos;s Book
    </span>
  );
}
