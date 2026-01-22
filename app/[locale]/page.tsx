import CategoriesSec from "@/components/home/CategoriesSec";
import FeaturesSec from "@/components/home/FeaturesSec";
import FurnishSec from "@/components/home/FurnishSec";
import HeroSec from "@/components/home/HeroSec";
import { MainRoutesParams } from "@/lib/types";
import HomeLeft1 from "@/public/shapes/homeLeft1.svg";
import HomeLeft2 from "@/public/shapes/homeLeft2.svg";
import HomeRight from "@/public/shapes/homeRight.svg";
import Image from "next/image";

const HomePage = async ({ params }: { params: MainRoutesParams }) => {
  return (
    <div className="relative">
      <HeroSec params={params} />
      <CategoriesSec params={params} />
      <FurnishSec params={params} />
      <FeaturesSec />

      <Image
        src={HomeLeft1}
        alt="Shape"
        className="absolute top-1/6 left-0 -z-50 max-w-40 lg:top-1/4 lg:max-w-52"
      />
      <Image
        src={HomeRight}
        alt="Shape"
        className="absolute right-0 bottom-2/5 max-w-40 lg:bottom-5/12 lg:max-w-52"
      />
      <Image
        src={HomeLeft2}
        alt="Shape"
        className="absolute bottom-2/5 left-0 max-w-40 lg:bottom-1/5 lg:max-w-52"
      />
    </div>
  );
};

export default HomePage;
