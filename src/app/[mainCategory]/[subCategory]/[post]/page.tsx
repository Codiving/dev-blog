import PostNavigation from "@/components/PostNavigation";
import { Heading } from "@/hooks/useContentHeadings";
import { fetchRepoFileTree } from "@/libs/fetchPosts";

interface PageProps {
  params: Promise<{ mainCategory: string; subCategory: string; post: string }>;
}

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
      const [mainCategory, subCategory, , post] = path.split("/");
      return { mainCategory, subCategory, post: post.replace(".mdx", "") };
    });

  return folders;
}

export default async function Page({ params }: PageProps) {
  const { mainCategory, subCategory, post } = await params;

  const headings: Heading[] = [];

  console.log(mainCategory, subCategory, post);

  return (
    <div className="flex">
      <div className="w-full bg-red-100">1</div>
      <PostNavigation headings={headings} />
    </div>
  );
}
