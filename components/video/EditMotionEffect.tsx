"use client"

import React, { useEffect, useRef, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AnimationType, Scene, VideoResponse } from '@/lib/types/video'
import Image from 'next/image'
import { MdOutlineClose } from "react-icons/md";
import VideoPlayer from './VideoPlayer'
import { makeMsUrl, motionEffects } from '@/constants'
import { BsStars } from "react-icons/bs";
import LoadingButton from '../buttons/LoadingButton'
import usePatchRequest from '@/hooks/usePatch'
import useStyledToast from '@/hooks/useStyledToast'
import { useVideoStore } from '@/lib/store/video'



const EditMotionEffectModal = ({ scene, open = false, onOpenChange = () => { } }: { scene: Scene, open?: boolean, onOpenChange?: (open: boolean) => void }) => {
  // const [isOpen, setIsOpen] = useState(open)
  const [motionEffect, setMotionEffect] = useState<AnimationType | null>(scene.motion_effect || null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { replaceScene } = useVideoStore()

  const toast = useStyledToast()


  const animationTypeToVideo = (animationType: AnimationType, imageUrl: string = "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/19f807ac-468d-4a57-a1c2-d01faaf96848.jpeg"): VideoResponse => {
    const scene = {
      order_number: 1,
      media_type: 'image',
      video_id: '',
      narration: '',
      duration_seconds: 1,
      mood: 'neutral',
      audio_file_key: null,
      image_file_key: null,
      video_file_key: null,
      captions: null,
      id: '',
      visual_prompt: '',
      audio_url: null,
      image_url: imageUrl,
      video_url: null,
      audio_duration_seconds: null,
      motion_effect: animationType,
    } as Scene

    const video = {
      created_at: new Date().toISOString(),
      status: 'completed',
      final_audio_key: null,
      script: '',
      id: '',
      updated_at: new Date().toISOString(),
      final_audio_url: null,
      thumbnail_url: null,
      title: null,
      scenes: [scene]

    } as VideoResponse

    return video
  }


  const updateMotionEffect = (motionEffect: AnimationType) => {
    setMotionEffect(motionEffect)
    const container = containerRef.current
    if (container) {
      container.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  const { mutate: updateMotionEffectMutation, isLoading: isUpdatingMotionEffect } = usePatchRequest({
    url: makeMsUrl(`/video/scenes/${scene.id}/`),
    onSuccess: (response) => {
      toast.success("Motion effect updated successfully")

      const updatedScene = {
        ...scene,
        motion_effect: motionEffect
      } as Scene

      replaceScene(updatedScene)
      onOpenChange(false)

    },
    onError: (error) => {
      toast.error("Failed to update motion effect")
    }
  })

  const handleSubmit = () => {
    if (!motionEffect) {
      toast.error("Please select a motion effect")
      return
    }
    updateMotionEffectMutation({
      motion_effect: motionEffect
    })
  }





  return (

    <Dialog open={open} onOpenChange={(open) => {
      onOpenChange(open)
    }}>
      <DialogTrigger>
        {/* <div className="flex flex-row items-center gap-2 w-[50px] h-[50px] bg-greys1/60 rounded-full justify-center cursor-pointer hover:bg-greys1/80 transition-all duration-300">
          <BiEdit />
        </div> */}
      </DialogTrigger>
      <DialogContent showCloseButton={false} className='bg-denary border-greys1/10 pt-0 overflow-hidden p-0 max-h-[95vh]'>
        <DialogHeader>
          <div className='w-full flex flex-row items-center justify-between  border-b border-greys1/20 py-2 px-4'>

            <div className='flex flex-row items-center gap-4'>
              <div className='flex flex-row items-center border border-senary/20 bg-senary/10 rounded-md py-2 px-4 h-[40px] w-[40px] justify-center'>
                <p className='text-sm text-senary '>#{scene.order_number}</p>
              </div>

              <DialogTitle className='text-white font-medium text-[1rem]'>Change motion effect </DialogTitle>


            </div>

            <button onClick={() => {
              onOpenChange(false)
            }} className='flex flex-row items-center gap-2 w-[30px] h-[30px] border border-greys1/20 rounded-md justify-center cursor-pointer  transition-all duration-300'>
              <MdOutlineClose size={16} className='text-white text-lg cursor-pointer hover:text-red-500 transition-all duration-300' />
            </button>

          </div>
          <DialogDescription className='hidden'>
            Change motion effect for the scene {scene.order_number}
          </DialogDescription>
        </DialogHeader>

        <div className='w-full flex flex-col gap-2 px-4 pb-6'>
          <div className='w-full pt-2 flex flex-col gap-2' ref={containerRef}>
            <div className='w-full grid grid-cols-1 gap-2 justify-items-center items-center'>

              <div className='w-full flex flex-col gap-2'>

                <div className='w-full h-[170px] flex items-center justify-center'>
                  <VideoPlayer video={animationTypeToVideo(motionEffect || "none", scene.image_url || "")} width={150} height={170} controls={false} autoPlay={true} overrideDurationInFrames={100} loop={true} />


                </div>

              </div>



              <div className='w-full flex flex-col gap-2'>
                <div className='w-full  flex flex-row flex-wrap items-center   gap-2 max-h-[300px] overflow-y-scroll cus-scrollbar'>
                  {motionEffects.map((effect) => (
                    <div key={effect.value} onClick={() => updateMotionEffect(effect.value)} className={`w-max text-center flex-1  border border-greys1/20 bg-greys3 flex flex-col items-center justify-center cursor-pointer rounded-md p-3 text-sm ${motionEffect === effect.value ? "border-senary" : ""}`}>
                      <p className='text-greys2 text-nowrap '>{effect.displayName}</p>
                      {/* <p className='text-xs text-greys2/50'>Click to preview</p> */}

                    </div>
                  ))}
                </div>
              </div>

            </div>




            <LoadingButton text="Update Motion Effect" onClick={handleSubmit} isLoading={isUpdatingMotionEffect} />

          </div>
        </div>


      </DialogContent>
    </Dialog>
  )
}

export default EditMotionEffectModal