import { FeatureItem } from "@/lib/types";
import FeatureOneImg from "@/public/feature1.jpg";
import FeatureTwoImg from "@/public/feature2.jpg";
import FeatureThreeImg from "@/public/feature3.jpg";
import { useTranslations } from "next-intl";
import FeatureCard from "./FeatureCard";
import FeaturesMobileSec from "./FeaturesMobileSec";

const FeaturesSec = () => {
  const t = useTranslations("home.features");
  const features: FeatureItem[] = [
    { id: 1, image: FeatureOneImg, title: t("one.title"), desc: t("one.desc") },
    { id: 2, image: FeatureTwoImg, title: t("two.title"), desc: t("two.desc") },
    {
      id: 3,
      image: FeatureThreeImg,
      title: t("three.title"),
      desc: t("three.desc"),
    },
  ];

  return (
    <section className="dark:bg-secondary bg-[#FFF9F1]">
      <div className="container mx-auto mb-30 flex flex-col gap-10 px-4 py-26 lg:mb-40">
        <div className="mx-auto flex flex-col items-center gap-2 px-4 text-center md:px-0">
          <span className="text-primary text-lg font-normal tracking-widest uppercase">
            {t("subTitle")}
          </span>
          <h2 className="text-[2.5rem] font-bold capitalize">{t("title")}</h2>
        </div>

        <div className="hidden grid-cols-1 justify-between gap-17 md:grid md:grid-cols-2 lg:grid-cols-3">
          {features.map((item, index) => {
            const isLast = index === features.length - 1;
            return (
              <FeatureCard
                key={item.id}
                item={item}
                className={`${isLast && "md:col-span-2 lg:col-span-1"} shadow-2xl`}
              />
            );
          })}
        </div>

        <FeaturesMobileSec features={features} />
      </div>
    </section>
  );
};

export default FeaturesSec;
