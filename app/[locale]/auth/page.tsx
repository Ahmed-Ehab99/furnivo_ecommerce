import Heading from "@/components/global/Heading";
import AuthLeft from "@/public/shapes/authLeft.svg";
import AuthRight from "@/public/shapes/authRight.svg";
import Image from "next/image";
import AuthTabs from "./_components/AuthTabs";
import SigninCard from "./_components/SigninCard";
import SignupCard from "./_components/SignupCard";

const AuthPage = () => {
  return (
    <section className="container mx-auto px-4 pt-32 pb-32">
      <Heading title="title" description="desc" place="auth" />
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
        className="absolute top-1/2 right-0 -z-50 hidden max-w-52 md:block"
      />
      <Image
        src={AuthLeft}
        alt="Shape"
        className="absolute bottom-5 left-0 -z-50 hidden max-w-52 md:block"
      />
    </section>
  );
};

export default AuthPage;
