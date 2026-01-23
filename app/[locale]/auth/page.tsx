import Heading from "@/components/global/Heading";
import { MainRoutesParams } from "@/lib/types";
import { cn } from "@/lib/utils";
import ShapeLeft from "@/public/shapes/shapeLeft.svg";
import ShapeRight from "@/public/shapes/shapeRight.svg";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { use } from "react";
import AuthTabs from "./_components/AuthTabs";
import SigninCard from "./_components/SigninCard";
import SignupCard from "./_components/SignupCard";

const AuthPage = ({ params }: { params: MainRoutesParams }) => {
  const { locale } = use(params);
  const t = useTranslations("auth");
  const isArabic = locale === "ar";

  return (
    <section className="relative">
      <div className="layout-spacing">
        <Heading
          title={t("title")}
          description={t("desc")}
          className="mx-auto text-center"
        />

        <div className="mx-auto mt-20 block lg:hidden">
          <AuthTabs />
        </div>

        <div className="mx-auto mt-20 hidden max-w-5xl grid-cols-2 gap-2 lg:grid">
          <SigninCard />
          <SignupCard />
        </div>
      </div>

      <Image
        src={ShapeRight}
        alt="Shape"
        loading="eager"
        className={cn(
          "absolute end-0 top-1/5 -z-50 max-w-40 lg:max-w-52",
          isArabic && "rotate-y-180",
        )}
      />
      <Image
        src={ShapeLeft}
        alt="Shape"
        loading="eager"
        className={cn(
          "absolute start-0 bottom-0 -z-50 max-w-40 lg:max-w-52",
          isArabic && "rotate-y-180",
        )}
      />
    </section>
  );
};

export default AuthPage;
