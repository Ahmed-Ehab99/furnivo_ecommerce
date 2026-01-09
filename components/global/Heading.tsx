"use client";

import { useTranslations } from "next-intl";

const Heading = ({
  title,
  description,
  place,
}: {
  title: string;
  description: string;
  place: string;
}) => {
  const t = useTranslations(place);

  return (
    <div className="mx-auto flex flex-col gap-4 text-center">
      <h1 className="font-gilroy text-secondary-foreground text-6xl font-extrabold tracking-tight">
        {t(`${title}`)}
      </h1>
      <p className="text-xl font-normal text-[#262626]/80 dark:text-white/80">
        {t(`${description}`)}
      </p>
    </div>
  );
};

export default Heading;
