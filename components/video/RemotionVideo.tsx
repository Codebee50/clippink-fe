import { appConfig } from "../../constants";
import { Scene, VideoResponse } from "../../lib/types/video";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  Video,
} from "remotion";
import { getAnimationStyle } from "../../lib/utils/animationStyle";
import { useMemo } from "react";

const RemotionVideo = ({
  video,
  overrideDurationInFrames = null,
}: {
  video: VideoResponse | null;
  overrideDurationInFrames?: number | null;
}) => {
  const { fps, width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  const AUDIO_BUFFER_SECONDS = 0.1;

  const sortedScenes = useMemo(
    () => video?.scenes.sort((a, b) => a.order_number - b.order_number).filter((scene)=> scene.audio_url !== null) || [],
    [video]
  );

  const getActualAudioDuration = (scene: Scene) => {
    if (overrideDurationInFrames !== null) {
      return overrideDurationInFrames / fps;
    }
    if (scene.captions && scene.captions.length > 0) {
      const lastCaption = scene.captions[scene.captions.length - 1];
      return lastCaption.end + AUDIO_BUFFER_SECONDS;
    }
    return scene.duration_seconds ?? 1;
  };

  const getSceneDurationInFrames = (scene: Scene) => {
    const actualDuration = getActualAudioDuration(scene);
    return Math.ceil(actualDuration * fps);
  };

  const getSceneStartFrame = (scene: Scene, index: number) => {
    let startFrame = 0;
    for (let i = 0; i < index; i++) {
      startFrame += getSceneDurationInFrames(sortedScenes[i]);
    }
    return startFrame;
  };

  const getCurrentCaption = (scene: Scene, sceneStartFrame: number) => {
    const sceneRelativeTime = (frame - sceneStartFrame) / fps;

    const currentCaption = scene.captions?.find(
      (caption) =>
        sceneRelativeTime >= caption.start && sceneRelativeTime <= caption.end
    );

    if (!currentCaption) return null;

    const currentWord = currentCaption.words?.find(
      (word) =>
        sceneRelativeTime >= word.start && sceneRelativeTime <= word.end
    );

    return { caption: currentCaption, currentWord };
  };

  if (!video) {
    return (
      <AbsoluteFill className="bg-greys1/10 rounded-md overflow-hidden flex items-center justify-center">
        <p className="text-gray-400">No video data</p>
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill className="bg-greys1/10 rounded-md overflow-hidden">
      {video.background_audio && (
        <Audio
          src={video.background_audio.url}
          volume={video.background_audio_volume ?? 0.5}
          loop={true}
        />
      )}

      {sortedScenes.map((scene, index) => {
        const startTime = getSceneStartFrame(scene, index);
        const duration = getSceneDurationInFrames(scene);

        const animationData = getAnimationStyle(
          scene.motion_effect || "scrollRight",
          frame,
          startTime,
          duration,
          fps
        );

        const captionData = getCurrentCaption(scene, startTime);
        const marginBottomPercentage =
          video?.caption_settings?.marginBottomPercentage || 15;

        return (
          <Sequence key={scene.id} from={startTime} durationInFrames={duration}>
            <AbsoluteFill
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
                overflow: "hidden",
              }}
            >
              {/* Reflection layer — rendered behind main image for slide-in effects */}
              {animationData.showReflection && animationData.reflectionStyle && (
                <>
                  {scene.media_type === "image" && (
                    <Img
                      src={scene.image_url || appConfig.PLACEHOLDER_IMAGE_URL}
                      alt="scene image reflection"
                      width={width}
                      height={height}
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        ...animationData.reflectionStyle,
                      }}
                    />
                  )}
                  {scene.media_type === "video" && scene.video_url && (
                    <Video
                      src={scene.video_url}
                      width={width}
                      height={height}
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                        ...animationData.reflectionStyle,
                      }}
                    />
                  )}
                </>
              )}

              {/* Main media layer */}
              {scene.media_type === "image" && (
                <Img
                  src={scene.image_url || appConfig.PLACEHOLDER_IMAGE_URL}
                  alt="scene image"
                  width={width}
                  height={height}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    willChange: "transform",
                    ...animationData.style,
                  }}
                />
              )}

              {scene.media_type === "video" && scene.video_url && (
                <Video
                  src={scene.video_url}
                  width={width}
                  height={height}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    willChange: "transform",
                    ...animationData.style,
                  }}
                />
              )}

              {/* Optional vignette overlay for cinematic feel */}
              <AbsoluteFill
                style={{
                  background:
                    "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.45) 100%)",
                  pointerEvents: "none",
                }}
              />

              {/* Captions layer */}
              <AbsoluteFill style={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                color: "white",
                textAlign: "center",
                width: "100%",
                height: "100%",
                paddingLeft: `${height * 0.05}px`,
                paddingRight: `${height * 0.05}px`,
                // padding: `${height * 0.05}px`
              }}>
                <div style={{
                  ...video.caption_settings,
                  marginBottom: `${(marginBottomPercentage / 100) * height}px`,
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