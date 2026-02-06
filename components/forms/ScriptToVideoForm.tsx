"use client";

import React, { useEffect, useState } from "react";
import { PiMagicWand } from "react-icons/pi";
import { AiOutlineInfoCircle } from "react-icons/ai";

import { BackgroundMusicResponse, NarratorsVoiceResponse, ScriptToVideoReqConfig, VideoStyleResponse } from "@/lib/types/video";

import SelectBackgroundMusicModal from "../SelectBackgroundMusicModal";

import { GiMagicLamp } from "react-icons/gi";
import SelectVideoStyle from "../SelectVideoStyle";
import SelectNarratorsVoice from "../SelectNarratorsVoice";
import LoadingButton from "../buttons/LoadingButton";
import usePostRequest from "@/hooks/usePost";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import AiScriptWriterModal from "../video/AiScriptWriterModal";
import useStyledToast from "@/hooks/useStyledToast";



const ScriptToVideoForm = () => {
  const router = useRouter();

  const toast = useStyledToast()

  const [videoConfig, setVideoConfig] = useState<ScriptToVideoReqConfig>({
    script: null,
    image_style_preset_id: null,
    background_audio_id: null,
    voice_id: null,
  })

  type Video = {
    id: string;
    status: string;
    created_at: string;
    updated_at: string;
    script: string;

  }

  type GenerateVideoResponse = {
    message: string;
    video: Video
  }

  const { mutate: generateVideo, isLoading: isGeneratingVideo } = usePostRequest({
    url: "/video/script-to-video/",
    onSuccess: (response: AxiosResponse) => {
      const data = response.data as GenerateVideoResponse;

      toast.success("Video generation started successfully")
      router.push(`/dashboard/video/${data.video.id}`);
    },
    onError: (error) => {
      toast.error("Failed to generate video")
    },
  });

  const updateConfig = (key: keyof ScriptToVideoReqConfig, value: string | null) => {
    setVideoConfig(prev => ({
      ...prev,
      [key]: value,
    }))
  }


  const handleSelectBackgroundMusic = (audio: BackgroundMusicResponse) => {
    updateConfig("background_audio_id", audio.id)
  }

  const handleSelectVideoStyle = (style: VideoStyleResponse) => {
    updateConfig("image_style_preset_id", style.id)
  }

  const handleSelectNarratorsVoice = (voice: NarratorsVoiceResponse) => {
    updateConfig("voice_id", voice.voice_id)
  }

  const handleGenerateVideo = () => {
    if (!videoConfig.script) {
      // TODO: show error to user
      toast.error("Please enter a script")
      return;
    }
    generateVideo(videoConfig);
  }
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-6">
        <div className="w-full flex flex-row items-center justify-between gap-4">
          <div className="w-full flex flex-col gap-1">
            <div className="flex flex-row items-center gap-1">
              <p>Script</p>

              <AiOutlineInfoCircle size={16} className="text-greys4 text-sm" />
            </div>
            <p className="text-sm text-greys4">Our AI analyzes your script and generates visuals that match it.</p>
          </div>

          <AiScriptWriterModal onScriptGenerated={(script) => updateConfig("script", script)} />


        </div>

        <div className="w-full pb-4 border-b border-b-greys1/30">
          <textarea
            className="w-full outline-none text-sm  p-5 border border-greys1/30 rounded-sm resize-none bg-greys5 cus-scrollbar placeholder:text-sm placeholder:leading-7 placeholder:text-greys4/80"
            rows={10}
            placeholder={`Enter the script for your video here.
                
Example: On Christmas Eve 1945, the Sodder family went to bed in their home in Fayetteville, West Virginia. By morning, five of their children would be gone forever. George and Jennie Sodder had ten children. That night, nine of them were home sleeping peacefully. At 1 AM, Jennie woke to find their house engulfed in flames. George tried desperately to reach the children's bedrooms upstairs, but the fire was too intense. The family escaped outside, but five children—Maurice, Mart....`}
            onChange={(e) => updateConfig("script", e.target.value)}
            value={videoConfig.script ?? ""}
          ></textarea>
        </div>

        {/* Video Style */}
        <SelectVideoStyle onSelect={handleSelectVideoStyle} />


        {/* Background Music */}
        <SelectBackgroundMusicModal onSelect={handleSelectBackgroundMusic} />

        {/* Narrators Voice */}
        <SelectNarratorsVoice onSelect={handleSelectNarratorsVoice} />

        <LoadingButton text="Generate Video" loadingText="Generating Video.." isLoading={isGeneratingVideo} Icon={<GiMagicLamp size={20} />} onClick={handleGenerateVideo} />

      </div>
    </div>
  );
};

export default ScriptToVideoForm;
