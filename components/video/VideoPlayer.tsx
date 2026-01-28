import { VideoResponse } from '@/lib/types/video'
import React from 'react'
import RemotionVideo from './RemotionVideo';
import { Player } from '@remotion/player';

const VideoPlayer = ({ video, width = 300, height = 450, controls = true, autoPlay = false, overrideDurationInFrames = null, loop = false }:
  { video: VideoResponse | null, width?: number, height?: number, controls?: boolean, autoPlay?: boolean, overrideDurationInFrames?: number | null, loop?: boolean }) => {

  if (!video || video.status === 'pending' || video.status === 'processing') return null


  const durationInFrames = overrideDurationInFrames !== null ? overrideDurationInFrames : video.scenes.filter(scene => scene.image_url !== null && scene.audio_url !== null).reduce((acc, scene) => {
    // Use caption-based duration for accuracy
    if (scene.captions && scene.captions.length > 0) {
      const actualDuration = scene.captions[scene.captions.length - 1].end + 0.1;
      return acc + Math.ceil(actualDuration * 30);
    }
    else {
      return acc + (scene.duration_seconds ?? 1) * 30;
    }
  }, 0)

  return video && (
    <Player
      key={`${video.id}-${video.last_changed_at}`}
      component={RemotionVideo}
      durationInFrames={durationInFrames === 0 ? 1 : durationInFrames}
      compositionWidth={width}
      compositionHeight={height}
      clickToPlay={false}
      fps={30}
      inputProps={{
        video: video,
        overrideDurationInFrames: overrideDurationInFrames,
      }}
      controls={controls}
      autoPlay={autoPlay}
      acknowledgeRemotionLicense={true}
      loop={loop}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  )
}

export default VideoPlayer