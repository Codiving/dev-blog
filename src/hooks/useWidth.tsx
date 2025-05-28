import { useEffect, useState } from "react";

function useWidth(breakpoint = 1027) {
  const [isBelowBreakpoint, setIsBelowBreakpoint] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      if (typeof window !== "undefined") {
        setIsBelowBreakpoint(window.innerWidth < breakpoint);
      }
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);

    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  }, [breakpoint]);

  return isBelowBreakpoint;
}

export default useWidth;
