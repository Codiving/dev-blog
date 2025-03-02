import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { remarkCustomBlocks } from "./remarkCustomBlocks";
import { remarkSplitSentences } from "./remarkSplitSentences";

interface RepoFileTree {
  tree: { path: string }[];
}

const REPOSITORY_URL = `https://api.github.com/repos/${process.env.USER_NAME}/${process.env.REPOSITORY_NAME}/git/trees/${process.env.BRANCH_NAME}?recursive=1`;
const POST_RAW_DATA_URL = `https://raw.githubusercontent.com/${process.env.USER_NAME}/${process.env.REPOSITORY_NAME}/${process.env.BRANCH_NAME}`;

const FOLDER_ORDER: FolderName[] = ["회고록", "프로그래밍", "에러"];

export async function fetchRepoFileTree(): Promise<RepoFileTree | null> {
  try {
    const res = await fetch(REPOSITORY_URL, {
      headers: {
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetchRepoFileTree function");
    }

    return res.json();
  } catch (error) {
    console.error("fetchPostData function error:", error);
    return null;
  }
}

// 자식들의 자식까지 포함하여 파일만 자식 개수로 계산하는 함수
const filterMDXFile = (repoTree: RepoFileTree) =>
  repoTree.tree.map((el) => el.path).filter((path) => path.endsWith(".mdx"));

const updateChildCount = (folder: Folder) => {
  if (!folder.children || folder.children.length === 0) {
    folder.childCount = folder.fileName ? 1 : 0; // 파일 : 1, 폴더 : 0
    return folder.fileName ? 1 : 0;
  }

  let totalChildCount = 0;
  folder.children.forEach((child) => {
    totalChildCount += updateChildCount(child); // 재귀적으로 자식의 자식까지 더함
  });

  folder.childCount = totalChildCount; // 해당 폴더의 자식 개수 설정
  return totalChildCount; // 폴더는 자기 자신을 제외한 자식만 포함
};

export async function buildFolderStructure(): Promise<Folder[]> {
  const repoTree = await fetchRepoFileTree();
  if (!repoTree) return [];

  const mdxFiles = filterMDXFile(repoTree);

  const folderStructure = mdxFiles.reduce<Folder[]>((root, path) => {
    const parts = path.split("/") as FolderName[];
    const fileName = parts.pop();
    if (!fileName) return root;

    let currentLevel = root;

    parts.forEach((part, index) => {
      let existingFolder = currentLevel.find(
        (item) => item.folderName === part
      );

      if (!existingFolder) {
        existingFolder = { folderName: part, children: [], childCount: 0 };
        currentLevel.push(existingFolder);
      }

      // 마지막 부모 폴더인 경우, folderName & children 제거 후 file 정보만 남김
      if (index === parts.length - 1) {
        const splitedPath = path.split("/");
        splitedPath.pop(); // .mdx 제거

        delete existingFolder.folderName;
        delete existingFolder.children;
        existingFolder.fileName = fileName;
        existingFolder.path = splitedPath.join("/");
      } else {
        currentLevel = existingFolder.children!;
      }
    });

    return root;
  }, []);

  // 모든 폴더에 대해 자식 개수를 업데이트
  folderStructure.forEach(updateChildCount);

  return folderStructure.sort(
    (a, b) =>
      FOLDER_ORDER.indexOf(a.folderName!) - FOLDER_ORDER.indexOf(b.folderName!)
  );
}

export async function getPostByFileName(fileName: string) {
  // const res = await fetch("http://localhost:3000/test.mdx");
  const res = await fetch(`${POST_RAW_DATA_URL}/${fileName}`);
  const source = await res.text();

  if (!source || source === "404: Not Found") {
    return null;
  }

  const { content } = await compileMDX<{ title: string }>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkCustomBlocks, remarkSplitSentences],
        rehypePlugins: [
          [
            rehypePrettyCode, // code highlight
            {
              theme: "github-dark",
              keepBackground: true,
            },
          ],
          rehypeSlug, // heading 태그 id 부여
        ],
      },
    },
  });

  return <>{content}</>;
}
