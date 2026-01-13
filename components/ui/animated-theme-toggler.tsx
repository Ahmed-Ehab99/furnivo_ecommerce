"use client";

import type React from "react";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

import { cn } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";
import { Button } from "./button";
import { Skeleton } from "./skeleton";

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number;
  open?: boolean;
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  open,
  ...props
}: AnimatedThemeTogglerProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const { locale } = useParams();
  const isHome = pathname === `/${locale}`;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return;

    const newTheme = theme === "dark" ? "light" : "dark";

    await document.startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme);
      });
    }).ready;

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top),
    );

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  }, [theme, setTheme, duration]);

  if (!mounted) {
    return (
      <button ref={buttonRef} className={cn(className)} {...props}>
        <Skeleton className="size-9" />
        <span className="sr-only">Toggle theme</span>
      </button>
    );
  }

  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(isHome && "hover:bg-secondary/20")}
      {...props}
    >
      {isDark ? (
        <Sun className={cn(isHome && !open && "text-white", "size-5")} />
      ) : (
        <Moon className={cn(isHome && !open && "text-white", "size-5")} />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
