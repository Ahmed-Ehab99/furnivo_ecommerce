import { Facebook, Instagram, Twitter } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import FooterLogo from "./FooterLogo";

const Footer = () => {
  const t = useTranslations("footer");
  const serviceLinks = [
    t("serviceLinks.serviceOne"),
    t("serviceLinks.serviceTwo"),
    t("serviceLinks.serviceThree"),
  ];
  const categoryLinks = [
    {
      title: t("categoryLinks.categoryOne"),
      href: "/category/living-room",
    },
    {
      title: t("categoryLinks.categoryTwo"),
      href: "/category/bed-room",
    },
    {
      title: t("categoryLinks.categoryThree"),
      href: "/category/kitchen",
    },
  ];
  const socialLinks = [
    {
      icon: Facebook,
      title: t("socialLinks.facebook"),
      href: "#",
    },
    {
      icon: Twitter,
      title: t("socialLinks.twitter"),
      href: "#",
    },
    {
      icon: Instagram,
      title: t("socialLinks.instagram"),
      href: "#",
    },
  ];
  const bottomLinks = [
    { title: t("termsConditions"), href: "/terms" },
    { title: t("privacyPolicy"), href: "/privacy" },
  ];

  return (
    <footer className="bg-secondary pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2 lg:mb-0">
            <FooterLogo />
            <p className="mt-2 max-w-80 font-medium">{t("desc")}</p>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-bold">{t("serviceLinks.title")}</h3>
            <ul className="space-y-3 text-[#1E1E1E]/80 dark:text-[#FFFFFF]/80">
              {serviceLinks.map((service) => (
                <li
                  key={service}
                  className="hover:text-primary w-fit font-medium"
                >
                  {service}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-bold">{t("categoryLinks.title")}</h3>
            <ul className="space-y-3 text-[#1E1E1E]/80 dark:text-[#FFFFFF]/80">
              {categoryLinks.map((category) => (
                <li
                  key={category.title}
                  className="hover:text-primary w-fit font-medium"
                >
                  <Link href={category.href} className="capitalize">
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="font-bold">{t("socialLinks.title")}</h3>
            <ul className="space-y-3 text-[#1E1E1E]/80 dark:text-[#FFFFFF]/80">
              {socialLinks.map(({ title, href, icon: Icon }) => (
                <li
                  key={title}
                  className="hover:text-primary w-fit font-medium"
                >
                  <Link href={href} className="flex items-center gap-2">
                    <Icon className="size-4" />
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="font-gilroy mt-20 flex flex-col justify-between gap-4 text-sm md:flex-row md:items-center">
          <p className="font-normal opacity-40">
            {t("copyright")} &copy; {new Date().getFullYear()}
          </p>
          <ul className="flex gap-4 font-medium">
            {bottomLinks.map((link) => (
              <li
                key={link.title}
                className="hover:text-primary underline opacity-40 hover:opacity-100"
              >
                <Link href={link.href}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
