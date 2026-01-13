import { cn } from "@/lib/utils";
import FeatureOneImg from "@/public/feature1.jpg";
import FeatureTwoImg from "@/public/feature2.jpg";
import FeatureThreeImg from "@/public/feature3.jpg";
import { useTranslations } from "next-intl";
import Image from "next/image";

const FeaturesSec = () => {
  const t = useTranslations("home.features");
  const featurescard = [
    { image: FeatureOneImg, title: t("one.title"), desc: t("one.desc") },
    { image: FeatureTwoImg, title: t("two.title"), desc: t("two.desc") },
    { image: FeatureThreeImg, title: t("three.title"), desc: t("three.desc") },
  ];

  return (
    <section className="dark:bg-secondary bg-[#FFF9F1]">
      <div className="container mx-auto mb-30 flex flex-col gap-10 px-4 py-26 lg:mb-40">
        <div className="mx-auto flex flex-col items-center gap-2">
          <span className="text-primary text-lg font-normal tracking-widest uppercase">
            {t("subTitle")}
          </span>
          <h2 className="text-[2.5rem] font-bold capitalize">{t("title")}</h2>
        </div>

        <div className="grid grid-cols-1 justify-between gap-17 md:grid-cols-2 lg:grid-cols-3">
          {featurescard.map((item, index) => {
            const isLast = index === featurescard.length - 1;
            return (
              <div
                key={item.title}
                className={cn(
                  "relative z-20 h-120 rounded-3xl shadow-2xl",
                  isLast && "md:col-span-2 lg:col-span-1",
                )}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  className="rotate-y-180 rounded-3xl object-cover"
                  fill
                />
                <div className="absolute right-4.5 bottom-4.5 left-4.5 flex flex-col gap-8 rounded-3xl bg-white/50 px-5 py-10 text-center backdrop-blur-md md:h-1/2 lg:px-10.5 lg:py-15">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="text-sm font-normal">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSec;
