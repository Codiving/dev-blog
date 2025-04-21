import Comments from "@/components/Comments";
import PostNavigation from "@/components/PostNavigation";
import PostViewModeToggle from "@/components/PostViewModeToggle";
import { fetchRepoFileTree, getPostByFileName } from "@/libs/fetchPosts";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ mainCategory: string; subCategory: string; post: string }>;
}

export const revalidate = 86400;

/**
 * Q. 왜 2번쨰 index는 사용하지 않나요?
 * GitHub Repo 폴더 구조는 아래처럼 되어 있음
 * mainCategory/subCategory/게시글 폴더/게시글.mdx
 * 따라서 2번째 index인 게시글 폴더를 제외시켜줘야 함
 */
export async function generateStaticParams() {
  const posts = await fetchRepoFileTree();

  if (!posts) return [];

  const folders = posts.tree
    .filter((post) => post.path.endsWith(".mdx"))
    .map(({ path }) => {
      const [mainCategory, subCategory, post] = path.split("/");
      return { mainCategory, subCategory, post };
    });

  return folders;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { mainCategory, subCategory, post } = await params;

  const result = await getPostByFileName(
    decodeURIComponent([mainCategory, subCategory, post, "post.mdx"].join("/"))
  );

  if (!result) {
    throw new Error("게시글 없음");
  }

  const { frontmatter } = result;
  const { title, description, keywords, thumbnail } = frontmatter;

  const url = `https://raw.githubusercontent.com/${process.env.USER_NAME}/${
    process.env.REPOSITORY_NAME
  }/${process.env.BRANCH_NAME}/${decodeURIComponent(
    [mainCategory, subCategory, post].join("/") + "/" + thumbnail
  )}`;

  const metadata: Metadata = {
    title,
    description,
    applicationName: "Codiving's book",
    authors: [{ name: "Codiving" }],
    keywords,
    openGraph: {
      title,
      description,
      url: `https://www.tech.codiving.kr/${decodeURIComponent(
        [mainCategory, subCategory, post].join("/")
      )}`,
      type: "article",
      images: [
        {
          url,
          width: 500,
          height: 350,
        },
      ],
    },
  };

  return metadata;
}

export default async function Page({ params }: PageProps) {
  const { mainCategory, subCategory, post } = await params;

  const result = await getPostByFileName(
    decodeURIComponent([mainCategory, subCategory, post, "post.mdx"].join("/"))
  );

  if (!result) return null;

  const { content } = result;

  return (
    <div className="flex gap-6">
      <div className="flex flex-col">
        <PostViewModeToggle />
        <div className="w-full pb-10 mb-10 border-b border-[#d0d5dd]" id="post">
          {content}
        </div>
        <Comments />
      </div>
      <PostNavigation />
    </div>
  );
}
