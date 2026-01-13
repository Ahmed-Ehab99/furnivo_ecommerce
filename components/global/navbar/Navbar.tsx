import LocaleSwitcher from "@/components/ui/local-switcher";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { AnimatedThemeToggler } from "../../ui/animated-theme-toggler";
import CartBtn from "./CartBtn";
import DesktopNav from "./DesktopNav";
import LoginBtn from "./LoginBtn";
import MobileNav from "./MobileNav";
import NavbarLogo from "./NavbarLogo";
import SearchBtn from "./SearchBtn";
import SignoutBtn from "./SignoutBtn";

const Navbar = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="container mx-auto flex items-center justify-between px-4">
      <NavbarLogo />

      <div className="block md:hidden">
        <MobileNav session={session} />
      </div>

      <nav className="hidden justify-center gap-10 md:flex">
        <DesktopNav />
      </nav>

      <div className="hidden items-center justify-end gap-5 md:flex">
        <SearchBtn />
        <CartBtn />
        <AnimatedThemeToggler />
        <LocaleSwitcher />
        {session ? <SignoutBtn /> : <LoginBtn />}
      </div>
    </header>
  );
};

export default Navbar;
