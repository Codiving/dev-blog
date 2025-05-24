import { Sidebar } from "@/components";
import { buildFolderStructure } from "@/libs/fetchPosts";
import type { Metadata } from "next";
import Link from "next/link";
import "../styles/fonts.css";
import "../styles/globals.css";

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

  console.log("folders : ", folders);

  return (
    <html lang="ko">
      <body>
        <div id="container">
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
          <div id="sidenav">
            <nav>
              <Sidebar
                folders={[...folders, ...folders, ...folders, ...folders]}
              />
            </nav>
          </div>
          <div id="contents"></div>
        </div>
        {/* <Header>
          <LogoText />
        </Header>
        <section id="main-section" className="flex">
          <Sidebar />
          <MainContents folders={folders}>{children}</MainContents>
        </section> */}
      </body>
    </html>
  );
}
