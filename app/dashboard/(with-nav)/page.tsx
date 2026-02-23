"use client";

import React from "react";
import { RiSearch2Line } from "react-icons/ri";
import { MdNotificationsNone } from "react-icons/md";
import MobileDashboardNav from "@/components/dashboard/MobileDashboardNav";
import UserInfoPopover from "@/components/UserInfoPopover";
import { useQueryParams } from "@/hooks/useQueryParams";
import LandingDashboard from "@/components/dashboard/LandingDashboard";
import AllUserVideos from "@/components/dashboard/AllUserVideos";
import Footer from "@/components/Footer";
import LaunchVideoToShortsDialog from "@/components/videotoshorts/LaunchVideoToShortsDialog";
import VideoToShorts from "@/components/dashboard/VideoToShorts";


const Page = () => {

  const { getParam } = useQueryParams()

  const section = getParam("section")

  return (
    <>
      <div className="flex flex-row items-center w-full justify-between pt-3 bg-denary">
        {/* mobile hamburger menu */}
        <MobileDashboardNav />



        {/* search bar */}
        <div className="w-[50%] md:max-w-[400px] max-md:hidden  bg-greys3 rounded-md border border-greys1/20 px-3 py-2 flex flex-row items-center gap-2">
          <RiSearch2Line className="text-greys4" />
          <input type="text" placeholder="Search Videos, Categories or Trends" className="bg-transparent outline-none flex-1 text-sm text-white placeholder:text-greys4" />
        </div>

        <div className="flex flex-row items-center gap-3">
          {/* notifications */}
          <div className="cursor-pointer text-greys2/50 hover:text-white transition-all duration-300  rounded-md hover:bg-greys1/10 relative">
            <MdNotificationsNone className="text-xl" />

            <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
          </div>

          {/* user avatar */}
          <UserInfoPopover state="reduced" />
        </div>
      </div>



      <div className="md:h-[calc(100vh-80px)] md:overflow-y-scroll no-scrollbar flex flex-col gap-5 w-full pb-[50px] bg-denary">

        {
          (!section || section === 'home') && <LandingDashboard />
        }

        {
          section === "my-videos" && <AllUserVideos />
        }

        {
          section === 'to-shorts' && <VideoToShorts />
        }





      </div>


    </>
  );
};

export default Page;
