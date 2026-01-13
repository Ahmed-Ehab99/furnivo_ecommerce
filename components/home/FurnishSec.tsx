import { HomeParams } from "@/lib/types";
import FurnishImg from "@/public/furnish.jpg";
import { MoveLeft, MoveRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

const FurnishSec = async ({ params }: { params: HomeParams }) => {
  const { locale } = await params;
  const t = await getTranslations("home");

  return (
    <section className="container mx-auto grid grid-cols-1 gap-10 px-4 mt-40 mb-30 md:grid-cols-2 md:justify-between lg:mb-40">
      <div className="relative w-full">
        <div className="bg-secondary absolute -top-5 left-2 h-45 w-62 rounded-4xl md:-top-5 md:left-2 md:w-60 lg:-top-8 lg:left-0 lg:h-full lg:w-108" />

        <div className="bg-secondary absolute top-1/2 right-3 h-2/3 w-1/2 -translate-y-1/2 rounded-4xl md:right-8 lg:right-22" />

        <Image
          src={FurnishImg}
          alt="Furnish Your Dreams"
          className="relative right-9 z-10 w-4/5 rounded-r-4xl object-cover shadow-2xl md:-right-8 md:w-3/4"
        />
      </div>

      <div className="flex flex-col justify-center gap-3 lg:gap-10">
        <h2 className="max-w-120 text-2xl font-extrabold md:text-3xl lg:text-[2.5rem]">
          {t("discover.title")}
        </h2>

        <p className="max-w-140 text-base font-normal opacity-80 lg:text-lg">
          {t("discover.desc")}
        </p>

        <Link
          href="/shop"
          className="text-primary lg:text-md flex items-center gap-3 text-sm font-medium"
        >
          {t("moreInfo")} {locale === "ar" ? <MoveLeft /> : <MoveRight />}
        </Link>
      </div>
    </section>
  );
};

export default FurnishSec;
