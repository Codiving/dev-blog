import type { Paragraph, Parent, Root } from "mdast";
import { visit } from "unist-util-visit";

// 문장을 나눌 기호
const SENTENCE_ENDINGS = /([.?])/;

/**
 * Markdown AST에서 모든 문장을 `SENTENCE_ENDINGS` 기준으로 나누어
 * 여러 개의 `paragraph` 태그로 변환하는 Remark 플러그인
 */
export function remarkSplitSentences() {
  return (tree: Root) => {
    visit(tree, "paragraph", (node: Paragraph, index, parent?: Parent) => {
      if (!parent?.children || typeof index !== "number") return;

      const textNode = node.children[0];
      if (!textNode || textNode.type !== "text") return;

      // 문장을 마침표(.) 또는 물음표(?) 기준으로 나누기
      const sentences = textNode.value
        .split(SENTENCE_ENDINGS)
        .reduce<string[]>((acc, cur, i, arr) => {
          if (i % 2 === 0) {
            acc.push(cur + (arr[i + 1] || "")); // 문장 + 기호 붙이기
          }
          return acc;
        }, [])
        .map((sentence) => sentence.trim())
        .filter(Boolean);

      const newParagraphs: Paragraph[] = sentences.map((sentence) => ({
        type: "paragraph",
        children: [{ type: "text", value: sentence }], // 기존 기호 유지
      }));

      parent.children.splice(index, 1, ...newParagraphs);
    });
  };
}
