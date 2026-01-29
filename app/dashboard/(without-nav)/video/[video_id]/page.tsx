"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Logo from "@/components/Logo";
import Image from "next/image";

import { FaPhotoVideo } from "react-icons/fa";
import { FaRegClosedCaptioning } from "react-icons/fa";
import { HiOutlineMicrophone } from "react-icons/hi";
import { HiOutlineMusicNote } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import useFetchRequest from "@/hooks/useFetch";
import { makeMsUrl } from "@/constants";
import { SceneAudioGeneratedPayload, SceneGeneratedPayload, SceneImageGeneratedPayload, VideoResponse, VideoWsProgressMessageBody } from "@/lib/types/video";
import axios, { AxiosError, AxiosResponse } from "axios";
import VideoPlayer from "@/components/video/VideoPlayer";
import ReconnectingWebSocket from 'reconnecting-websocket';
import GooeyBalls from "@/components/loaders/GooeyBalls";
import VideoGenerationAnimation from "@/components/VideoGenerationAnimation";
import { BiExport } from "react-icons/bi";
import { BreadCrumbItem } from "@/lib/types/global";
import BreadCrumbs from "@/components/BreadCrumbs";
import { RiAppsFill } from "react-icons/ri";
import { MdOutlineVideoCameraBack } from "react-icons/md";
import { useVideoStore } from "@/lib/store/video";
import { VideoIcon } from "lucide-react";
import SceneList from "@/components/video/SceneList";
import { RxCaretLeft } from "react-icons/rx";
import ExportVideoButton from "@/components/video/ExportVideoButton";
import UserInfoPopover from "@/components/UserInfoPopover";


const sideNavItems = [
  {
    Label: "Video",
    Icon: MdOutlineVideoCameraBack,
    id: "video",
  },
  {
    Label: "Frames",
    Icon: FaPhotoVideo,
    id: "frames",
  },
  {
    Label: "Captions",
    Icon: FaRegClosedCaptioning,
    id: "captions",
  },
  {
    Label: "Voiceover",
    Icon: HiOutlineMicrophone,
    id: "voiceover",
  },
  {
    Label: "Audio",
    Icon: HiOutlineMusicNote,
    id: "audio",
  },
  {
    Label: "General",
    Icon: IoSettingsOutline,
    id: "general",
  },
];

const MobileBottomNavItem = ({ label, Icon, onClick = () => { }, active = false }: { label: string, Icon: React.ElementType, onClick?: () => void, active?: boolean }) => {
  return (
    <div onClick={onClick} className={`flex flex-col items-center justify-center gap-1 hover:bg-greys1/10 rounded-md p-2 cursor-pointer transition-all duration-300 w-[90%] ${active ? "bg-greys1/10 text-white" : "text-greys2"}`}>
      <Icon className="text-xl" />
      <span className="text-xs">{label}</span>
    </div>
  )
}


const Page = () => {
  const { video_id } = useParams();

  const { video: videoData, loading: isFetchingVideo, fetchVideo, replaceScenes, replaceScene } = useVideoStore();
  // const [videoData, setVideoData] = useState<VideoResponse | null>(null);
  const [progress, setProgress] = useState<number>(0);

  const [exportProgress, setExportProgress] = useState<number | null>(null)

  const [rws, setRws] = useState<ReconnectingWebSocket | null>(null);

  const [activeTab, setActiveTab] = useState<string>(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 900) {
        return "video";
      }
    }
    return "frames";
  });



  const breadCrumbs: BreadCrumbItem[] = [
    {
      label: "Dashboard",
      href: "/dashboard",
    },

    {
      label: videoData?.title ?? "Video",
      href: `/dashboard/video/${video_id}`,
    }

  ];

  const isVideoProcessing = !videoData || videoData?.status === 'processing' || videoData?.status === 'pending';


  const dummyRenderId = "gt7oi9luer"
  const dummyBucketName = "remotionlambda-useast1-h2ias1sgku"

  const checkProgress = async (renderId: string, bucketName: string) => {
    const response = await axios.post(`/api/lambda/progress/${renderId}`, {
      bucketName: bucketName
    })
    console.log("Response from lambda progress", response.data)
  }

  const exportVideo = async () => {

    checkProgress(dummyRenderId, dummyBucketName)


    // const response = await axios.post("/api/lambda/render", {
    //   video: videoData,
    //   width: 1080,
    //   height: 1920,
    // })

    // console.log("Response from lambda render", response.data)
  }






  useEffect(() => {
    fetchVideo(video_id as string);
  }, []);


  useEffect(() => {

    const rws = new ReconnectingWebSocket(`${makeMsUrl(`/ws/video/task/${video_id}`, "ws")}`);

    rws.onmessage = (event) => {
      const data = JSON.parse(event.data) as VideoWsProgressMessageBody
      if (data.type === 'scenes_generated') {
        setProgress(data.progress ?? 0)
        replaceScenes((data.payload as SceneGeneratedPayload).scenes)
      }

      if (data.type === 'scene_audio_generated') {
        setProgress(data.progress ?? 0)
        const payload = data.payload as SceneAudioGeneratedPayload
        replaceScene(payload.scene)
      }

      if (data.type === 'scene_image_generated') {
        setProgress(data.progress ?? 0)
        const payload = data.payload as SceneImageGeneratedPayload
        replaceScene(payload.scene)
      }

      if (data.type === 'completed') {
        fetchVideo(video_id as string)
      }
    }

    return () => {
      if (rws) {
        rws.close();
      }
    }

  }, [video_id])

  return (
    <div className="flex flex-col min-h-screen  bg-denary w-full relative">
      {/* Top Nav */}
      <div className="w-full py-4 max-vidMobile:px-4 px-8 border-b  border-b-greys1/20 flex flex-row items-center justify-between h-[11dvh] max-h-[70px]">


        <Logo width={30} height={30} className="max-vidMobile:hidden" />

        <a href="/dashboard" className="vidMobile:hidden bg-greys1/20 rounded-md px-3 py-2 flex flex-row items-center gap-1 cursor-pointer">
          <RxCaretLeft size={20} />
          <p className="text-sm">Back</p>
        </a>

        <Logo width={30} height={30} className="vidMobile:hidden" showText={false} />


        <BreadCrumbs breadCrumbs={breadCrumbs} className="hidden md:flex" />

        <div className="flex flex-row items-center ">
          <ExportVideoButton video={videoData ?? null} />

          <UserInfoPopover state="reduced" />
        </div>
      </div>

      {
        isFetchingVideo ? <div className="w-full h-[calc(100dvh-70px)] flex flex-row items-center justify-center">
          <GooeyBalls size={40} />
        </div> :
          <div className="w-full h-[calc(100dvh-70px)] flex flex-row relative">
            {/* Side Nav */}
            <div className="w-[10%] max-w-[90px] h-full pt-5 flex max-vidMobile:hidden flex-col items-center gap-5 border-r border-r-greys1/20 shrink-0">
              {sideNavItems.slice(1, sideNavItems.length).map(item => (
                <div key={item.Label} className={`flex flex-col items-center justify-center gap-2 text-greys2 hover:bg-greys1/10 rounded-md p-2 cursor-pointer transition-all duration-300 w-[90%] ${activeTab === item.id ? "bg-greys1/10 text-white" : ""}`} onClick={() => setActiveTab(item.id)}>
                  <item.Icon className="text-xl" />
                  <span className="text-sm">{item.Label}</span>
                </div>
              ))}
            </div>


            <div className="w-[50%] max-vidMobile:w-full vidMobile:max-w-[500px] ">

              {
                activeTab === 'frames' && <SceneList />
              }

              {/* video and loading animation tab for mobile view only */}
              {
                activeTab === 'video' && <div className="w-full flex flex-col items-center justify-center pt-7 vidMobile:hidden">

                  {
                    isVideoProcessing ? <div className="flex-1 h-full flex flex-col items-center justify-center">
                      <div className="flex flex-col items-center justify-center gap-2 w-full">
                        <VideoGenerationAnimation progress={progress} />

                      </div>
                    </div> :

                      <div className="w-full h-dvh max-w-[300px] max-h-[450px] mx-auto">
                        <VideoPlayer video={videoData ?? null} width={300} height={450} />
                      </div>

                  }
                </div>
              }
            </div>


            {
              videoData && isVideoProcessing && <div className="flex-1 h-full flex flex-col items-center justify-center max-vidMobile:hidden">
                <div className="flex flex-col items-center justify-center gap-2 w-full">
                  <VideoGenerationAnimation progress={progress} />

                </div>

              </div>
            }

            {/* video tab for desktop view only */}
            {
              videoData && !isVideoProcessing && <div
                className="flex-1 h-full flex flex-col gap-3 items-center justify-center max-vidMobile:hidden max-vidMobile:pt-3 bg-denary  max-vidMobile:pb-[50px]"
                style={{
                  backgroundImage: "linear-gradient(to right, rgba(48,48,56,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(48,48,56,0.12) 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                  backgroundPosition: "0 0",
                }}
              >


                {
                  videoData && videoData.status === 'completed' && <div className="w-full h-full max-w-[300px] max-h-[450px] mx-auto">
                    <VideoPlayer video={videoData ?? null} width={300} height={450} />
                  </div>

                }

              </div>
            }


            <div className="vidMobile:hidden w-[98%] mx-auto bg-greys3 border border-greys1/20  rounded-lg py-1 px-1  flex flex-row items-center fixed inset-x-0 bottom-1 z-10">
              {
                sideNavItems.slice(0, 3).map(item => (
                  <MobileBottomNavItem key={item.Label} label={item.Label} Icon={item.Icon} onClick={() => setActiveTab(item.id)} active={activeTab === item.id} />
                ))
              }

              <MobileBottomNavItem label="More" Icon={RiAppsFill} />
            </div>




          </div>
      }


    </div>
  );
};

export default Page;
