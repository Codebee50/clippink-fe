import { appConfig } from "../../constants";
import { Scene, VideoResponse } from "../../lib/types/video";
import { AbsoluteFill, Audio, Img, Sequence, useCurrentFrame, useVideoConfig, useDelayRender } from "remotion";
import { getAnimationStyle } from "../../lib/utils";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createTikTokStyleCaptions, Caption as RemotionCaption, TikTokPage } from '@remotion/captions';


const SWITCH_CAPTIONS_EVERY_MS = 1200;
const HIGHLIGHT_COLOR = '#39E508';

const CaptionPage: React.FC<{ page: TikTokPage }> = ({ page }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTimeMs = (frame / fps) * 1000;
  const absoluteTimeMs = page.startMs + currentTimeMs;

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          fontSize: 80,
          fontWeight: 'bold',
          textAlign: 'center',
          whiteSpace: 'pre',
        }}
      >
        {page.tokens.map((token) => {
          const isActive = token.fromMs <= absoluteTimeMs && token.toMs > absoluteTimeMs;

          return (
            <span
              key={token.fromMs}
              style={{
                color: isActive ? HIGHLIGHT_COLOR : 'white',
              }}
            >
              {token.text}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};



const RemotionVideo = ({ video, overrideDurationInFrames = null }: { video: VideoResponse | null, overrideDurationInFrames?: number | null }) => {
  const { fps, width, height } = useVideoConfig();
  const frame = useCurrentFrame();
  const { delayRender, continueRender, cancelRender } = useDelayRender()
  // const [handle] = useState(()=> delayRender())

  const AUDIO_BUFFER_SECONDS = 0.1; // 100ms buffer to prevent cutoff

  const sceneCaptionsToRemotionCaptions = (scene: Scene, lastSceneStartMs: number, lastSceneEndMs: number) => {
    // let lastStart = lastSceneStartMs
    let lastEnd = lastSceneEndMs
    const remCaptions: RemotionCaption[] = []

    for (const caption of scene.captions || []) {
      const startMs = lastEnd + (caption.start * 1000)
      const endMs = lastEnd + (caption.end * 1000)


      remCaptions.push({
        text: caption.text,
        startMs,
        endMs,
        timestampMs: null,
        confidence: null
      })

      // lastStart = startMs
      lastEnd = endMs
    }
    return remCaptions
  }

  const compileCaptions = useCallback((scenes: Scene[]) => {
    let lastSceneStartMs = 0.0
    let lastSceneEndMs = 0.0
    const remCaptions: RemotionCaption[] = []

    for (const scene of scenes) {
      const fetchedRemotionCaptions = sceneCaptionsToRemotionCaptions(scene, lastSceneStartMs, lastSceneEndMs)
      if (fetchedRemotionCaptions.length > 0) {
        lastSceneStartMs = fetchedRemotionCaptions[fetchedRemotionCaptions.length - 1].endMs
        lastSceneEndMs = fetchedRemotionCaptions[fetchedRemotionCaptions.length - 1].endMs
      }

      remCaptions.push(...fetchedRemotionCaptions)

    }
    return remCaptions
  }, [])

  const sortedScenes = useMemo(() => video?.scenes.sort((a, b) => a.order_number - b.order_number) || [], [video])
  const remotionCaptions = useMemo(() => compileCaptions(sortedScenes), [compileCaptions, sortedScenes])

  const { pages } = useMemo(() => {
    return createTikTokStyleCaptions({
      captions: remotionCaptions,
      combineTokensWithinMilliseconds: SWITCH_CAPTIONS_EVERY_MS
    })
  }, [remotionCaptions])


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
      {/* <AbsoluteFill>
        {pages.map((page, index) => {
          console.log("page", page)
          const nextPage = pages[index + 1] ?? null;
          const startFrame = (page.startMs / 1000) * fps;
          const endFrame = Math.min(nextPage ? (nextPage.startMs / 1000) * fps : Infinity, startFrame + (SWITCH_CAPTIONS_EVERY_MS / 1000) * fps);
          const durationInFrames = endFrame - startFrame;

          if (durationInFrames <= 0) {
            return null;
          }

          return (
            <Sequence key={index} from={startFrame} durationInFrames={durationInFrames}>
              <CaptionPage page={page} />
            </Sequence>
          );
        })}
      </AbsoluteFill> */}

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

              <Img src={scene.image_url || appConfig.PLACEHOLDER_IMAGE_URL} alt="scene image" width={width} height={height} className="w-full h-full object-cover object-center" style={animationData.style} />

              <AbsoluteFill style={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                color: "white",
                textAlign: "center",
                width: "100%",
                height: "100%",
                padding: `${height * 0.05}px`
              }}>
                <div style={{
                  fontSize: Math.max(height * 0.03, 24), // Scale with video height, minimum 24px
                  fontWeight: 'bold',
                  textAlign: 'center',
                  whiteSpace: 'pre-wrap',
                  color: "white",
                  textShadow: '2px 2px 4px rgba(0,0,0,0.8)', // Add shadow for better readability
                  maxWidth: '90%',
                  lineHeight: 1.4,
                  paddingBottom: `${height * 0.08}px`
                }}>
                  {captionData?.caption.words?.map((word, idx) => (
                    <span
                      key={idx}
                      style={{
                        color: word.text === captionData.currentWord?.text
                          ? "yellow"
                          : "white"
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