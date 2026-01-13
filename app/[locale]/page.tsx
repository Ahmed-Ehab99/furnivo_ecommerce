import CategoriesSec from "@/components/home/CategoriesSec";
import FeaturesSec from "@/components/home/FeaturesSec";
import FurnishSec from "@/components/home/FurnishSec";
import HeroSec from "@/components/home/HeroSec";
import { HomeParams } from "@/lib/types";
import HomeLeft1 from "@/public/shapes/homeLeft1.svg";
import HomeLeft2 from "@/public/shapes/homeLeft2.svg";
import HomeRight from "@/public/shapes/homeRight.svg";
import Image from "next/image";

const HomePage = async ({ params }: { params: HomeParams }) => {
  return (
    <div className="relative">
      <HeroSec />
      <CategoriesSec params={params} />
      <FurnishSec params={params} />
      <FeaturesSec />

      <Image
        src={HomeLeft1}
        alt="Shape"
        className="absolute top-2/5 left-0 -z-50 hidden max-w-52 md:block lg:top-1/2"
      />
      <Image
        src={HomeLeft2}
        alt="Shape"
        className="absolute -bottom-10 left-0 hidden max-w-52 md:block lg:-bottom-40"
      />
      <Image
        src={HomeRight}
        alt="Shape"
        className="absolute right-0 hidden max-w-52 md:bottom-1/3 md:block lg:bottom-120"
      />
    </div>
  );
};

export default HomePage;
