import { appConfig } from "../../constants";
import { Scene, VideoResponse } from "../../lib/types/video";
import { AbsoluteFill, Audio,  Img,  Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { getAnimationStyle } from "../../lib/utils";



const RemotionVideo = ({ video, overrideDurationInFrames = null }: { video: VideoResponse | null, overrideDurationInFrames?: number | null }) => {
  const { fps, width, height } = useVideoConfig();
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
            <AbsoluteFill className="justify-center items-center">

              <Img src={scene.image_url || appConfig.PLACEHOLDER_IMAGE_URL} alt="scene image" width={width} height={height} className="w-full h-full object-cover object-center" style={animationData.style} />

              <AbsoluteFill className="text-white justify-center items-center bottom-14 text-center w-full h-max p-4" style={{ top: undefined }}>
                <h2 className="text-xl font-extrabold text-white italic tracking-wide  drop-shadow-[4px_4px_0_rgba(0,0,0,0.9)]">
                  {captionData?.caption.words?.map((word, idx) => (
                    <span
                      key={idx}
                      className={
                        word.text === captionData.currentWord?.text
                          ? "text-yellow-400"
                          : "text-white"
                      }
                    >
                      {word.text}{" "}
                    </span>
                  ))}
                </h2>
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
