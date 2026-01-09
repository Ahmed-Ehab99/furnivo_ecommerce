import LocaleSwitcher from "@/components/ui/local-switcher";
import { AnimatedThemeToggler } from "../../ui/animated-theme-toggler";
import CartBtn from "./CartBtn";
import DesktopNav from "./DesktopNav";
import LoginBtn from "./LoginBtn";
import MobileNav from "./MobileNav";
import NavbarLogo from "./NavbarLogo";
import SearchBtn from "./SearchBtn";

const Navbar = ({ withBorder }: { withBorder?: boolean }) => {
  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${withBorder ? "border-border bg-background border-b backdrop-blur-3xl" : "border-b border-transparent"} `}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <NavbarLogo />

        <div className="block md:hidden">
          <MobileNav />
        </div>

        <nav className="hidden justify-center gap-10 md:flex">
          <DesktopNav />
        </nav>

        <div className="hidden items-center justify-end gap-5 md:flex">
          <SearchBtn />
          <CartBtn />
          <AnimatedThemeToggler />
          <LocaleSwitcher />
          <LoginBtn />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
