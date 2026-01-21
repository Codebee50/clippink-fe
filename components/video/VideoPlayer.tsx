import { VideoResponse } from '@/lib/types/video'
import React from 'react'
import RemotionVideo from './RemotionVideo';
import { Player } from '@remotion/player';

const VideoPlayer = ({video}: {video: VideoResponse | null}) => {
  return video && (
    <Player
      component={RemotionVideo}
      durationInFrames={video.scenes.reduce((acc, scene) => {
        // Use caption-based duration for accuracy
        const actualDuration = scene.captions && scene.captions.length > 0 ? scene.captions[scene.captions.length - 1].end + 0.1 : scene.duration_seconds;
        return acc + Math.ceil(actualDuration * 30);
      }, 0)}
      compositionWidth={300}
      compositionHeight={450}
      fps={30}
      inputProps={{
        video: video,
      }}
      controls={true}
    />
  )
}

export default VideoPlayer