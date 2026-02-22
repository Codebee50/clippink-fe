"use client"

import BreadCrumbs from '@/components/BreadCrumbs'
import Footer from '@/components/Footer'
import { Progress } from '@/components/ui/progress'
import ShortClipCard from '@/components/videotoshorts/ShortClipCard'
import { makeMsUrl, WS_PROTOCOL } from '@/constants'
import useFetchRequest from '@/hooks/useFetch'
import useStyledToast from '@/hooks/useStyledToast'
import { genericErrorHandler } from '@/lib/errorHandler'
import { BreadCrumbItem } from '@/lib/types/global'
import { ClipGeneratedPayload, ClippedVideo, ClippedVideoStatus, ProgressUpdateWsPayload, ShortClip, TextMessageWsPayload, VideoClippingTaskUpdateWsBody } from '@/lib/types/videotoshorts'
import { getClassNameForStatus } from '@/lib/utils'
import { AxiosError, AxiosResponse } from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ReconnectingWebSocket from 'reconnecting-websocket'



const Page = () => {

    const toast = useStyledToast()
    const [shortClips, setShortClips] = useState<ShortClip[]>([])
    const [clippedVideo, setClippedVideo] = useState<ClippedVideo | null>(null)
    const [progress, setProgress] = useState<number>(0)
    const [progressMessage, setProgressMessage] = useState<string>("")
    const { video_id } = useParams()


    const breadCrumbs: BreadCrumbItem[] = [
        {
            label: "Dashboard",
            href: "/dashboard",
        },
        {
            label: "Video to shorts",
            href: "/dashboard/?section=to-shorts",
        },
        {
            label: clippedVideo ? clippedVideo.title : "Video",
            href: `/dashboard/clipped/${clippedVideo?.id}`,
        },

    ];


    const { mutate: fetchUserClipped, isLoading: isFetchingUserVideos } = useFetchRequest({
        url: `/to-shorts/${video_id}`,
        onSuccess: (response: AxiosResponse) => {
            const shortClipList = response.data.short_clips as ShortClip[]
            setClippedVideo(response.data as ClippedVideo)
            setShortClips(shortClipList)
        },
        onError: (error: AxiosError) => {
            toast.error(genericErrorHandler(error, "Could not fetch clipped videos"))
        }
    })



    useEffect(() => {
        fetchUserClipped()
    }, [])

    useEffect(() => {

        if (clippedVideo && (clippedVideo.status === 'pending' || clippedVideo.status === 'processing')) {
            console.log("connecting to task update ws")
            const rws = new ReconnectingWebSocket(`${makeMsUrl(`/ws/task/update/${video_id}`, WS_PROTOCOL)}`);
            rws.onmessage = (event) => {
                const data = JSON.parse(event.data) as VideoClippingTaskUpdateWsBody
                if (data.type === 'progress_update' && data.progress) {
                    const payload = data.payload as ProgressUpdateWsPayload

                    if (data.progress) {
                        setProgress(data.progress)

                    }
                    if (payload.message) {
                        setProgressMessage(payload.message)
                    }
                }


                if (data.type === 'clip_generated') {
                    const payload = data.payload as ClipGeneratedPayload
                    setShortClips((prev) => [...prev, payload.clip])
                }

                if (data.type === 'text_notification') {
                    const payload = data.payload as TextMessageWsPayload
                    setProgressMessage(payload.message)
                }

                if (data.type === 'completed') {
                    fetchUserClipped()
                }
            }


        }

    }, [clippedVideo?.id])

    return (
        <div className='w-full min-h-screen bg-denary padding-x py-6'>


            <div className='section-con'>
                <div className="pt-4 pb-4 w-full fixed top-0 bg-denary z-10">
                    <BreadCrumbs breadCrumbs={breadCrumbs} />
                </div>




                {
                    clippedVideo && <div className='flex flex-col py-10 gap-2'>
                        <p className='text-xl'>{clippedVideo.title}</p>

                        <div className='flex flex-row items-center gap-5 flex-wrap'>
                            <div className={`border border-greys1/30 rounded-md w-max px-4 py-1 text-xs ${getClassNameForStatus(clippedVideo.status)}`}>
                                <p>{clippedVideo.status}</p>

                            </div>

                            {
                                (clippedVideo.status === 'pending' || clippedVideo.status === 'processing') && <div className='flex flex-col flex-1 gap-1'>
                                    <Progress value={progress} className="w-[90%] max-w-[200px] bg-greys1/20" indicatorClassName="bg-senary" />
                                    <p className='text-sm text-greys4'>{progressMessage}</p>
                                </div>

                            }

                        </div>



                    </div>
                }

                <div className='w-full grid grid-cols-4 gap-4'>

                    {
                        shortClips?.map((clip) => {
                            return <ShortClipCard clip={clip} key={clip.id} />
                        })
                    }

                </div>
            </div>


            <Footer />


        </div>
    )
}

export default Page