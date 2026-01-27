import React from "react";
import { Composition } from "remotion";
import RemotionVideo from "../components/video/RemotionVideo";
import { VideoResponse } from "../lib/types/video";


// npx remotion lambda sites create remotion/index.ts --site-name=my-video
export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="RemotionVideo"
        component={RemotionVideo}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          video: null,
        }}
        calculateMetadata={({ props }) => {
          const { video } = props as { video: VideoResponse | null }
          if (!video || !video.scenes || video.scenes.length === 0) {
            return {
              durationInFrames: 300,
              fps: 30
            }
          }

          const durationInFrames =video.scenes.reduce((acc, scene) => {
            if (scene.captions && scene.captions.length > 0) {
              const actualDuration = scene.captions[scene.captions.length - 1].end + 0.1
              return acc + Math.ceil(actualDuration * 30)
            }

            return acc + (scene.duration_seconds ?? 1) * 30
          }, 0)


          return {
            durationInFrames: durationInFrames,
            fps: 30,
            
          }

        }}
      />
    </>
  );
};
