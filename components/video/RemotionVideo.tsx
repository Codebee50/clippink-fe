import { appConfig } from "@/constants";
import { AnimationType, Caption, Scene, VideoResponse } from "@/lib/types/video";
import React, { useState } from "react";
import { AbsoluteFill, Audio, Easing, Img, interpolate, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { getAnimationStyle } from "@/lib/utils";



const RemotionVideo = ({ video }: { video: VideoResponse | null }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  if (!video) {
    return (
      <AbsoluteFill className="bg-greys1/10 rounded-md overflow-hidden flex items-center justify-center">
        <p className="text-gray-400">No video data</p>
      </AbsoluteFill>
    );
  }

  const sortedScenes = video.scenes.sort((a, b) => a.order_number - b.order_number);

  const AUDIO_BUFFER_SECONDS = 0.1; // 100ms buffer to prevent cutoff

  const getActualAudioDuration = (scene: Scene) => {
    if (scene.captions && scene.captions.length > 0) {
      const lastCaption = scene.captions[scene.captions.length - 1];
      // Add buffer to prevent audio cutoff
      return lastCaption.end + AUDIO_BUFFER_SECONDS;
    }
    return scene.duration_seconds ?? 1;
  };

  const getSceneDurationInFrames = (scene: Scene) => {
    //this asks the question: how long is this scene meant to stay in the video
    const actualDuration = getActualAudioDuration(scene);
    return Math.ceil(actualDuration * fps);
  };

  const getSceneStartFrame = (scene: Scene, index: number) => {
    //this asks the question: when does this scene start in the video
    let startFrame = 0;
    for (let i = 0; i < index; i++) {
      startFrame += getSceneDurationInFrames(sortedScenes[i]);
    }
    return startFrame;
  };

  //TODO: fix captions not updating when scene changes
  const getCurrentCaption = (scene: Scene): Caption | undefined => {
    const currentTime = frame / fps; //convert frame number to milliseconds

    const currentCaption = scene.captions?.find(caption => currentTime >= caption.start && currentTime <= caption.end);
    return currentCaption;
  };

  return (
    <AbsoluteFill className="bg-greys1/10 rounded-md overflow-hidden">
      {sortedScenes.map((scene, index) => {
        const startTime = getSceneStartFrame(scene, index);
        const duration = getSceneDurationInFrames(scene);


        return (
          <Sequence key={scene.id} from={startTime} durationInFrames={duration}>
            <AbsoluteFill className="justify-center items-center">
              <Img src={scene.image_url || appConfig.PLACEHOLDER_IMAGE_URL} alt="scene image" width={100} height={100} className="w-full h-full object-cover object-center" style={getAnimationStyle(scene.motion_effect || "none", frame, startTime, duration)} />

              <AbsoluteFill className="text-white justify-center items-center bottom-30 text-center w-full h-max" style={{ top: undefined }}>
                <h2 className="text-2xl font-bold">{getCurrentCaption(scene)?.text || ""}</h2>
              </AbsoluteFill>
            </AbsoluteFill>

            {scene.audio_url && <Audio src={scene.audio_url} />}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

export default RemotionVideo;
