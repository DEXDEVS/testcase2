import React from "react";
import cn from "../../lib/cn";

export default function Grid({ children, className, ...restProps }) {
  return (
    <div className={cn("grid grid-cols-1 gap-4", className)} {...restProps}>
      {children}
    </div>
  );
}
