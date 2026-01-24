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
import { AxiosError, AxiosResponse } from "axios";
import SceneCard from "@/components/video/SceneCard";

import { Player } from "@remotion/player";
import RemotionVideo from "@/components/video/RemotionVideo";
import VideoPlayer from "@/components/video/VideoPlayer";
import { Progress } from "@/components/ui/progress"
import ReconnectingWebSocket from 'reconnecting-websocket';
import GooeyBalls from "@/components/loaders/GooeyBalls";
import VideoGenerationAnimation from "@/components/VideoGenerationAnimation";
import { BiExport } from "react-icons/bi";
import { BreadCrumbItem } from "@/lib/types/global";
import BreadCrumbs from "@/components/BreadCrumbs";
import { RiAppsFill } from "react-icons/ri";
import { MdOutlineVideoCameraBack } from "react-icons/md";
import { useVideoStore } from "@/lib/store/video";



const sideNavItems = [
  {
    Label: "Frames",
    Icon: FaPhotoVideo,
  },
  {
    Label: "Captions",
    Icon: FaRegClosedCaptioning,
  },
  {
    Label: "Voiceover",
    Icon: HiOutlineMicrophone,
  },
  {
    Label: "Audio",
    Icon: HiOutlineMusicNote,
  },
  {
    Label: "General",
    Icon: IoSettingsOutline,
  },
];

const MobileBottomNavItem = ({ label, Icon }: { label: string, Icon: React.ElementType }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1 text-white hover:bg-greys1/10 rounded-md p-2 cursor-pointer transition-all duration-300 w-[90%]">
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



  // const { mutate: fetchVideo, isLoading: isFetchingVideo } = useFetchRequest({
  //   url: makeMsUrl(`/video/${video_id}/`),
  //   onSuccess: (response: AxiosResponse) => {
  //     const data = response.data as VideoResponse;
  //     setVideoData(data);
  //   },
  //   onError: (error: AxiosError) => {
  //     console.log("the error is", error);
  //   },
  // });


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

  }, [video_id])

  return (
    <div className="flex flex-col min-h-screen  bg-denary w-full relative">
      {/* Top Nav */}
      <div className="w-full p-4 border-b  border-b-greys1/20 flex flex-row items-center justify-between h-[11dvh] max-h-[70px]">
        <Logo width={30} height={30} />

        <BreadCrumbs breadCrumbs={breadCrumbs} className="hidden md:flex" />

        <div className="flex flex-row items-center gap-4">
          <button className="bg-senary text-white px-6 py-2 text-sm rounded-sm flex flex-row items-center gap-2">
            <BiExport size={16} />
            Export
          </button>

          <Image
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=761&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="share"
            width={42}
            height={42}
            className="rounded-full w-[42px] h-[42px] object-cover object-center max-sm:hidden"
          />
        </div>
      </div>

      {
        isFetchingVideo ? <div className="w-full h-[calc(100dvh-70px)] flex flex-row items-center justify-center">
          <GooeyBalls size={40} />
        </div> :
          <div className="w-full h-[calc(100dvh-70px)] flex flex-row">
            {/* Side Nav */}
            <div className="w-[10%] max-w-[90px] h-full pt-5 flex max-vidMobile:hidden flex-col items-center gap-5 border-r border-r-greys1/20 shrink-0">
              {sideNavItems.map(item => (
                <div key={item.Label} className="flex flex-col items-center justify-center gap-2 text-greys2 hover:bg-greys1/10 rounded-md p-2 cursor-pointer transition-all duration-300 w-[90%]">
                  <item.Icon className="text-xl" />
                  <span className="text-sm">{item.Label}</span>
                </div>
              ))}
            </div>

            <div className="w-[50%] max-vidMobile:hidden max-w-[500px] h-full border-r border-r-greys1/20 bg-[#0C0C10] overflow-y-scroll p-4 flex flex-col gap-4 cus-scrollbar shrink-0">
              {videoData && videoData.scenes.map(scene => <SceneCard key={scene.id} scene={scene} />)}
            </div>

            <div
              className="flex-1 h-full flex flex-col gap-3 items-center justify-center max-vidMobile:justify-between max-vidMobile:pt-3 bg-denary"
              style={{
                backgroundImage: "linear-gradient(to right, rgba(48,48,56,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(48,48,56,0.12) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
                backgroundPosition: "0 0",
              }}
            >

              {
                videoData && (videoData.status === 'processing' || videoData.status === 'pending') && <div className="flex flex-col items-center justify-center gap-2 w-full">
                  <VideoGenerationAnimation progress={progress} />

                </div>
              }






              {
                videoData && videoData.status === 'completed' && <VideoPlayer video={videoData ?? null} />

              }

              <div className="vidMobile:hidden w-full mt-4 bg-greys3 border border-greys1/20 m-3 rounded-lg py-1  flex flex-row items-center">
                <MobileBottomNavItem label="Video" Icon={MdOutlineVideoCameraBack} />


                {
                  sideNavItems.slice(0, 2).map(item => (
                    <MobileBottomNavItem key={item.Label} label={item.Label} Icon={item.Icon} />
                  ))
                }

                <MobileBottomNavItem label="More" Icon={RiAppsFill} />


              </div>





            </div>
          </div>
      }


    </div>
  );
};

export default Page;
