import usePostRequest from '@/hooks/usePost';
import useStyledToast from '@/hooks/useStyledToast';
import { genericErrorHandler } from '@/lib/errorHandler';
import { useVideoStore } from '@/lib/store/video';
import { Scene } from '@/lib/types/video';
import { AxiosError, AxiosResponse } from 'axios';
import { error } from 'console';
import React, { useState } from 'react'
import { IoIosAdd } from "react-icons/io";
import CircleSpinner from '../loaders/CircleSpinner';


type PropType = {
    currentScene: Scene | null
    prevSceneOrderNumber: number | null;
    nextSceneOrderNumber: number | null
}

const AddSceneButton = ({ currentScene, prevSceneOrderNumber, nextSceneOrderNumber }: PropType) => {

    const toast = useStyledToast()
    const addScene = useVideoStore((state) => state.addScene)
    const video = useVideoStore((state) => state.video)

    const { mutate: createNewScene, isLoading: isCreatingNewScene } = usePostRequest({
        url: "/video/scene/create-new/",
        onSuccess: (response: AxiosResponse) => {
            const scene = response.data as Scene
            addScene(scene)

        },
        onError: (error: AxiosError) => {
            toast.error(genericErrorHandler(error, "Could not create scene"))
        }
    })

    const calculateNewSceneOrderNumber = (): number | null => {
        if (!prevSceneOrderNumber && nextSceneOrderNumber) {
            // this means there is no previous scene but there is a next scene
            //i.e we are at the top of the scene list

            return nextSceneOrderNumber - 1000
        }

        if (prevSceneOrderNumber && !nextSceneOrderNumber && currentScene) {
            //this means there is a previous scene but there is no next scene 
            //i.e we are at the bottom of the scene list
            return currentScene.order_number + 1000
        }

        if (prevSceneOrderNumber && nextSceneOrderNumber) {
            return (prevSceneOrderNumber + nextSceneOrderNumber) / 2
        }

        return null
    }

    const handleCreateSceneClicked = () => {
        if (!video) return null

        const newOrderNumber = calculateNewSceneOrderNumber()

        if(!newOrderNumber){
            toast.error("Failed to calculate new scene position")
            return newOrderNumber
        }

        // console.log(prevSceneOrderNumber, newOrderNumber, nextSceneOrderNumber)

        createNewScene({
            video_id: video.id,
            order_number: newOrderNumber
        })

    }

    return (
        <div className='w-full flex flex-row items-center justify-center'>
            <button disabled={isCreatingNewScene} className='border rounded-full disabled:opacity-50 border-greys1 border-dashed p-1 group hover:border-senary transition-all ease-in-out duration-300 cursor-pointer' onClick={handleCreateSceneClicked}>

                {
                    isCreatingNewScene ? <CircleSpinner size={15} color="var(--color-greys1)" /> : <IoIosAdd className='group-hover:text-senary transition-all ease-in-out duration-300' />

                }

            </button>
        </div>
    )
}

export default AddSceneButton