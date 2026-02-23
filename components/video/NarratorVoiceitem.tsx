"use client"

import { NarratorsVoiceResponse } from '@/lib/types/video'
import React, { useEffect, useRef, useState } from 'react'
import SoundLottie from '../lottie/SoundLottie'


type propType = {
    voice: NarratorsVoiceResponse,
    isPlaying: boolean,
    playOrPauseHandler: (voice: NarratorsVoiceResponse) => void,
    onVoiceSelected: (voice: NarratorsVoiceResponse) => void,

}

const NarratorVoiceItem = ({ voice, isPlaying, playOrPauseHandler, onVoiceSelected }: propType) => {
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [expanded, setExpanded] = useState(false)
    const textRef = useRef<HTMLParagraphElement>(null)

    useEffect(() => {
        const el = textRef.current;
        if (el) {
            setIsOverflowing(el.scrollHeight > el.clientHeight);
        }
    }, [voice.description]);

    return (
        <div key={voice.voice_id} className="w-full flex flex-col sm:flex-row sm:items-center gap-4 justify-between cursor-pointer " >
            <div className="flex flex-row items-center gap-2">

                <div className='relative overflow-hidden w-[40px] h-[40px] shrink-0'>
                    
                    <span onClick={() => playOrPauseHandler(voice)} className="w-[40px] h-[40px] rounded-full overflow-hidden flex items-center justify-center shrink-0" dangerouslySetInnerHTML={{ __html: voice.gradient_avatar || "" }} />

                    

                    <div className='absolute inset-0 bg-transparent'>

                        {
                            isPlaying && <SoundLottie />
                        }

                    </div>
                </div>

                <div className="flex flex-col gap-1 text-start">
                    <p className="text-sm text-white" onClick={() => playOrPauseHandler(voice)}>{voice.name}</p>
                    <div className="relative">
                        <p className={`text-xs text-greys4 ${expanded ? "" : "line-clamp-2"}`} ref={textRef} onClick={() => playOrPauseHandler(voice)}>
                            {voice.description}
                            {isOverflowing && !expanded && (
                                <span className="invisible">... Show more</span> // reserves space
                            )}
                        </p>
                        {isOverflowing && !expanded && (
                            <span className="absolute bottom-0 bg-denary right-0 pl-1 text-xs text-senary cursor-pointer" onClick={() => setExpanded(true)}>
                                ... Show more
                            </span>
                        )}
                        {isOverflowing && expanded && (
                            <span className="absolute bottom-0 bg-denary right-0 pl-1 text-xs text-senary cursor-pointer" onClick={() => setExpanded(false)}>
                                ... Show less
                            </span>
                        )}
                    </div>

                    <div className='flex flex-row items-center gap-1 flex-wrap' onClick={() => playOrPauseHandler(voice)}>
                        {
                            Object.values(voice.labels).map((label) => (
                                <div key={`${voice.voice_id}${label}`} className='text-xs text-senary w-max bg-senary/20 \ px-2 py-1 rounded-sm'>{label.replace("_", " ")}</div>
                            ))
                        }
                    </div>

                </div>
            </div>

            <button className='text-xs text-white bg-greys3 hover:bg-greys4/80 transition-all duration-300 border rounded-md border-greys1/40 px-4 py-2 cursor-pointer text-nowrap' onClick={() => {
                onVoiceSelected(voice)
            }}>
                Use Voice
            </button>
        </div>
    )
}

export default NarratorVoiceItem