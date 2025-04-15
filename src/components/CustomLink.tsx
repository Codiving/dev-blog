export default function CustomLink(
  props: React.AnchorHTMLAttributes<HTMLAnchorElement>
) {
  const isExternal = props.href?.startsWith("http");

  return (
    <a
      {...props}
      className="text-green-600 font-bold"
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
    />
  );
}
