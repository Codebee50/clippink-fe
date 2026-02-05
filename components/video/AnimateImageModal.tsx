import React, { useCallback, useEffect, useState } from 'react'
import { Scene, SceneAnimationSuccessfulPayload, VideoUpdateMessageBody } from '@/lib/types/video'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { MdOutlineClose } from "react-icons/md";
import Image from 'next/image'
import LoadingButton from '../buttons/LoadingButton';
import { useVideoStore } from '@/lib/store/video';
import useVideoUpdateWs from '@/hooks/useVideoUpdateWs';
import { makeMsUrl } from '@/constants';
import usePostRequest from '@/hooks/usePost';
import useStyledToast from '@/hooks/useStyledToast';
import { AxiosError } from 'axios';
import { genericErrorHandler } from '@/lib/errorHandler';


const AnimateImageModal = ({ scene, open = false, onOpenChange = () => { } }: { scene: Scene, open?: boolean, onOpenChange?: (open: boolean) => void }) => {
    const [isOpen, setIsOpen] = useState(open)
    const [generatingAnimation, setGeneratingAnimation] = useState(false)
    const [animationPrompt, setAnimationPrompt] = useState<string | null>(null)

    const toast = useStyledToast()
    const replaceScene = useVideoStore((state) => state.replaceScene)


    const { mutate: initiateAnimation, isLoading: isInitiatingAnimation } = usePostRequest({
        url: "/video/scene/image/animate/",
        onSuccess: () => {
            setGeneratingAnimation(true)
        },
        onError: (error: AxiosError) => {
            toast.error(genericErrorHandler(error, "Failed to initiate animation"))
            setGeneratingAnimation(false)
        }
    })

    useEffect(() => {
        setIsOpen(open)
    }, [open])


    const closeModal = () => {
        setIsOpen(false)
        onOpenChange(false)
    }

    const handleVideoUpdate = useCallback((data: VideoUpdateMessageBody) => {
        if (data.type === "scene_animation_successful") {
            const payload = data.payload as SceneAnimationSuccessfulPayload
            replaceScene(payload.scene)
            setGeneratingAnimation(false)
            toast.success("Animation generated successfully")
            closeModal()
        }
    }, [replaceScene, closeModal])

    useVideoUpdateWs({
        onMessage: handleVideoUpdate,
        listenerId: "animate-image-modal"
    })

    const handleInitiateAnimation = () => {
        const requestBody = {
            scene_id: scene.id,
        } as {
            scene_id: string,
            prompt?: string
        }

        if (animationPrompt && animationPrompt.trim() !== "") {
            requestBody.prompt = animationPrompt
        }
        initiateAnimation(requestBody)
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open)
            onOpenChange(open)
        }}>
            <DialogTrigger>
                {/* <div>AnimateImageModal</div> */}
            </DialogTrigger>
            <DialogContent showCloseButton={false} className='bg-denary border-greys1/10 pt-0 overflow-hidden p-0 max-h-[95vh]'>
                <DialogHeader>
                    <div className='w-full flex flex-row items-center justify-between  border-b border-greys1/20 py-2 px-4'>

                        <div className='flex flex-row items-center gap-4'>
                            <div className='flex flex-row items-center border border-senary/20 bg-senary/10 rounded-md py-2 px-4 h-[40px] w-[40px] justify-center'>
                                <p className='text-sm text-senary '>#{scene.order_number}</p>
                            </div>

                            <DialogTitle className='text-white font-medium text-[1rem]'>Animate Image </DialogTitle>


                        </div>

                        <button onClick={() => {
                            closeModal()
                        }} className='flex flex-row items-center gap-2 w-[30px] h-[30px] border border-greys1/20 rounded-md justify-center cursor-pointer  transition-all duration-300'>
                            <MdOutlineClose size={16} className='text-white text-lg cursor-pointer hover:text-red-500 transition-all duration-300' />
                        </button>

                    </div>
                    <DialogDescription className='hidden'>
                        Animate image for the scene {scene.order_number}
                    </DialogDescription>
                </DialogHeader>


                <div className='w-full flex flex-row gap-4 px-4 pb-6'>

                    <Image src={scene.image_url || ""} alt={scene.visual_prompt} width={100} height={100} className='w-[170px] h-[250px] object-cover rounded-md' />
                    <div className='w-full flex flex-col gap-2'>
                        <div>
                            <p className='text-white text-sm font-medium'>Visual Prompt (optional)</p>
                            <p className='text-greys2/80 text-sm'>Describe how you want the image animated</p>
                        </div>

                        <textarea
                            className='w-full h-[120px] bg-greys1/10 rounded-md p-2 text-sm text-greys2 border border-greys1/20 resize-none cus-scrollbar outline-none focus:ring-0 focus:ring-offset-0'
                            placeholder='Example: Make the cat jump'
                            value={animationPrompt || ""}
                            onChange={(e) => setAnimationPrompt(e.target.value)}
                        />

                        <LoadingButton text="Animate Image" loadingText="Animating..." onClick={handleInitiateAnimation} isLoading={isInitiatingAnimation || generatingAnimation} className='mt-5' />

                    </div>

                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AnimateImageModal