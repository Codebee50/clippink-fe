import { Scene, VideoResponse } from "@/lib/types/video";
import React, { Fragment, useEffect, useState } from "react";
import { AbsoluteFill, Audio, Img, Sequence, useVideoConfig } from "remotion";

const RemotionVideo = ({ video }: { video: VideoResponse }) => {
  const { fps } = useVideoConfig();
  const [sortedScenes, setSortedScenes] = useState<Scene[]>(
    video.scenes.sort((a, b) => a.order_number - b.order_number)
  ); // sorted scenes by order_number

  const getSceneDurationInFrames = (scene: Scene) => {
    return scene.duration_seconds * fps;
  };

  const getSceneStartFrame = (scene: Scene, index: number) => {
    let startFrame = 0;
    for (let i = 0; i < index; i++) {
      startFrame += getSceneDurationInFrames(sortedScenes[i]);
    }
    return startFrame;
  };
  return (
    <AbsoluteFill className="bg-greys1/10 rounded-md overflow-hidden">
      {sortedScenes.map((scene, index) => (
        <Fragment key={scene.id}>
          <Sequence
            key={scene.id}
            //what frame should this scene start at?
            from={getSceneStartFrame(scene, index)}
            // how long should this scene last?
            durationInFrames={getSceneDurationInFrames(scene)}
          >
            <Img
              src={scene.image_url || ""}
              alt="scene image"
              width={100}
              height={100}
              className="w-full h-full object-cover object-center"
            />

            {scene.audio_url && <Audio src={scene.audio_url} />}
          </Sequence>
        </Fragment>
      ))}
    </AbsoluteFill>
  );
};

export default RemotionVideo;
