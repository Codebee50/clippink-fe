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
import { VideoResponse } from "@/lib/types/video";
import { AxiosError, AxiosResponse } from "axios";
import SceneCard from "@/components/video/SceneCard";

import { Player } from "@remotion/player";
import RemotionVideo from "@/components/video/RemotionVideo";

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

const Page = () => {
  const { video_id } = useParams();
  const [videoData, setVideoData] = useState<VideoResponse | null>(null);

  const { mutate: fetchVideo, isLoading: isFetchingVideo } = useFetchRequest({
    url: makeMsUrl(`/video/${video_id}/`),
    onSuccess: (response: AxiosResponse) => {
      const data = response.data as VideoResponse;
      setVideoData(data);
    },
    onError: (error: AxiosError) => {
      console.log("the error is", error);
    },
  });

  if (videoData) {
    console.log(
      "duration in frames",
      videoData.scenes.reduce((acc, scene) => acc + scene.duration_seconds * 30, 0)
    );
  }

  useEffect(() => {
    fetchVideo();
  }, []);

  return (
    <div className="flex flex-col min-h-screen  bg-denary w-full relative">
      {/* Top Nav */}
      <div className="w-full p-4 border-b  border-b-greys1/20 flex flex-row items-center justify-between h-[11vh] max-h-[70px]">
        <Logo color="#0A8337" dotColor="#fff" width={40} height={40} />

        <div className="flex flex-row items-center gap-4">
          <button className="bg-senary text-white px-4 py-2 text-sm font-medium rounded-md">Export/Share</button>

          <Image
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=761&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="share"
            width={42}
            height={42}
            className="rounded-full w-[42px] h-[42px] object-cover object-center"
          />
        </div>
      </div>

      {/* Bottom container */}
      <div className="w-full h-[calc(100vh-70px)] flex flex-row">
        {/* Side Nav */}
        <div className="w-[10%] max-w-[90px] h-full pt-5 flex flex-col items-center gap-5 border-r border-r-greys1/20 shrink-0">
          {sideNavItems.map(item => (
            <div key={item.Label} className="flex flex-col items-center justify-center gap-2 text-greys2 hover:bg-greys1/10 rounded-md p-2 cursor-pointer transition-all duration-300 w-[90%]">
              <item.Icon className="text-xl" />
              <span className="text-sm">{item.Label}</span>
            </div>
          ))}
        </div>

        <div className="w-[50%] max-w-[500px] h-full border-r border-r-greys1/20 bg-[#0C0C10] overflow-y-scroll p-4 flex flex-col gap-4 cus-scrollbar shrink-0">
          {videoData && videoData.scenes.map(scene => <SceneCard key={scene.id} scene={scene} />)}
        </div>

        <div className="flex-1 h-full flex items-center justify-center">
          {videoData && (
            <Player
              component={RemotionVideo}
              durationInFrames={videoData.scenes.reduce((acc, scene) => {
                // Use caption-based duration for accuracy
                const actualDuration = scene.captions && scene.captions.length > 0 ? scene.captions[scene.captions.length - 1].end + 0.1 : scene.duration_seconds;
                return acc + Math.ceil(actualDuration * 30);
              }, 0)}
              compositionWidth={300}
              compositionHeight={450}
              fps={30}
              inputProps={{
                video: videoData,
              }}
              controls={true}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
