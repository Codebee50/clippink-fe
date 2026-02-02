import { appConfig } from "../../constants";
import { Scene, VideoResponse } from "../../lib/types/video";
import { AbsoluteFill, Audio, Img, Sequence, useCurrentFrame, useVideoConfig, Video } from "remotion";
import { getAnimationStyle } from "../../lib/utils/animationStyle";
import { useMemo } from "react";
import { CAPTION_FONTS, CAPTION_STYLES } from "../../lib/utils/caption";



const RemotionVideo = ({ video, overrideDurationInFrames = null }: { video: VideoResponse | null, overrideDurationInFrames?: number | null }) => {
  const { fps, width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  const AUDIO_BUFFER_SECONDS = 0.1; // 100ms buffer to prevent cutoff

  const sortedScenes = useMemo(() => video?.scenes.sort((a, b) => a.order_number - b.order_number) || [], [video])


  const getActualAudioDuration = (scene: Scene) => {

    if (overrideDurationInFrames !== null) {
      return overrideDurationInFrames / fps
    }

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

  const getCurrentCaption = (scene: Scene, sceneStartFrame: number) => {
    const sceneRelativeTime = (frame - sceneStartFrame) / fps;

    const currentCaption = scene.captions?.find(
      caption => sceneRelativeTime >= caption.start && sceneRelativeTime <= caption.end
    );

    if (!currentCaption) return null;

    // Find the currently active word
    const currentWord = currentCaption.words?.find(
      word => sceneRelativeTime >= word.start && sceneRelativeTime <= word.end
    );

    return { caption: currentCaption, currentWord };
  }

  if (!video) {
    return (
      <AbsoluteFill className="bg-greys1/10 rounded-md overflow-hidden flex items-center justify-center">
        <p className="text-gray-400">No video data</p>
      </AbsoluteFill>
    );
  }



  return (
    <AbsoluteFill className="bg-greys1/10 rounded-md overflow-hidden">

      {sortedScenes.map((scene, index) => {
        const startTime = getSceneStartFrame(scene, index);
        const duration = getSceneDurationInFrames(scene);

        const animationData = getAnimationStyle(
          scene.motion_effect || 'scrollRight',
          frame,
          startTime,
          duration
        );

        const captionData = getCurrentCaption(scene, startTime);

        return (
          <Sequence key={scene.id} from={startTime} durationInFrames={duration}>
            <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', width: "100%", height: "100%" }}>

              {scene.media_type === 'image' && (
                <Img src={scene.image_url || appConfig.PLACEHOLDER_IMAGE_URL} alt="scene image" width={width} height={height} className="w-full h-full object-cover object-center" style={animationData.style} />
              )}

              {scene.media_type === 'video' && scene.video_url && (
                <Video src={scene.video_url} width={width} height={height} className="w-full h-full object-cover object-center" style={animationData.style} />
              )}

              <AbsoluteFill style={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                color: "white",
                textAlign: "center",
                width: "100%",
                height: "100%",
                padding: `${height * 0.05}px`
                // padding: `${height * 0.05}px`
              }}>
                <div style={{
                  ...video.caption_settings,
                  marginBottom: `${height * 0.08}px`,
                  fontSize: Math.max(height * 0.05, video.caption_settings?.fontSize ?? 24)
                }}>
                  {captionData?.caption.words?.map((word, idx) => (
                    <span
                      key={idx}
                      style={{
                        color: word.text === captionData.currentWord?.text
                          ? video.caption_settings?.highlightWordColor || '#FDE047'
                          : video.caption_settings?.dormantTextColor || '#0C0C10'
                      }}
                    >
                      {word.text}{" "}
                    </span>
                  ))}
                </div>
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