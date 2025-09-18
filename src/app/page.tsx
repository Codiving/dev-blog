import { CategoryIcon } from "@/icons";
import { fetchRepoFileTree, getPostByFileName } from "@/libs/fetchPosts";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 86400;

export default async function Home() {
  const posts = await fetchRepoFileTree();

  if (!posts) return [];

  const results = (
    await Promise.all(
      posts.tree
        .filter((post) => post.path.endsWith(".mdx"))
        .map(async ({ path }) => {
          const [mainCategory, subCategory, postName] = path.split("/");
          const fullPath = decodeURIComponent(
            [mainCategory, subCategory, postName, `post.mdx`].join("/"),
          );
          const postInfos = await getPostByFileName(fullPath);

          if (!postInfos) {
            throw new Error("포스트 없음");
          }
          return { ...postInfos, mainCategory, subCategory, postName };
        }),
    )
  ).sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime(),
  );

  return (
    <ul>
      {results.map((result, index) => {
        const { frontmatter, mainCategory, subCategory, postName } = result;
        const { title, summary, date, thumbnail } = frontmatter;
        const postUrl = [mainCategory, subCategory, postName].join("/");

        const url = `https://raw.githubusercontent.com/${
          process.env.USER_NAME
        }/${process.env.REPOSITORY_NAME}/${
          process.env.BRANCH_NAME
        }/${decodeURIComponent(postUrl + "/" + thumbnail)}`;
        return (
          <li key={index} className="group">
            <Link
              href={"/" + postUrl}
              className="flex flex-col items-center gap-8 sm:flex-row mb-[20px] pb-[12px]"
              style={{
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              <Image
                alt={`${postName} 썸네일`}
                src={url}
                width={300}
                height={150}
                className="w-[200px] h-[120px] sm:w-sidebar sm:h-[150px] object-cover shrink-0 transition-transform duration-200 group-hover:scale-105"
              />
              <div className="relative flex flex-col justify-between gap-[8px]">
                <h3 className="text-[22px] font-bold group-hover:text-[#3ea2ff] transition-colors duration-200">
                  {title}
                </h3>
                <p className="line-clamp-4 summary text-[14px]">{summary}</p>
                <div
                  className="flex items-center gap-4 text-[13px]"
                  style={{
                    color: "#67717A",
                  }}
                >
                  <CategoryIcon className="mr-4" />
                  <span className="text-[13px]">{subCategory}</span>
                  <span className="text-[13px]">·</span>
                  <span className="text-[13px]">{date}</span>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
