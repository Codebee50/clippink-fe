import { Slider } from "@/components/ui/slider"
import React, { useEffect, useState, useRef } from 'react'
import { IoVolumeMedium } from "react-icons/io5";
import { MdOutlineLibraryMusic } from "react-icons/md";
import { LuCloudUpload } from "react-icons/lu";
import { AiOutlineRobot } from "react-icons/ai";
import { makeMsUrl } from "@/constants";
import useFetchRequest from "@/hooks/useFetch";
import { AxiosResponse } from "axios";
import { BackgroundMusicResponse } from "@/lib/types/video";
import { IoPlayOutline } from "react-icons/io5";
import UploadAudio from "../UploadAudio";
import Image from "next/image";

import { MdVolumeUp } from "react-icons/md";
import { useVideoStore } from "@/lib/store/video";
import PlayPauseAudio from "./PlayPauseAudio";
import useStyledToast from "@/hooks/useStyledToast";
import UpdateBackgroundAudio from "./UpdateBackgroundAudio";
import { IoWarningOutline } from "react-icons/io5";



const BackgroundAudioSettings = () => {

    const video = useVideoStore((state) => state.video)
    const toast = useStyledToast()

    const [audioSource, setAudioSource] = useState<string>("audio_library");
    const [backgroundMusicList, setBackgroundMusicList] = useState<BackgroundMusicResponse[]>([]);
    const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);

// 
    const updateVideo = useVideoStore((state) => state.updateVideo)

    const volumeChangeDebounceTimer = useRef<NodeJS.Timeout | null>(null)


    const audioSourceOptions = [
        {
            label: "Audio library",
            Icon: MdOutlineLibraryMusic,
            value: "audio_library",
        },
        {
            label: "Upload audio",
            Icon: LuCloudUpload,
            value: "uploaded_audio",
        },
        // {
        //     label: "AI audio",
        //     Icon: AiOutlineRobot,
        //     value: "ai_audio",
        // },
    ]

    const handlePlay = (id: string) => {
        setPlayingAudioId(id)
    }


    const isIOS = () => {
        if (typeof window === "undefined") return false

        return /iPad|iPhone|iPod/.test(navigator.userAgent)
    }



    const handleVolumeChange = (value: number[]) => {
        const volume = value[0] / 100

        updateVideo({ background_audio_volume: volume })

        if (volumeChangeDebounceTimer.current) {
            clearTimeout(volumeChangeDebounceTimer.current)
        }

        volumeChangeDebounceTimer.current = setTimeout(() => {
            updateVideo({ background_audio_volume: volume }, true)
        }, 1000)
    }

    const handleSelectBackgroundAudio = async (audio: BackgroundMusicResponse) => {
        const response = await updateVideo({ background_audio_id: audio.id }, true)
        if (response?.status === 200) {
            toast.success("Background audio updated successfully")
        } else {
            toast.error("Failed to update background audio")
        }
    }

    const { mutate: getBackgroundMusicList, isLoading: isGettingBackgroundMusicList } = useFetchRequest({
        url: `/assets/background-audio/list/`,
        onSuccess: (response: AxiosResponse) => {
            const data = response.data as BackgroundMusicResponse[];
            setBackgroundMusicList(data);
        },
    });
    useEffect(() => {
        getBackgroundMusicList();
    }, []);

    return (
        <div className='w-full h-full border-r border-r-greys1/20 bg-[#0C0C10] overflow-y-scroll px-1  pb-10 flex flex-col gap-1 cus-scrollbar shrink-0 pt-3'>



            {
                video?.background_audio && <div className='w-full  bg-denary border border-greys1/10 rounded-md px-4 pt-3 pb-6 flex flex-col gap-2'>

                    <p className='text-greys1 text-sm uppercase'>CURRENTLY USING</p>

                    <div className="w-full  bg-denary rounded-lg border border-greys1/10 p-4 flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center gap-2">
                            <Image src="/music-player.png" alt="background audio" width={40} height={40} className="object-cover object-center" />

                            <div className="flex flex-col ">
                                <p className="max-sm:text-sm line-clamp-2 ">{video?.background_audio.name}</p>
                                <div className="flex flex-row items-center gap-1 text-greys1">

                                    <MdVolumeUp size={16} />
                                    <p className="text-sm">{Math.round((video?.background_audio_volume || 0.5) * 100)}%</p>

                                </div>

                            </div>

                        </div>


                        <PlayPauseAudio audio_url={video?.background_audio.url} id={'currently_using'} onPlay={handlePlay} playingAudioId={playingAudioId} volume={video?.background_audio_volume ?? 0.5} />

                    </div>


                </div>
            }


            <div className='w-full  bg-denary border border-greys1/10 rounded-md px-4 pt-3 pb-6 flex flex-col gap-2'>
                <p className='text-greys1 text-sm'>Background Audio Volume</p>

                <div className='w-full bg-greys3 rounded-full h-[40px] flex flex-row items-center justify-between px-5 gap-6'>

                    <IoVolumeMedium size={18} />

                    <Slider
                        defaultValue={[(video?.background_audio_volume ?? 0.5) * 100]}
                        max={100}
                        step={1}
                        className="flex-1"
                        onValueChange={handleVolumeChange}
                    />

                    <p className='text-white text-sm'>
                        {Math.round((video?.background_audio_volume ?? 0.5) * 100)}%
                    </p>


                </div>

                {
                    isIOS() && <div className="w-full flex flex-row items-center justify-center gap-2">
                        <p className="text-xs text-yellow-500 flex flex-row items-center gap-2">
                            <IoWarningOutline size={16} className="text-yellow-500 shrink-0" />
                            KNOWN ISSUE: iOS Safari and some mobile browsers handle audio playback differently during in-browser preview, which can cause volume inconsistencies. We promise your rendered file will have accurate audio mixing.
                        </p>
                        {/* <p className="text-xs text-yellow-500">**Known Issue: Safari on iOS and certain other mobile browsers may display elevated background music volume during preview. Exported videos are unaffected and will retain proper audio levels.</p> */}
                    </div>
                }






            </div>


            <div className='w-full  bg-denary border border-greys1/10 rounded-md px-4 pt-3 pb-6 flex flex-col gap-2 flex-1'>

                <p className='text-greys1 text-sm'>Change Background Audio</p>

                <div className="w-full flex flex-row items-center justify-between gap-3 bg-greys3 rounded-md p-1">

                    {
                        audioSourceOptions.map((option) => (
                            <div key={option.label} className={`w-full flex flex-row items-center justify-center gap-2 px-2 py-1 cursor-pointer ${audioSource === option.value ? "bg-senary/70 rounded-md text-white " : "text-greys1"}`} onClick={() => setAudioSource(option.value)}>
                                <option.Icon size={18} />
                                <p className='text-sm text-nowrap'>{option.label}</p>
                            </div>
                        ))
                    }

                </div>

                {
                    audioSource === "audio_library" && <div className="w-full flex flex-col gap-4 mt-3">
                        {
                            backgroundMusicList.map((music) => (
                                <div key={music.id} className="w-full flex flex-row items-center  gap-2 justify-between">

                                    <div className="flex flex-row items-center gap-2">
                                        <PlayPauseAudio audio_url={music.url} id={music.id} onPlay={handlePlay} playingAudioId={playingAudioId} />

                                        <div className="flex flex-col gap-1">
                                            <p className="text-sm text-white line-clamp-1 truncate max-w-[200px]">{music.name}</p>
                                            <p className="text-xs text-greys4">{music.description}</p>
                                        </div>

                                    </div>
                                    <button onClick={() => handleSelectBackgroundAudio(music)} className="text-xs text-white bg-greys3 hover:bg-greys4/80 transition-all duration-300 border rounded-md border-greys1/40 px-4 py-2 cursor-pointer text-nowrap">Select</button>
                                </div>
                            ))
                        }

                    </div>
                }

                {
                    audioSource === "uploaded_audio" && <div className="w-full flex flex-col gap-4 mt-3">

                        <UpdateBackgroundAudio />
                    </div>
                }




            </div>
        </div>
    )
}

export default BackgroundAudioSettings