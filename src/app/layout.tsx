import { MainContents } from "@/components";
import LogoText from "@/components/LogoText";
import Header from "@/layouts/Header";
import { buildFolderStructure } from "@/libs/fetchPosts";
import type { Metadata } from "next";
import "./globals.css";

export const revalidate = 86400;

const sortOrder: Record<string, string[]> = {
  "": ["회고록", "프로그래밍", "에러"],
  회고록: ["2025"],
  프로그래밍: [
    // "HTML",
    // "CSS",
    // "JavaScript",
    // "TypeScript",
    // "React",
    "Next",
    "GraphQL",
    "Jest",
  ],
  에러: ["GitHub"],
};

function sortFolders(data: Folder[], parentFolderName = ""): Folder[] {
  const order = sortOrder[parentFolderName] || [];

  const getOrderIndex = (name: string) => {
    const index = order.indexOf(name);
    return index === -1 ? Number.MAX_SAFE_INTEGER : index;
  };

  return data
    .map((folder) => {
      if (folder.children && Array.isArray(folder.children)) {
        const sortedChildren = sortFolders(
          folder.children as Folder[],
          folder.folderName
        );
        return { ...folder, children: sortedChildren };
      }
      return folder;
    })
    .sort(
      (a, b) =>
        getOrderIndex(a.folderName || "") - getOrderIndex(b.folderName || "")
    );
}

export const metadata: Metadata = {
  title: "Codiving's Books",
  description: "Codiving의 개발 블로그",
  applicationName: "Codiving's book",
  authors: [{ name: "Codiving" }],
  keywords: ["Codiving", "Codiving 개발 블로그"],
  openGraph: {
    title: "Codiving's Books",
    description: "Codiving의 개발 블로그",
    url: "https://www.tech.codiving.kr",
    type: "article",
    images: [
      {
        url: "/thumb.png",
        width: 500,
        height: 350,
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const folders = sortFolders(await buildFolderStructure());

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
