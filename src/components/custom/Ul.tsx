import { ReactNode } from "react";

type UlProps = {
  children: ReactNode;
  className?: string;
};

const Ul = ({ children, className = "" }: UlProps) => {
  return (
    <ul className={`my-[8px] text-gray-800 dark:text-gray-200 ${className}`}>
      {children}
    </ul>
  );
};

export default Ul;
