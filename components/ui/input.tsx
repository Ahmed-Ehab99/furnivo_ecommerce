import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "placeholder:text-secondary-foreground/50 selection:bg-primary selection:text-primary-foreground border-secondary-foreground h-9 w-full min-w-0 border-b bg-transparent px-3 py-1 text-base font-medium transition-[color,box-shadow] outline-none placeholder:text-base disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-b-destructive",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
