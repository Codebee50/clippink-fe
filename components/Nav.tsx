import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import Logo from "./Logo";
import { routeMap } from "@/constants";

const Nav = ({ fixed = false, backdrop = false, logoWidth = 50, logoHeight = 50, className = "" }: { fixed?: boolean, backdrop?: boolean, logoWidth?: number, logoHeight?: number, className?: string }) => {
  const navItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Features",
      href: "/features",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ];
  return (
    <div className={`flex justify-between items-center w-full  padding-x py-5 ${fixed ? "fixed top-0 left-0 right-0 z-50" : ""} ${backdrop ? "backdrop-blur-sm" : ""} ${className}`}>
      {/* <Image
        src="/images/logo.svg"
        alt="logo"
        width={100}
        height={100}
        className="w-[70px] h-[70px]"
      /> */}

      <Logo width={logoWidth} height={logoHeight} />
      <div className="flex items-center gap-7 max-sm:hidden">
        {navItems.map(item => (
          <Link href={item.href} key={item.label} className="text-white text-sm font-normal hover:text-senary transition-all duration-300">
            {item.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-4 max-sm:hidden">
        <Link href={routeMap.LOGIN} className="bg-senary text-white px-6 py-2 rounded-md">
          Login
        </Link>
      </div>

      <div className="sm:hidden">
        <RxHamburgerMenu className="text-white text-2xl" />
      </div>
    </div>
  );
};

export default Nav;
