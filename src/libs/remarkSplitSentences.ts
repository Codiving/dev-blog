import type { Paragraph, PhrasingContent, Root } from "mdast";
import { visit } from "unist-util-visit";

const SENTENCE_ENDINGS = /([.?])/g;

/**
 * Markdown AST에서 모든 문장을 `SENTENCE_ENDINGS` 기준으로 나누어
 * 새로운 `paragraph` 노드로 분리하는 Remark 플러그인
 */
export function remarkSplitSentences() {
  return (tree: Root) => {
    visit(tree, "paragraph", (node: Paragraph, index, parent) => {
      if (!parent || typeof index !== "number") return;

      const newParagraphs: Paragraph[] = [];
      let currentSentenceNodes: PhrasingContent[] = [];

      node.children.forEach((child) => {
        if (child.type === "text") {
          const parts = child.value.split(SENTENCE_ENDINGS);
          for (let i = 0; i < parts.length; i++) {
            const part = parts[i];

            if (!part) continue;

            currentSentenceNodes.push({ type: "text", value: part });

            // 문장 구분 기호( . 또는 ? )가 나오면 새로운 paragraph 시작
            if (i % 2 === 1) {
              newParagraphs.push({
                type: "paragraph",
                children: currentSentenceNodes,
              });
              currentSentenceNodes = [];
            }
          }
        } else {
          // 코드 블록(`) 등은 기존 문장과 함께 유지
          currentSentenceNodes.push(child);
        }
      });

      // 마지막으로 남아있는 문장 추가
      if (currentSentenceNodes.length > 0) {
        newParagraphs.push({
          type: "paragraph",
          children: currentSentenceNodes,
        });
      }

      // 기존 paragraph를 새로운 paragraph들로 대체
      parent.children.splice(index, 1, ...newParagraphs);
    });
  };
}
