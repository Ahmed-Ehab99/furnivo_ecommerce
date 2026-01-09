"use client";

import { useEffect, useState } from "react";
import Navbar from "./Navbar";

const NavbarScrollWrapper = () => {
  const [withBorder, setWithBorder] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setWithBorder(window.scrollY > 0);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <Navbar withBorder={withBorder} />;
};

export default NavbarScrollWrapper;
