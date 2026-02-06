import React, { useEffect, useRef, useState } from 'react'
import { IoPauseOutline, IoPlayOutline } from 'react-icons/io5'

const PlayPauseAudio = ({ audio_url, id, sizePx = 40, playingAudioId = null, onPlay = (id: string) => { }, onPause = (id: string) => { }, volume = 0.5 }: { audio_url: string, id: string, sizePx?: number, playingAudioId?: string | null, onPlay?: (id: string) => void, onPause?: (id: string) => void, volume?: number }) => {
    const audioref = useRef<HTMLAudioElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const pauseOrPlayAudio = () => {
        if (audioref.current) {
            if (audioref.current.paused) {
                audioref.current.play()
            }
            else {
                audioref.current.pause()
            }
        }
    }

    useEffect(() => {
        if (audioref.current) {
            audioref.current.src = audio_url
        }
    }, [audio_url])

    useEffect(() => {
        if (audioref.current) {
            audioref.current.volume = volume ?? 0.5
        }
    }, [volume])


    useEffect(() => {
        const audio = audioref.current
        if (!audio) return

        const handlePlay = () => {
            setIsPlaying(true)
            onPlay(id)
        }
        const handlePause = () => {
            setIsPlaying(false)
            onPause(id)
        }

        audio.addEventListener('play', handlePlay)
        audio.addEventListener('pause', handlePause)

        return () => {
            audio.removeEventListener('play', handlePlay)
            audio.removeEventListener('pause', handlePause)
        }
    }, [])


    useEffect(() => {
        if (playingAudioId && id !== playingAudioId && audioref.current && !audioref.current.paused) {
            audioref.current.pause()
            audioref.current.currentTime = 0
        }
    }, [playingAudioId, id])

    return (
        <>
            {
                <audio ref={audioref} loop={true} />
            }

            <button onClick={pauseOrPlayAudio} className="rounded-full cursor-pointer bg-greys1/10 border border-greys1/20 flex items-center justify-center shrink-0" style={{
                width: sizePx,
                height: sizePx,
            }}>
                {
                    isPlaying ? <IoPauseOutline size={16} /> : <IoPlayOutline size={16} />
                }

            </button>


        </>
    )
}

export default PlayPauseAudio