"use client";
import { useRouter } from "next/navigation";

export default function LogoText() {
  const router = useRouter();

  return (
    <span
      className="cursor-pointer"
      onClick={() => {
        router.push("/");
      }}
    >
      Codiving&apos;s Book
    </span>
  );
}
