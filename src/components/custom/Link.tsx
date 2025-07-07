import clsx from "clsx";

const 레퍼런스 = " - reference";

export default function Link(
  props: React.AnchorHTMLAttributes<HTMLAnchorElement>,
) {
  const href = props.href || "";
  const children = props.children as string;
  const isExternal = href.startsWith("http");
  const isReference = children.includes(레퍼런스);

  return (
    <a
      href={href}
      className={clsx("transition-colors duration-300", {
        "hover:text-gray-400": isReference,
        "text-[#2964aa] hover:text-[#749ac8]": !isReference,
      })}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    >
      {children.replace(레퍼런스, "")}
    </a>
  );
}
