import { MainContents } from "@/components";
import LogoText from "@/components/LogoText";
import Header from "@/layouts/Header";
import { buildFolderStructure } from "@/libs/fetchPosts";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Codiving's Books",
  description: "Codiving의 개발 블로그",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const folders = await buildFolderStructure();

  return (
    <html lang="ko">
      <body>
        <Header>
          <LogoText />
        </Header>
        <MainContents folders={folders}>{children}</MainContents>
      </body>
    </html>
  );
}
