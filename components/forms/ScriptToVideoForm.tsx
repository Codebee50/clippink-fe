"use client";

import React, { useEffect, useState } from "react";
import { PiMagicWand } from "react-icons/pi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import useFetchRequest from "@/hooks/useFetch";
import { makeMsUrl } from "@/constants";
import { AxiosResponse } from "axios";
import { BackgroundMusicResponse, VideoStyleResponse } from "@/lib/types/video";
import Image from "next/image";

const ScriptToVideoForm = () => {
  const [videoStyles, setVideoStyles] = useState<VideoStyleResponse[]>([]);
  const [backgroundMusic, setBackgroundMusic] = useState<BackgroundMusicResponse[]>([]);


  const { mutate: getVideoStyles, isLoading: isGettingVideoStyles } = useFetchRequest({
    url: makeMsUrl(`/video/image-style-presets/`),
    onSuccess: (response: AxiosResponse) => {
      const data = response.data as VideoStyleResponse[];
      setVideoStyles(data);
    },
  });
  const { mutate: getBackgroundMusic, isLoading: isGettingBackgroundMusic } = useFetchRequest({
    url: makeMsUrl(`/assets/background-audio/list/`),
    onSuccess: (response: AxiosResponse) => {
      const data = response.data as BackgroundMusicResponse[];
      setBackgroundMusic(data);
    },
  });

  useEffect(() => {
    getVideoStyles();
    getBackgroundMusic();
  }, []);
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-6">
        <div className="w-full flex flex-row items-center justify-between">
          <div className="w-full flex flex-col gap-1">
            <div className="flex flex-row items-center gap-1">
              <p>Script</p>

              <AiOutlineInfoCircle size={16} className="text-greys4 text-sm" />
            </div>
            <p className="text-sm text-greys4">Our AI analyzes your script and generates visuals that match it.</p>
          </div>

          <button className="flex flex-row text-white bg-senary px-6 py-2 rounded-sm text-sm text-nowrap gap-2 items-center cursor-pointer">
            <PiMagicWand size={16} />
            Write using AI
          </button>
        </div>

        <div className="w-full pb-4 border-b border-b-greys1/30">
          <textarea
            className="w-full outline-none text-sm  p-5 border border-greys1/30 rounded-sm resize-none bg-greys5 cus-scrollbar placeholder:text-sm placeholder:leading-7 placeholder:text-greys4/80"
            rows={10}
            placeholder={`Enter the script for your video here.
                
Example: On Christmas Eve 1945, the Sodder family went to bed in their home in Fayetteville, West Virginia. By morning, five of their children would be gone forever. George and Jennie Sodder had ten children. That night, nine of them were home sleeping peacefully. At 1 AM, Jennie woke to find their house engulfed in flames. George tried desperately to reach the children's bedrooms upstairs, but the fire was too intense. The family escaped outside, but five children—Maurice, Mart....`}
          ></textarea>
        </div>

        <div className="w-full flex flex-col gap-2 border-b border-b-greys1/30 pb-4">
          <div className="flex flex-row items-center justify-between w-full">
            <div className="w-full flex flex-col gap-1">
              <div className="flex flex-row items-center gap-2">
                <p className="text-white">Select video style</p>

                <AiOutlineInfoCircle size={16} className="text-greys4 text-sm" />
              </div>
              <p className="text-sm text-greys4">Every scene in your video will follow the selected style.</p>
            </div>

            <div className="flex flex-row items-center gap-2">
              <button className="border border-greys1/20 bg-[#1D1D20] rounded-full p-2 text-[#929292] cursor-pointer">
                <IoMdArrowBack />
              </button>
              <button className="border border-greys1/20 bg-[#1D1D20] rounded-full p-2 text-[#929292] cursor-pointer">
                <IoMdArrowForward />
              </button>
            </div>
          </div>

          <div className="w-full flex flex-row items-center gap-2 overflow-x-scroll no-scrollbar mt-4">
            {videoStyles.map(style => (
              <div key={style.id} className="w-[140px] flex flex-col border border-[#202020] rounded-md overflow-hidden">
                <Image src={style.preview_url} alt={style.name} width={100} height={100} className="w-full h-[120px] object-cover object-center" />
                <div className="bg-greys5 px-2 py-3  flex flex-row items-center justify-between">
                  <p className="text-sm text-white">{style.name}</p>

                  <div className="w-[15px] h-[15px] rounded-full bg-greys5 border border-greys4 flex items-center justify-center">
                    <div className="w-[10px] h-[10px] rounded-full bg-greys4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col gap-2 border-b border-b-greys1/30 pb-4">
          <p className="text-white">Background Music</p>

          <div className="w-full flex flex-col gap-4">
            {backgroundMusic.map(music => (
              <div key={music.id} className="w-full flex flex-row items-center gap-2">
                <p className="text-sm text-white">{music.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptToVideoForm;
