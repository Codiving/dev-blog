import type { Paragraph, Parent, Root } from "mdast";
import type { MdxJsxFlowElement } from "mdast-util-mdx";
import { visit } from "unist-util-visit";

// /**
//  * `///블록이름 ///` 형식의 커스텀 블록을 MDX의 `<div class="블록이름">...</div>` 요소로 변환하는 Remark 플러그인.
//  *
//  * 예제:
//  * ```md
//  * ///icon-info title-이게 뭔가요?
//  * 정보에 대한 div입니다.
//  * ///
//  * ```
//  *
//  * 위의 Markdown을 변환하면 다음과 같이 변경됨.
//  * ```mdx
//  * <div class="info">
//  *   <p class="title">이게 뭔가요?</p>
//  *   <p>정보에 대한 div입니다.</p>
//  * </div>
//  * ```
//  */
export function remarkCustomBlocks() {
  return (tree: Root) => {
    // Markdown AST에서 paragraph를 찾으면 callback 함수 실행
    visit(tree, "paragraph", (node: Paragraph, index, parent?: Parent) => {
      if (!parent?.children || typeof index !== "number") return;

      const textNode = node.children[0];
      if (!textNode || textNode.type !== "text") return;

      const text = textNode.value;
      const match = text.match(/^\/\/\/(.+?)\n([\s\S]*?)\n\/\/\//);

      if (match) {
        const [blockInfo, content] = match.slice(1); // 블록 정보와 내용

        // 따옴표로 감싸인 값들을 배열로 만듬
        const blockInfoArray =
          blockInfo
            .match(/'([^']+)'/g)
            ?.map((item) => item.replace(/'/g, "")) || [];

        // 'icon-info' -> ['icon', 'info'], 'title-이게 뭔가요' -> ['title', '이게 뭔가요']
        const blockSplitArray = blockInfoArray.map((info) => info.split("-"));

        const classNames = blockSplitArray
          .filter(([key]) => key !== "title") // 'title' 제외하고 나머지는 class로 넣기
          .map(([, value]) => value)
          .join(" "); // class="info icon" 형태로 만듬

        const title =
          blockSplitArray.find(([key]) => key === "title")?.[1] || ""; // title이 있으면 그 값을 가져옴

        const newNode: MdxJsxFlowElement = {
          type: "mdxJsxFlowElement",
          name: "div",
          attributes: [
            { type: "mdxJsxAttribute", name: "className", value: classNames },
          ],
          children: [
            {
              type: "mdxJsxFlowElement",
              name: "div",
              attributes: [
                {
                  type: "mdxJsxAttribute",
                  name: "className",
                  value: "info-icon",
                },
              ],
              children: [],
            },

            {
              type: "mdxJsxFlowElement",
              name: "div",
              attributes: [
                {
                  type: "mdxJsxAttribute",
                  name: "className",
                  value: "info-wrap",
                },
              ],
              children: [
                {
                  type: "mdxJsxFlowElement",
                  name: "div",
                  attributes: [
                    {
                      type: "mdxJsxAttribute",
                      name: "className",
                      value: "title",
                    },
                  ],
                  children: [
                    {
                      type: "paragraph",
                      children: [{ type: "text", value: title }],
                    },
                  ],
                },
                {
                  type: "mdxJsxFlowElement",
                  name: "div",
                  attributes: [
                    {
                      type: "mdxJsxAttribute",
                      name: "className",
                      value: "description",
                    },
                  ],
                  children: [
                    {
                      type: "paragraph",
                      children: [{ type: "text", value: content }],
                    },
                  ],
                },
              ],
            },
          ],
        };

        parent.children[index] = newNode;
      }
    });
  };
}
