import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ShapeLeft from "@/public/shapes/shapeLeft.svg";
import ShapeRight from "@/public/shapes/shapeRight.svg";
import { ArrowLeft, Home } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const NotFound = ({ tKey }: { tKey: string }) => {
  const t = useTranslations(tKey);

  return (
    <section className="relative flex min-h-screen items-center justify-center">
      <div className="container mx-auto max-w-3xl space-y-8 px-4 py-32 text-center md:space-y-10">
        {/* Decorative 404 number */}
        <h1 className="text-primary text-[8rem] leading-none font-extrabold md:text-[12rem] lg:text-[15rem]">
          404
        </h1>

        {/* Main message */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            {t("title")}
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg md:text-xl">
            {t("description")}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col justify-center gap-4 pt-6 sm:flex-row">
          <Button asChild size="lg" className="min-w-[180px] gap-2">
            <Link href="/">
              <Home className="size-5" />
              {t("backToHome")}
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="min-w-[180px] gap-2"
          >
            <Link href="/shop">
              <ArrowLeft className="size-5" />
              {t("browseShop")}
            </Link>
          </Button>
        </div>
      </div>
      <Image
        src={ShapeRight}
        alt="Shape"
        loading="lazy"
        className={cn(
          "absolute end-0 top-0 -z-50 max-w-28 md:max-w-40 lg:max-w-52",
          "rtl:rotate-y-180",
        )}
      />
      <Image
        src={ShapeLeft}
        alt="Shape"
        loading="lazy"
        className={cn(
          "absolute start-0 bottom-0 -z-50 max-w-28 md:max-w-40 lg:max-w-52",
          "rtl:rotate-y-180",
        )}
      />
    </section>
  );
};

export default NotFound;
