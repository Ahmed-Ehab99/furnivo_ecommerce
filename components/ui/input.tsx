import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "selection:bg-primary border-foreground h-9 w-full min-w-0 border-b bg-transparent px-3 py-1 text-base font-medium transition-[color,box-shadow] outline-none placeholder:opacity-60 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-b-destructive",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
