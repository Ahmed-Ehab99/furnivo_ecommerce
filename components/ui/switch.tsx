"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import * as React from "react";

import { cn } from "@/lib/utils";

function Switch({
  className,
  locale,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & { locale: string }) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-primary/50 data-[state=unchecked]:bg-card focus-visible:border-primary focus-visible:ring-primary/50 inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "data-[state=unchecked]:bg-secondary-foreground data-[state=unchecked]: bg-primary pointer-events-none block size-5 rounded-full ring-0 transition-transform data-[state=unchecked]:translate-x-0",
          locale === "ar"
            ? "data-[state=checked]:-translate-x-[calc(100%-3px)]"
            : "data-[state=checked]:translate-x-[calc(100%-2px)]",
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
