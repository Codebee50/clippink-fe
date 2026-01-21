"use client";

import React, { useEffect, useRef, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { BackgroundMusicResponse } from '@/lib/types/video'
import { PiMusicNotesBold } from 'react-icons/pi'
import { IoPauseOutline, IoPlayOutline } from 'react-icons/io5'
import { AxiosResponse } from 'axios'
import useFetchRequest from '@/hooks/useFetch'
import { makeMsUrl } from '@/constants'
import SoundLottie from './lottie/SoundLottie';

const SelectBackgroundMusicModal = ({ onSelect }: { onSelect: (audio: BackgroundMusicResponse) => void }) => {
  const [backgroundMusic, setBackgroundMusic] = useState<BackgroundMusicResponse[]>([]);
  const [selectedBackgroundMusic, setSelectedBackgroundMusic] = useState<BackgroundMusicResponse | null>(null);
  const [playingAudio, setPlayingAudio] = useState<BackgroundMusicResponse | null>(null)
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: getBackgroundMusic, isLoading: isGettingBackgroundMusic } = useFetchRequest({
    url: makeMsUrl(`/assets/background-audio/list/`),
    onSuccess: (response: AxiosResponse) => {
      const data = response.data as BackgroundMusicResponse[];
      setBackgroundMusic(data);
      setSelectedBackgroundMusic(data[0]);
      onSelect(data[0]);
    },
  });

  const playOrPauseAudio = (audio: BackgroundMusicResponse | null) => {
    if (audioRef.current && audio) {
      if (playingAudio?.id === audio.id) {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          audioRef.current.play();
          setIsPlaying(true);
        }
        return
      }
      setPlayingAudio(audio);
      audioRef.current.src = audio.url;
      audioRef.current?.play();
      setIsPlaying(true);
    }
  }

  const clearAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayingAudio(null);
      setIsPlaying(false);
    }
  }


  const selectBackgroundMusic = (audio: BackgroundMusicResponse) => {
    setSelectedBackgroundMusic(audio);
    setIsOpen(false);
    clearAudio();
    onSelect(audio);
  }

  const isPlayingAudio = (audio: BackgroundMusicResponse | null) => {
    return isPlaying && playingAudio?.id === audio?.id;
  }

  useEffect(() => {
    getBackgroundMusic();
  }, []);

  return (
    <>
      {
        <audio ref={audioRef} loop={true} />

      }
      <div className='w-full flex flex-col items-start  gap-4 bg-greys1/20 p-4 rounded-md border border-greys1/60 border-dashed'>
        <p className='text-white'>Select Background Music</p>

        <div className='w-full flex flex-row items-center justify-between'>
          <div className='flex flex-row  gap-2'>

            <button className="w-[35px] h-[35px] rounded-md bg-denary border border-greys1/20 flex items-center justify-center">
              <PiMusicNotesBold size={16} className="text-white" />

            </button>

            {
              selectedBackgroundMusic && (
                <div className="flex flex-col gap-1 items-start">
                  <p className="text-sm text-white">{selectedBackgroundMusic.name}</p>
                  <p className="text-xs text-greys4">{selectedBackgroundMusic.description}</p>
                </div>
              )
            }
          </div>


          <div className='flex flex-row gap-2 items-center'>
            {
              isPlayingAudio(selectedBackgroundMusic) && (
                <SoundLottie />
              )
            }
            <button onClick={() => playOrPauseAudio(selectedBackgroundMusic)} className='text-xs text-white bg-denary hover:bg-denary/80 transition-all duration-300 border rounded-md w-[38px] h-[38px] flex items-center justify-center border-greys1/60 cursor-pointer'>

              {
                isPlayingAudio(selectedBackgroundMusic) ? (
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

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>

        </DialogTrigger>
        <DialogContent className='bg-denary border-greys1/10'>
          <DialogHeader>
            <DialogTitle className='font-normal text-lg'>Choose Background Music</DialogTitle>
            <DialogDescription>
              <div className="w-full flex flex-col gap-2 ">

                <input type="text" placeholder='Search for a background music' className='w-full outline-none text-sm  px-5 py-2 border border-greys1/30 rounded-sm resize-none bg-greys5 cus-scrollbar placeholder:text-sm placeholder:leading-7 placeholder:text-greys4/80' />

                <div className="w-full flex flex-col gap-7 mt-2 h-[330px] overflow-y-scroll cus-scrollbar">
                  {backgroundMusic.map(music => (
                    <div key={music.id} className="w-full flex flex-row items-center gap-2 justify-between ">
                      <div className="flex flex-row items-center gap-2">

                        <div className="flex flex-col gap-1">
                          <p className="text-sm text-white">{music.name}</p>
                          <p className="text-xs text-greys4">{music.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        {
                          isPlayingAudio(music) && (
                            <SoundLottie />
                          )
                        }
                        <button onClick={() => playOrPauseAudio(music)} className="flex flex-row gap-2 w-[35px] h-[35px] rounded-md bg-greys1/10 border border-greys1/20 items-center justify-center cursor-pointer hover:bg-greys1/20 transition-all duration-300">
                          {
                            isPlayingAudio(music) ? (
                              <IoPauseOutline size={16} className="text-white" />
                            ) : (
                              <IoPlayOutline size={16} className="text-white" />
                            )
                          }
                        </button>
                        <button className='text-xs text-white bg-senary border rounded-md border-greys1/60 px-6 py-2 cursor-pointer' onClick={() => {
                          selectBackgroundMusic(music);
                        }}>Select</button>

                      </div>

                    </div>
                  ))}
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>

  )
}

export default SelectBackgroundMusicModal