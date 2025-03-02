import Comments from "@/components/Comments";
import PostNavigation from "@/components/PostNavigation";
import PostViewModeToggle from "@/components/PostViewModeToggle";
import { fetchRepoFileTree, getPostByFileName } from "@/libs/fetchPosts";

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

  const result = await getPostByFileName(
    decodeURIComponent(
      [mainCategory, subCategory, post, `${post}.mdx`].join("/")
    )
  );

  return (
    <div className="flex gap-6">
      <div className="flex flex-col">
        <PostViewModeToggle />
        <div className="w-full pb-10 mb-10 border-b border-[#d0d5dd]" id="post">
          {result}
        </div>
        <Comments />
      </div>
      <PostNavigation />
    </div>
  );
}
