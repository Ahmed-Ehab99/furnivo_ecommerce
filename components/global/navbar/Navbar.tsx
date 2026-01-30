"use client";

import LocaleSwitcher from "@/components/ui/local-switcher";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import { AnimatedThemeToggler } from "../../ui/animated-theme-toggler";
import CartBtn from "./CartBtn";
import DesktopNav from "./DesktopNav";
import LoginBtn from "./LoginBtn";
import MobileNav from "./MobileNav";
import NavbarLogo from "./NavbarLogo";
import SearchBtn from "./SearchBtn";
import SignoutBtn from "./SignoutBtn";

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();

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
        {isPending ? (
          <Skeleton className="h-9 w-18.5" />
        ) : session ? (
          <SignoutBtn />
        ) : (
          <LoginBtn />
        )}
      </div>
    </header>
  );
};

export default Navbar;
