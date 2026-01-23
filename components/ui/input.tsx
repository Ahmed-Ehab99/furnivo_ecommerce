"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  const isPassword = type === "password";
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <div className="relative w-full">
      <input
        type={isPassword ? (showPassword ? "text" : "password") : type}
        data-slot="input"
        autoComplete={isPassword ? "new-password" : props.autoComplete}
        data-lpignore={isPassword ? "true" : undefined}
        inputMode={isPassword ? "text" : props.inputMode}
        className={cn(
          "selection:bg-primary border-foreground h-9 w-full min-w-0 border-b bg-transparent px-3 py-1 text-base font-medium transition-[color,box-shadow] outline-none placeholder:opacity-60 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          "aria-invalid:border-b-destructive",
          className,
        )}
        {...props}
      />

      {isPassword && (
        <button
          type="button"
          tabIndex={-1}
          aria-label={showPassword ? "Hide password" : "Show password"}
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute end-0 bottom-1.5"
        >
          {showPassword ? (
            <EyeOff className="size-5" />
          ) : (
            <Eye className="size-5" />
          )}
        </button>
      )}
    </div>
  );
}

export { Input };
