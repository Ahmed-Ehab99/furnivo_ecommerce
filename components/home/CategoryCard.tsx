import { MoveLeft, MoveRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  desc: string;
  slug: string;
  locale: string;
}

const CategoryCard = ({
  imageSrc,
  imageAlt,
  title,
  desc,
  slug,
  locale,
}: CategoryCardProps) => {
  const t = useTranslations("home");

  return (
    <div className="flex flex-col gap-5">
      <Image
        src={imageSrc}
        alt={imageAlt}
        className="w-full rounded-xl"
        width={500}
        height={500}
      />
      <h3 className="font-gilroy text-2xl font-extrabold">{title}</h3>
      <p className="font-gilroy text-muted-foreground text-base font-light">
        {desc}
      </p>
      <Link
        href={`/category/${slug}`}
        className="font-gilroy text-primary mt-auto flex items-center gap-3 text-md font-medium"
      >
        {t("moreInfo")} {locale === "ar" ? <MoveLeft /> : <MoveRight />}
      </Link>
    </div>
  );
};

export default CategoryCard;
