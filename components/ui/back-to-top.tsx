"use client";

import { cn } from "@/lib/utils";
import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./button";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 0);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Button
      size="icon-lg"
      className={cn(
        "fixed right-2 bottom-2 flex rounded-full transition-all duration-500",
        isVisible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0",
      )}
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
    >
      <ChevronUp />
    </Button>
  );
};

export default BackToTop;
