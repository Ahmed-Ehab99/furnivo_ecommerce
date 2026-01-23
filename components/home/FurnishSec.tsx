import FurnishImg from "@/public/furnish.jpg";
import { MoveLeft, MoveRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const FurnishSec = ({ locale }: { locale: string }) => {
  const t = useTranslations("home");

  return (
    <section className="layout-spacing grid grid-cols-1 gap-10 md:grid-cols-2 md:justify-between md:gap-20 lg:gap-32">
      <div className="relative flex w-full items-center justify-center p-5 lg:p-10">
        <div className="bg-secondary absolute top-0 left-0 size-[80%] rounded-4xl" />
        <div className="bg-secondary absolute top-1/2 right-0 h-3/5 w-1/2 -translate-y-1/2 rounded-4xl" />
        <div className="relative z-10 aspect-4/3 w-full overflow-hidden rounded-r-4xl shadow-2xl">
          <Image
            src={FurnishImg}
            alt="Furnish Your Dreams"
            fill
            sizes="(max-width: 768px) 90vw, (max-width: 1200px) 70vw, 800px"
            className="object-cover"
          />
        </div>
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
