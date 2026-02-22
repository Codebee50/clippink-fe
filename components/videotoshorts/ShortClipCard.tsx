import { ShortClip } from '@/lib/types/videotoshorts'
import React, { useState } from 'react'
import VideoThumbnail from './VideoThumbnail'

const ShortClipCard = ({ clip }: { clip: ShortClip }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    
    return (
        <div className='bg-greys3'>
            <VideoThumbnail
                src={clip.clip_url}
                seekTo={1}
                onClick={() => setIsPlaying((p) => !p)}
                isPlaying={isPlaying}
                duration={clip.duration}
                score={clip.virality_score}
            />

        </div>
    )
}

export default ShortClipCard