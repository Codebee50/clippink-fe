"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import Logo from "./Logo";
import { appConfig, routeMap } from "@/constants";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "./ui/button";
import { AiOutlineClose } from "react-icons/ai";
import { PiCaretRightLight } from "react-icons/pi";


const Nav = ({ fixed = false, backdrop = false, logoWidth = 30, logoHeight = 30, className = "" }: { fixed?: boolean, backdrop?: boolean, logoWidth?: number, logoHeight?: number, className?: string }) => {
  const navItems = [
    {
      label: "Home",
      href: "/#",
    },
    {
      label: "About",
      href: "/#about",
    },
    {
      label: "Features",
      href: "/#features",
    },
    {
      label: "Waitlist",
      href: "/waitlist",
    },
    // {
    //   label: "Contact",
    //   href: "/contact",
    // },
  ];


  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
  }, [])


  return (
    <div className={`flex justify-between items-center w-full  padding-x py-4 ${fixed ? "fixed top-0 left-0 right-0 z-50" : ""} ${backdrop ? "backdrop-blur-sm" : ""} ${className}`}>
     

      <Logo width={logoWidth} height={logoHeight} />
      <div className="flex items-center gap-7 max-sm:hidden">
        {navItems.map(item => (
          <a href={item.href} key={item.label} className="text-white text-sm font-normal hover:text-senary transition-all duration-300">
            {item.label}
          </a>
        ))}
      </div>
      <div className="flex items-center gap-4 max-sm:hidden">
        <Link href={routeMap.LOGIN} className="bg-senary text-white px-5 text-sm py-2 rounded-sm">
          Login
        </Link>
      </div>

      <div className="sm:hidden">

        <Drawer direction="left" open={drawerOpen} onOpenChange={setDrawerOpen}>
          <DrawerTrigger>
            <RxHamburgerMenu className="text-white text-2xl" />

          </DrawerTrigger>
          <DrawerContent className="bg-denary border-none! w-dvw!">
            <DrawerHeader>
              <DrawerTitle className="hidden">{appConfig.APP_SHORT_NAME}</DrawerTitle>
              <DrawerDescription className="hidden">{appConfig.APP_DESCRIPTION}</DrawerDescription>
            </DrawerHeader>
            <div className="w-full h-full px-4">
              <div className="w-full flex flex-row items-center justify-between">

                <Logo width={30} height={30} />


                <button onClick={() => setDrawerOpen(false)}>
                  <AiOutlineClose size={26} />

                </button>


              </div>


              <div className="w-full mt-[50px] flex flex-col gap-4">

                {navItems.map(item => (
                  <a href={item.href} key={item.label} onClick={() => setDrawerOpen(false)} className="text-white text-lg border-b border-b-greys1/20 py-4 font-normal hover:text-senary transition-all duration-300 flex flex-row items-center justify-between">
                    {item.label}

                    <PiCaretRightLight className="text-greys2" />

                  </a>
                ))}

                <Link href={routeMap.LOGIN} className="bg-senary text-white px-6 py-2 rounded-md w-full mt-[50px] text-center">
                  Get Started
                </Link>

              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default Nav;
