"use client";

import React, { useState } from "react";
import Logo from "../Logo";
import { TbLayoutSidebarRight } from "react-icons/tb";

import { MdHome } from "react-icons/md";
import { LuShoppingBag } from "react-icons/lu";
import { BsAlphabet } from "react-icons/bs";
import { TbScriptPlus } from "react-icons/tb";
import { IoMdEye } from "react-icons/io";
import { LuPizza } from "react-icons/lu";
import { MdFace2 } from "react-icons/md";
import { GiFruitBowl } from "react-icons/gi";

import Image from "next/image";

import { RiExpandUpDownLine } from "react-icons/ri";
import { MdAccountBalanceWallet } from "react-icons/md";
import { IoMdInformationCircle } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";
import { RoundedUserAvatar } from "../RoundedUserAvatar";
import { MdOutlineClose } from "react-icons/md";
import { useUserStore } from "@/hooks/useUser";
import UserInfoPopover from "../UserInfoPopover";

const navSections = [
  {
    title: "DASHBOARD",
    items: [
      { label: "Home", Icon: MdHome },
      { label: "Marketplace", Icon: LuShoppingBag },
    ],
  },
  {
    title: "CREATION",
    items: [
      { label: "Prompt to video", Icon: BsAlphabet },
      { label: "Script to video", Icon: TbScriptPlus },
    ],
  },
  {
    title: "TRENDS",
    items: [
      { label: "POV Videos", Icon: IoMdEye },
      { label: "Italian Bainrot", Icon: LuPizza },
      { label: "User Generated Content", Icon: MdFace2 },
      { label: "AI ASMR", Icon: GiFruitBowl },
    ],
  },
];

const DashboardNav = ({ isMobile = false, onMobileClose = () => { } }: { isMobile?: boolean, onMobileClose?: () => void }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(navSections[0].items[0].label);
  const [layoutState, setLayoutState] = useState<"reduced" | "expanded">("expanded");
  const { user } = useUserStore()
  return (
    <div className={`md:w-[40%] md:max-w-[250px] md:h-full max-md:h-screen  flex flex-col items-center  border-r border-r-greys1/20 shrink-0 bg-greys3/70 transition-all duration-300  ${isMobile ? "" : "max-md:hidden"} ${layoutState == "reduced" ? "w-max" : ""}`}>
      <div className="flex flex-row items-center justify-between w-full border-b border-b-greys1/20 px-5 h-[60px]">

        {
          layoutState == "expanded" && (
            <Logo showText={true} width={30} height={30} fontSize={16} />
          )
        }

        <button className="cursor-pointer text-greys2/50 hover:text-white transition-all duration-300 p-2 rounded-md hover:bg-greys1/10 max-md:hidden" onClick={() => setLayoutState(layoutState === "expanded" ? "reduced" : "expanded")}>
          <TbLayoutSidebarRight className=" text-xl" />
        </button>

        <button onClick={onMobileClose} className="md:hidden w-[40px] h-[40px] flex items-center justify-center border border-greys1/20 rounded-md">
          <MdOutlineClose className="text-greys2/50 hover:text-white transition-all duration-300 text-xl" />

        </button>
      </div>

      <div className="flex-1 w-full flex flex-col justify-between max-md:flex-1  h-full max-h-[calc(100dvh-60px)] max-md:overflow-y-scroll">
        <div className={`flex flex-col  md:h-[40%] md:overflow-y-scroll cus-scrollbar px-3 py-5 ${layoutState == "reduced" ? "gap-0" : "gap-6"}`}>
          {navSections.map(section => (
            <div key={section.title} className="flex flex-col gap-2">

              {
                layoutState == "expanded" && <p className="text-greys1 uppercase font-medium text-xs ">{section.title}</p>
              }
              <div className={`flex flex-col gap-1 ${layoutState == "reduced" ? "gap-2" : ""}`}>
                {section.items.map(item => {
                  const isSelected = selectedItem === item.label;
                  return (
                    <div
                      key={item.label}
                      className={`flex flex-row items-center gap-2  ${isSelected ? "text-senary bg-senary/5" : "text-white"
                        } hover:bg-greys1/10 rounded-md py-2 px-3 cursor-pointer transition-all duration-300`}
                      onClick={() => setSelectedItem(item.label)}
                    >
                      <item.Icon />

                      {
                        layoutState == "expanded" && <p className="text-sm">{item.label}</p>

                      }
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* subscription card */}
        <div className="flex flex-col px-3 items-center">
          <div className="bg-greys3 rounded-full w-[50px] h-[50px] flex items-center justify-center -mb-5 z-10">
            <div className="w-[70%] h-[70%] bg-[#1D1D20] rounded-full flex items-center justify-center border border-greys1/20">
              <FaCircleUser />
            </div>
          </div>

          {
            layoutState == "expanded" && <div className=" bg-[#1D1D20] middle-curve-clip rounded-md border border-greys1/20 w-full flex flex-col  pt-6 px-3 pb-3">
              <p className="text-[0.6rem] uppercase text-greys4 font-semibold">CURRENT PLAN</p>

              <div className="flex flex-row items-center w-full justify-between pt-3 pb-2 border-b-[0.5px] border-b-greys4/50">
                <p className="font-semibold">Premium</p>

                <div className="flex flex-row items-end gap-1">
                  <p className="text-sm font-semibold">12.99</p>
                  <p className="text-xs text-greys4">USD</p>
                </div>
              </div>
              <div className="flex flex-row items-center text-greys4 text-xs mt-1 gap-1">
                <IoMdInformationCircle />
                <p className="font-medium">12 February 2027</p>
              </div>

              <button className="w-full bg-senary text-denary px-4 py-1 rounded-md mt-4">
                <p className="text-sm font-medium">Upgrade Plan</p>
              </button>
            </div>
          }

        </div>

        <UserInfoPopover state={layoutState} />

      </div>
    </div>
  );
};

export default DashboardNav;
