"use client";

import React, { useEffect, useState } from "react";
import { PiMagicWand } from "react-icons/pi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import useFetchRequest from "@/hooks/useFetch";
import { makeMsUrl } from "@/constants";
import { AxiosResponse } from "axios";
import { BackgroundMusicResponse, NarratorsVoiceResponse, ScriptToVideoReqConfig, VideoStyleResponse } from "@/lib/types/video";
import Image from "next/image";

import { PiMusicNotesBold } from "react-icons/pi";
import { IoPlayOutline } from "react-icons/io5";
import { RiVoiceAiFill } from "react-icons/ri";
import SelectBackgroundMusicModal from "../SelectBackgroundMusicModal";

import { GiMagicLamp } from "react-icons/gi";
import SelectVideoStyle from "../SelectVideoStyle";
import SelectNarratorsVoice from "../SelectNarratorsVoice";




const ScriptToVideoForm = () => {
  const [videoStyles, setVideoStyles] = useState<VideoStyleResponse[]>([]);
  const [narratorsVoice, setNarratorsVoice] = useState<NarratorsVoiceResponse[]>([]);
  const [backgroundMusic, setBackgroundMusic] = useState<BackgroundMusicResponse | null>(null);

  const [videoConfig, setVideoConfig] = useState<ScriptToVideoReqConfig>({
    script: null,
    video_style_id: null,
    background_audio_id: null,
    voice_id: null,
  })

  const updateConfig = (key: keyof ScriptToVideoReqConfig, value: string | null) => {
    setVideoConfig(prev => ({
      ...prev,
      [key]: value,
    }))
  }


  const handleSelectBackgroundMusic = (audio: BackgroundMusicResponse) => {
    setBackgroundMusic(audio);
    updateConfig("background_audio_id", audio.id)
  }

  const handleSelectVideoStyle = (style: VideoStyleResponse) => {
    updateConfig("video_style_id", style.id)
  }

  const handleSelectNarratorsVoice = (voice: NarratorsVoiceResponse) => {
    updateConfig("voice_id", voice.voice_id)
  }

  useEffect(() => {
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
            onChange={(e) => updateConfig("script", e.target.value)}
          ></textarea>
        </div>

        {/* Video Style */}
        <SelectVideoStyle onSelect={handleSelectVideoStyle} />
        

        {/* Background Music */}
        <SelectBackgroundMusicModal onSelect={handleSelectBackgroundMusic} />

        <SelectNarratorsVoice onSelect={handleSelectNarratorsVoice} />



        <button className="w-full flex flex-row items-center gap-2 justify-center bg-senary px-6 py-2 rounded-sm text-sm text-nowrap cursor-pointer">
          <GiMagicLamp size={16} />
          <p>Generate Video</p>
        </button>






      </div>
    </div>
  );
};

export default ScriptToVideoForm;
