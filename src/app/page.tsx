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
          <li key={index}>
            <Link
              href={"/" + postUrl}
              className="flex gap-2 flex-col items-center sm:flex-row"
              style={{
                borderBottom: "1px solid #e0e0e0",
                marginBottom: 20,
                paddingBottom: 12,
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
                <h3 style={{ fontSize: 22, fontWeight: "bold" }}>{title}</h3>
                <p className="line-clamp-4 summary">{summary}</p>
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
      })}
    </ul>
  );
}
