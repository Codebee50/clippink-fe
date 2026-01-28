import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import Logo from "./Logo";

const Nav = ({fixed=false}: {fixed?: boolean}) => {
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
    <div className={`flex justify-between items-center w-full h-[100px] padding-x py-5 ${fixed ? "fixed top-0 left-0 right-0 z-50" : ""}`}>
      {/* <Image
        src="/images/logo.svg"
        alt="logo"
        width={100}
        height={100}
        className="w-[70px] h-[70px]"
      /> */}

      <Logo width={50} height={50} />
      <div className="flex items-center gap-7 max-sm:hidden">
        {navItems.map(item => (
          <Link href={item.href} key={item.label} className="text-white font-intertight font-normal hover:text-senary transition-all duration-300">
            {item.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-4 max-sm:hidden">
        <Link href="/dashboard" className="bg-senary text-white px-6 py-2 rounded-md">
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
