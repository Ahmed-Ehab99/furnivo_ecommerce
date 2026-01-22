import Heading from "@/components/global/Heading";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { CategoryResult } from "@/lib/types";
import { ChevronLeft, ChevronRight, MoveLeft, MoveRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

interface CategoryHeroProps {
  category: CategoryResult;
  locale: string;
}

const CategoryHero = ({ locale, category }: CategoryHeroProps) => {
  const t = useTranslations("general");
  const isArabic = locale === "ar";

  return (
    <section className="grid grid-cols-1 items-center md:grid-cols-2 md:gap-10 lg:gap-20">
      <div className="order-last flex h-full flex-col md:order-first">
        <div className="text-primary flex flex-col gap-2">
          <Button variant="ghost" size="icon" className="hover:text-primary">
            <Link href="/">{isArabic ? <MoveRight /> : <MoveLeft />}</Link>
          </Button>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="hover:text-primary/80">
                  {t("categories")}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                {isArabic ? <ChevronLeft /> : <ChevronRight />}
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-primary">
                  {category.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <Heading
          title={`${t("all")} ${category.title}`}
          description={category.description}
          className="mt-10 lg:mt-20"
        />
      </div>

      <div className="flex w-full items-center justify-end">
        <div className="relative w-full max-w-140 p-5 lg:p-10">
          <div className="bg-secondary absolute top-0 left-0 size-[80%] rounded-4xl" />

          <div className="bg-secondary absolute top-1/2 right-0 h-3/5 w-1/2 -translate-y-1/2 rounded-4xl" />

          <div className="relative z-10 aspect-4/3 w-full overflow-hidden rounded-4xl shadow-2xl">
            <Image
              src={category.thumbnail}
              alt={category.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 629px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryHero;
