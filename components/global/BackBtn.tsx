"use client";

import { MoveLeft, MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const BackBtn = ({ isArabic }: { isArabic: boolean }) => {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="hover:text-primary"
      onClick={() => {
        if (window.history.length > 1) {
          router.back();
        } else {
          router.push("/");
        }
      }}
      aria-label="Go back"
    >
      {isArabic ? <MoveRight /> : <MoveLeft />}
    </Button>
  );
};

export default BackBtn;
