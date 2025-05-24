import { fetchRepoFileTree, getPostByFileName } from "@/libs/fetchPosts";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const posts = await fetchRepoFileTree();

  if (!posts) return [];

  const results = await Promise.all(
    posts.tree
      .filter((post) => post.path.endsWith(".mdx"))
      .map(async ({ path }) => {
        const [mainCategory, subCategory, postName] = path.split("/");
        const fullPath = decodeURIComponent(
          [mainCategory, subCategory, postName, `post.mdx`].join("/")
        );
        const postInfos = await getPostByFileName(fullPath);

        if (!postInfos) {
          throw new Error("포스트 없음");
        }
        return { ...postInfos, mainCategory, subCategory, postName };
      })
  );

  return (
    <ul>
      {[...results, ...results, ...results, ...results, ...results].map(
        (result, index) => {
          const { frontmatter, mainCategory, subCategory, postName } = result;
          const { title, summary, date, thumbnail } = frontmatter;
          const postUrl = [mainCategory, subCategory, postName].join("/");

          const url = `https://raw.githubusercontent.com/${
            process.env.USER_NAME
          }/${process.env.REPOSITORY_NAME}/${
            process.env.BRANCH_NAME
          }/${decodeURIComponent(postUrl + "/" + thumbnail)}`;
          return (
            <li key={index}>
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
                  className="w-[200px] h-[120px] sm:w-sidebar sm:h-[150px] object-cover shrink-0"
                />
                <div className="relative flex flex-col justify-between gap-[8px]">
                  <h3 className="text-[22px] font-bold">{title}</h3>
                  <p className="line-clamp-4 summary text-[14px]">{summary}</p>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: "bold",
                      padding: "8px 6px",
                      backgroundColor: "lightgray",
                      width: "fit-content",
                      borderRadius: 8,
                      marginBottom: -2,
                    }}
                  >
                    {subCategory}
                  </span>
                  <p
                    style={{
                      position: "absolute",
                      right: 12,
                      bottom: -3,
                      fontSize: 14,
                    }}
                  >
                    작성일 : {date}
                  </p>
                </div>
              </Link>
            </li>
          );
        }
      )}
    </ul>
  );
}
