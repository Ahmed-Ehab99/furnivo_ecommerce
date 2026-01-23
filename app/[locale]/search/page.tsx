import SearchInput from "@/components/global/SearchInput";
import { MainRoutesParams } from "@/lib/types";
import { cn } from "@/lib/utils";
import BedRoomImg from "@/public/categories/bed-room/bed-room.webp";
import LivingRoomImg from "@/public/categories/living-room/living-room.webp";
import CenterShape from "@/public/shapes/centerShape.svg";
import SearchLeft from "@/public/shapes/searchLeft.svg";
import ShapeRight from "@/public/shapes/shapeRight.svg";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { use } from "react";

export default function SearchPage({ params }: { params: MainRoutesParams }) {
  const { locale } = use(params);
  const t = useTranslations("search");
  const isArabic = locale === "ar";

  return (
    <section className="relative">
      <div className="layout-spacing flex min-h-dvh flex-col justify-center gap-10 lg:py-0">
        <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative hidden w-full items-center justify-center p-4.5 lg:flex">
            <div className="bg-secondary absolute top-0 left-0 size-[80%] rounded-4xl" />

            <div className="bg-secondary absolute top-1/2 right-0 h-3/5 w-1/2 -translate-y-1/2 rounded-4xl" />

            <div className="relative z-10 aspect-4/3 w-full overflow-hidden rounded-4xl shadow-2xl">
              <Image
                src={BedRoomImg}
                alt="Modern bed room with window and many pillows"
                fill
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 70vw, 800px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:col-span-2 lg:items-center lg:justify-center lg:text-center">
            <h1 className="max-w-xl text-3xl leading-tight font-extrabold md:text-5xl lg:leading-16">
              {t("title")}
            </h1>

            <p className="text-base font-normal opacity-80">{t("desc")}</p>
          </div>

          <div className="relative mx-auto flex w-full max-w-xs items-center justify-center p-4.5">
            <div className="bg-secondary absolute top-0 left-0 size-[80%] rounded-4xl" />

            <div className="bg-secondary absolute top-1/2 right-0 h-3/5 w-1/2 -translate-y-1/2 rounded-4xl" />

            <div className="relative z-10 aspect-4/3 w-full overflow-hidden rounded-4xl shadow-2xl">
              <Image
                src={LivingRoomImg}
                alt="Modern bed room with window and many pillows"
                fill
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 70vw, 800px"
                className="object-cover"
                priority
              />
            </div>
          </div>

          <Image
            src={CenterShape}
            alt="Shape"
            loading="eager"
            className="absolute top-5/12 left-0 -z-50 hidden max-w-80 -translate-y-1/2 md:block lg:left-1/2 lg:max-w-96 lg:-translate-x-1/2"
          />
        </div>

        <SearchInput
          locale={locale}
          className="relative mx-auto flex w-full max-w-lg"
          inputClassName="bg-card placeholder:opacity-70 border border-primary"
        />
      </div>

      <Image
        src={SearchLeft}
        alt="Shape"
        loading="eager"
        className={cn(
          "absolute start-0 top-0 -z-50 hidden max-w-40 lg:block lg:max-w-52",
          isArabic && "rotate-y-180",
        )}
      />
      <Image
        src={ShapeRight}
        alt="Shape"
        loading="eager"
        className={cn(
          "absolute end-0 top-0 -z-50 max-w-40 lg:max-w-52",
          isArabic && "rotate-y-180",
        )}
      />
    </section>
  );
}
