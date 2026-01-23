import CategoriesSec from "@/components/home/CategoriesSec";
import FeaturesSec from "@/components/home/FeaturesSec";
import FurnishSec from "@/components/home/FurnishSec";
import HeroSec from "@/components/home/HeroSec";
import { MainRoutesParams } from "@/lib/types";
import { cn } from "@/lib/utils";
import HomeLeft1 from "@/public/shapes/homeLeft1.svg";
import HomeLeft2 from "@/public/shapes/homeLeft2.svg";
import HomeRight from "@/public/shapes/homeRight.svg";
import Image from "next/image";
import { use } from "react";

const HomePage = ({ params }: { params: MainRoutesParams }) => {
  const { locale } = use(params);
  const isArabic = locale === "ar";

  return (
    <div className="relative">
      <HeroSec locale={locale} />
      <CategoriesSec locale={locale} />
      <FurnishSec locale={locale} />
      <FeaturesSec />

      <Image
        src={HomeLeft1}
        alt="Shape"
        loading="eager"
        className={cn(
          "absolute start-0 top-1/6 -z-50 max-w-40 md:top-1/6 lg:top-1/4 lg:max-w-52",
          isArabic && "rotate-y-180",
        )}
      />
      <Image
        src={HomeRight}
        alt="Shape"
        loading="eager"
        className={cn(
          "absolute end-0 top-[57%] -z-50 max-w-40 md:top-[38%] lg:top-5/12 lg:max-w-52",
          isArabic && "rotate-y-180",
        )}
      />
      <Image
        src={HomeLeft2}
        alt="Shape"
        loading="eager"
        className={cn(
          "absolute start-0 bottom-[19%] max-w-40 md:bottom-[38%] lg:bottom-1/5 lg:max-w-52",
          isArabic && "rotate-y-180",
        )}
      />
    </div>
  );
};

export default HomePage;
