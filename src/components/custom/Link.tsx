import clsx from "clsx";

const 노링크 = "- 노링크";

export default function Link(
  props: React.AnchorHTMLAttributes<HTMLAnchorElement>
) {
  const href = props.href || "";
  const children = props.children as string;
  const isExternal = href.startsWith("http");
  const noLink = children.includes(노링크);

  return (
    <a
      href={href}
      className={clsx("font-bold", {
        "text-green-600": !noLink,
      })}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {children.replace(노링크, "")}
    </a>
  );
}
