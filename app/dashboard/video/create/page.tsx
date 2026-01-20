import BreadCrumbs from "@/components/BreadCrumbs";
import { BreadCrumbItem } from "@/lib/types/global";
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { ImFileText2 } from "react-icons/im";
import { PiTextAaBold } from "react-icons/pi";
import ScriptToVideoForm from "@/components/forms/ScriptToVideoForm";


const Page = () => {
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
  return (
    <>
      <div className="pt-4 pb-2 w-full fixed top-0 backdrop-blur-3xl">
        <BreadCrumbs breadCrumbs={breadCrumbs} />
      </div>
      <div className="flex flex-col gap-5 pt-20 max-w-[750px] overflow-y-scroll no-scrollbar">
        <div>
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
      </div>
    </>
  );
};

export default Page;
