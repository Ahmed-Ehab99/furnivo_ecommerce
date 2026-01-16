"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { FeatureItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import FeatureCard from "./FeatureCard";

interface FeaturesMobileProps {
  features: FeatureItem[];
}

export default function FeaturesMobileSec({ features }: FeaturesMobileProps) {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="relative w-full md:hidden">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
          direction: isRtl ? "rtl" : "ltr",
        }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: false,
          }),
        ]}
        className="w-full"
      >
        <CarouselContent className="-ml-2">
          {features.map((item) => (
            <CarouselItem key={item.id} className="basis-full pl-2 md:pl-4">
              <FeatureCard item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="mt-5 flex w-full items-center justify-center gap-1">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-2.5 rounded-full transition-all duration-400 ease-out",
                current === index
                  ? "bg-primary w-9.5 shadow-sm"
                  : "bg-secondary-foreground w-2.5",
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
}
