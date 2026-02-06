"use client";

import BreadCrumbs from "@/components/BreadCrumbs";
import { BreadCrumbItem } from "@/lib/types/global";
import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { ImFileText2 } from "react-icons/im";
import { PiTextAaBold } from "react-icons/pi";
import ScriptToVideoForm from "@/components/forms/ScriptToVideoForm";
import { VideoResponse } from "@/lib/types/video";
import useFetchRequest from "@/hooks/useFetch";
import { makeMsUrl } from "@/constants";
import { AxiosResponse } from "axios";
import VideoPlayer from "@/components/video/VideoPlayer";
import { getDefaultCaptionSettings } from "@/lib/utils/caption";

const breadCrumbs: BreadCrumbItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Create Video",
    href: "/dashboard/video/create",
  },
];

const videoTypeOptions = [
  {
    label: "Script to video",
    value: "script-to-video",
    Icon: ImFileText2,
  },
  {
    label: "Text to video",
    value: "text-to-video",
    Icon: PiTextAaBold,
  },
];

const Page = () => {


  const [sampleVideo, setSampleVideo] = useState<VideoResponse | null>(null)

  const { mutate: getSampleVideo, isLoading: isGettingSampleVideo } = useFetchRequest({
    url: `/video/sample`,
    onSuccess: (response: AxiosResponse) => {
      const data = response.data as VideoResponse;
      if (!data.caption_settings) {
        data.caption_settings = getDefaultCaptionSettings()
      }
      setSampleVideo(data);
    },
  });

  useEffect(() => {
    getSampleVideo();
  }, []);
  return (
    <>
      <div className="pt-4 pb-2 w-full fixed top-0 backdrop-blur-3xl">
        <BreadCrumbs breadCrumbs={breadCrumbs} />
      </div>
      <div className="w-full flex flex-row gap-4 justify-between ">

        <div className="flex flex-col gap-5 overflow-y-scroll no-scrollbar h-dvh flex-2/6">
          <div className="sm:mt-[100px] mt-[80px]">
            <h1>Create A New Video</h1>
            <p className="text-sm text-greys2/50">Select a tool and pick your options to create your video</p>
          </div>

          <div className="flex flex-col gap-2 border-b border-b-greys1/30 pb-4">
            <p>Video Type</p>
            <Select defaultValue={videoTypeOptions[0].value}>
              <SelectTrigger className="border-greys1/30">
                <SelectValue placeholder="Select a video style" />
              </SelectTrigger>
              <SelectContent className="bg-greys3 flex flex-col gap-2">
                {videoTypeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value} className="border-none! outline-none! hover:bg-greys1/10! focus:bg-greys1/10!">
                    <div className="flex flex-row items-center gap-2 text-white py-3 px-2">
                      <option.Icon size={10} className="text-senary" />
                      <p className="text-sm">{option.label}</p>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <ScriptToVideoForm />

          <div className="h-[100px]">

          </div>
        </div>

        <div className="flex h-full justify-center pt-[100px]  flex-1 max-lg:hidden">
          <div className="w-full max-h-[500px] max-w-[350px]">
            <VideoPlayer video={sampleVideo ?? null} />

          </div>
        </div>

      </div>


    </>
  );
};

export default Page;
