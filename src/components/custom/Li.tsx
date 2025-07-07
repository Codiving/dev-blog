import { ReactNode } from "react";

type LiProps = {
  children: ReactNode;
  className?: string;
};

const Li = ({ children, className = "" }: LiProps) => {
  return <li className={`list-none ${className}`}>{children}</li>;
};

export default Li;
