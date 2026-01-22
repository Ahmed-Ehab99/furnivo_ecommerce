import Heading from "@/components/global/Heading";
import AuthLeft from "@/public/shapes/authLeft.svg";
import AuthRight from "@/public/shapes/authRight.svg";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import AuthTabs from "./_components/AuthTabs";
import SigninCard from "./_components/SigninCard";
import SignupCard from "./_components/SignupCard";

const AuthPage = async () => {
  const t = await getTranslations("auth");

  return (
    <section className="layout-spacing">
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

      <Image
        src={AuthRight}
        alt="Shape"
        className="absolute top-1/2 right-0 -z-50 hidden max-w-40 md:block lg:max-w-52"
      />
      <Image
        src={AuthLeft}
        alt="Shape"
        className="absolute bottom-5 left-0 -z-50 hidden max-w-40 md:block lg:max-w-52"
      />
    </section>
  );
};

export default AuthPage;
