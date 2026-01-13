import DarkSearch from "@/public/dark-search.svg";
import HeroImg from "@/public/hero.png";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Input } from "../ui/input";

const HeroSec = () => {
  const t = useTranslations("home");

  return (
    <section className="relative h-dvh w-full">
      <Image
        src={HeroImg}
        alt="Hero Image"
        className="object-cover object-[20%] md:object-center lg:object-bottom"
        fill
      />
      <div className="absolute inset-0 z-10 flex h-full flex-col items-center justify-center space-y-5 px-4 text-center">
        <h1 className="font-gilroy max-w-76 text-4xl leading-tight font-extrabold tracking-tight text-white capitalize md:max-w-150 md:text-5xl lg:max-w-5xl lg:text-[5rem]">
          {t("title")}
        </h1>
        <p className="font-gilroy max-w-76 text-base font-extrabold text-white/80 md:max-w-89 md:text-2xl lg:max-w-150 lg:text-2xl">
          {t("desc")}
        </p>
        <div className="relative hidden w-2xs lg:flex">
          <Input
            placeholder={`${t("search")}`}
            className="font-montserrat h-fit rounded-full border-none bg-[#FDFDFD]/30 py-2.5 pr-10 text-sm text-white backdrop-blur-xs placeholder:font-light placeholder:text-white"
          />
          <Image
            src={DarkSearch}
            alt={`${t("search")}`}
            className="absolute top-1/2 right-2 size-7 -translate-y-1/2"
          />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 h-60 w-full bg-linear-to-t from-white/80 via-white/40 to-transparent" />
    </section>
  );
};

export default HeroSec;
