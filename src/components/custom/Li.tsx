import { ReactNode } from "react";

type LiProps = {
  children: ReactNode;
  className?: string;
};

const Li = ({ children, className = "" }: LiProps) => {
  return (
    <li className={`list-none ${className}`}>
      <p className="inline-block mr-2 text-[12px]">●</p>
      {children}
    </li>
  );
};

export default Li;
