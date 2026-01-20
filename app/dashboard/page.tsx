"use client";

import DashboardNav from "@/components/dashboard/DashboardNav";
import React, { useEffect, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { MdNotificationsNone } from "react-icons/md";
import Image from "next/image";
import { RoundedUserAvatar } from "@/components/RoundedUserAvatar";
import { IoCreateOutline } from "react-icons/io5";
import useFetchRequest from "@/hooks/useFetch";
import { makeMsUrl } from "@/constants";
import { AxiosResponse } from "axios";
import { VideoResponse } from "@/lib/types/video";
import { useRouter } from "next/navigation";
import VideoListCard from "@/components/video/VideoListCard";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";

const Page = () => {
  const [userVideos, setUserVideos] = useState<VideoResponse[]>([]);
  const router = useRouter();
  const { mutate: fetchVideos, isLoading: isFetchingVideos } = useFetchRequest({
    url: makeMsUrl(`/video/user-videos/`),
    onSuccess: (response: AxiosResponse) => {
      const data = response.data as VideoResponse[];
      setUserVideos(data);
    },
  });

  useEffect(() => {
    fetchVideos();
  }, []);
  return (
    <>
      <div className="flex flex-row items-center w-full justify-between pt-3 pb-2">
        {/* search bar */}
        <div className="w-[50%] max-w-[400px]  bg-greys3 rounded-md border border-greys1/20 p-3 flex flex-row items-center gap-2">
          <RiSearch2Line className="text-greys4" />
          <input type="text" placeholder="Search Videos, Categories or Trends" className="bg-transparent outline-none flex-1 text-sm text-white placeholder:text-greys4" />
        </div>

        <div className="flex flex-row items-center gap-4">
          {/* notifications */}
          <div className="cursor-pointer text-greys2/50 hover:text-white transition-all duration-300  rounded-md hover:bg-greys1/10 relative">
            <MdNotificationsNone className="text-xl" />

            <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></div>
          </div>

          {/* user avatar */}
          <RoundedUserAvatar width={40} height={40} />
        </div>
      </div>

      <div className="h-[calc(100vh-80px)] overflow-y-scroll no-scrollbar flex flex-col gap-5 w-full">
        <div className="flex flex-col gap-4 text-lg w-full">
          <div className="w-full flex flex-row items-center justify-between">
            <p>Recently Created</p>

            <div className="flex flex-row items-center gap-2">
              <button className="border border-greys1/20 rounded-md p-2 text-greys1 cursor-pointer">
                <IoMdArrowBack />
              </button>
              <button className="border border-greys1/20 rounded-md p-2 text-greys1 cursor-pointer">
                <IoMdArrowForward />
              </button>
            </div>
          </div>

          <div className="w-full  flex flex-row overflow-scroll no-scrollbar gap-4">
            {userVideos.map(video => {
              return <VideoListCard key={video.id} video={video} />;
            })}
          </div>
        </div>
        {/* banner */}
        <div className="w-full h-[350px] rounded-lg overflow-hidden bg-greys3 border border-[#2F2F2F] relative shrink-0">
          <Image src="/images/dashbanner.jpg" alt="Generate content using AI" width={1000} height={1000} className="w-full h-full object-cover object-center" />

          <div className="absolute inset-0 bg-linear-to-tr from-denary/95 from-20% to-denary  via-transparent flex flex-col justify-between p-4">
            <div className="bg-[#3C3C40]/50 w-max text-sm px-4 py-1 rounded-full text-center border border-white/10">🔥Now Trending</div>

            <div className="flex flex-col gap-2 mb-5">
              <h1 className="text-4xl font-semibold capitalize">
                Step into the world of <br /> Automated faceless videos
              </h1>
              <p className="max-w-[500px] text-greys2/50 text-sm">
                Our advanced AI tool is here to automate the creation of high-quality faceless videos, turning any idea into a ready-to-publish video in seconds.
              </p>

              <div className="flex flex-row items-center gap-2 mt-1">
                <button className="bg-senary text-white px-4 py-2 rounded-md flex flex-row items-center gap-2 cursor-pointer" onClick={() => router.push("/dashboard/video/create")}>
                  <IoCreateOutline className="text-lg" />
                  <p className="text-sm  capitalize">Create new video</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
