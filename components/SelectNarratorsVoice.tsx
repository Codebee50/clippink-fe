import React, { useEffect, useRef, useState } from 'react'
import useFetchRequest from '@/hooks/useFetch';
import { makeMsUrl } from '@/constants';
import { AxiosResponse } from 'axios';
import { BackgroundMusicResponse, NarratorsVoiceResponse } from '@/lib/types/video';
import { IoPauseOutline, IoPlayOutline } from 'react-icons/io5';
import { PiMusicNotesBold } from 'react-icons/pi';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import gradientAvatar from 'gradient-avatar';
import SoundLottie from './lottie/SoundLottie';

const SelectNarratorsVoice = ({ onSelect }: { onSelect: (voice: NarratorsVoiceResponse) => void }) => {

    const [narratorsVoiceList, setNarratorsVoiceList] = useState<NarratorsVoiceResponse[]>([]);
    const [selectedNarratorsVoice, setSelectedNarratorsVoice] = useState<NarratorsVoiceResponse | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [playingVoice, setPlayingVoice] = useState<NarratorsVoiceResponse | null>(null);

    const playOrPauseVoice = (voice: NarratorsVoiceResponse | null) => {
        console.log(voice);
        if (audioRef.current && voice) {
            if (playingVoice?.voice_id === voice.voice_id) {
                if (isPlaying) {
                    audioRef.current.pause();
                    setIsPlaying(false);
                } else {
                    audioRef.current.play();
                    setIsPlaying(true);
                }
                return
            }
            setPlayingVoice(voice);
            audioRef.current.src = voice.preview_url;
            audioRef.current?.play();
            setIsPlaying(true);
        }
    }



    const updateSelectedNarratorsVoice = (voice: NarratorsVoiceResponse) => {
        setSelectedNarratorsVoice(voice)
        onSelect(voice)
    }


    const getGradientAvatar = (name: string) => {
        return gradientAvatar(name)
    }
    const { mutate: getNarratorsVoice, isLoading: isGettingNarratorsVoice } = useFetchRequest({
        url: makeMsUrl(`/assets/voices/list/`),
        onSuccess: (response: AxiosResponse) => {
            const data = response.data.voices as NarratorsVoiceResponse[];
            const dataWithAvatars = data.map(voice => {
                return {
                    ...voice,
                    gradient_avatar: getGradientAvatar(voice.name)
                }
            })
            setNarratorsVoiceList(dataWithAvatars);
            if (dataWithAvatars.length > 0) {
                updateSelectedNarratorsVoice(dataWithAvatars[0])
            }
        },
    });

    const isPlayingVoice = (voice: NarratorsVoiceResponse | null) => {
        return isPlaying && playingVoice?.voice_id === voice?.voice_id;
    }

    const clearVoice = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setPlayingVoice(null);
            setIsPlaying(false);
        }
    }

    useEffect(() => {
        getNarratorsVoice();
    }, []);

    return (
        <>
            <audio ref={audioRef} onEnded={clearVoice} />

            <div className='w-full flex flex-col items-start  gap-4 bg-greys1/20 p-4 rounded-md border border-greys1/60 border-dashed'>
                <p className='text-white'>Choose your narrator</p>

                <div className='w-full flex flex-row items-center justify-between gap-4 flex-wrap'>
                    <div className='flex flex-row  gap-2'>

                        <span
                            className="w-[35px] h-[35px] rounded-full overflow-hidden flex items-center justify-center shrink-0"
                            dangerouslySetInnerHTML={{ __html: selectedNarratorsVoice?.gradient_avatar || "" }}
                        />

                        {
                            selectedNarratorsVoice && (
                                <div className="flex flex-col gap-1 items-start">
                                    <p className="text-sm text-white">{selectedNarratorsVoice.name}</p>
                                    <p className="text-xs text-greys4">{selectedNarratorsVoice.description}</p>
                                </div>
                            )
                        }
                    </div>


                    <div className='flex flex-row gap-2 items-center'>
                        {
                            isPlayingVoice(selectedNarratorsVoice) && (
                                <SoundLottie />
                            )
                        }

                        <button onClick={() => playOrPauseVoice(selectedNarratorsVoice)} className='text-xs text-white bg-denary hover:bg-denary/80 transition-all duration-300 border rounded-md w-[38px] h-[38px] flex items-center justify-center border-greys1/60 cursor-pointer'>

                            {
                                isPlayingVoice(selectedNarratorsVoice) ? (
                                    <IoPauseOutline size={16} className="text-white" />
                                ) : (
                                    <IoPlayOutline size={16} className="text-white" />
                                )
                            }

                        </button>
                        <button className='text-xs text-white bg-senary border rounded-md border-greys1/60 px-6 py-2 cursor-pointer' onClick={() => setIsOpen(true)}>Change</button>

                    </div>


                </div>



            </div>


            <Dialog open={isOpen} onOpenChange={(open) => {
                setIsOpen(open);
                if (!open) {
                    clearVoice()
                }
            }}>
                <DialogTrigger></DialogTrigger>
                <DialogContent className='bg-denary border-greys1/10'>
                    <DialogHeader>
                        <DialogTitle className='font-normal text-lg'>Choose your narrator</DialogTitle>
                        <DialogDescription className='hidden'>
                            Select a narrator to use in your video
                        </DialogDescription>

                        <div className="w-full flex flex-col gap-2 pt-4">
                            <div className="w-full flex flex-col gap-5 h-[400px] overflow-y-scroll cus-scrollbar">
                                {narratorsVoiceList.map(voice => (
                                    <div key={voice.voice_id} className="w-full flex flex-row items-center gap-4 justify-between cursor-pointer " >
                                        <div className="flex flex-row items-center gap-2" onClick={() => playOrPauseVoice(voice)}>
                                            {
                                                isPlayingVoice(voice) ? <SoundLottie /> : <span className="w-[35px] h-[35px] rounded-full overflow-hidden flex items-center justify-center shrink-0" dangerouslySetInnerHTML={{ __html: voice.gradient_avatar || "" }} />

                                            }
                                            <div className="flex flex-col gap-1 text-start">
                                                <p className="text-sm text-white">{voice.name}</p>
                                                <p className="text-xs text-greys4">{voice.description}</p>
                                            </div>
                                        </div>

                                        <button className='text-xs text-white bg-greys3 hover:bg-greys4/80 transition-all duration-300 border rounded-md border-greys1/40 px-4 py-2 cursor-pointer text-nowrap' onClick={() => {
                                            updateSelectedNarratorsVoice(voice);
                                            clearVoice()
                                            setIsOpen(false)
                                        }}>
                                            Use Voice
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default SelectNarratorsVoice