import React, { useEffect, useMemo, useState } from 'react'

import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover"
import { BiCopyAlt, BiExport, BiRefresh } from 'react-icons/bi'
import useFetchRequest from '@/hooks/useFetch'
import { makeMsUrl, WS_PROTOCOL } from '@/constants'
import { ExportedVideo, VideoResponse, VideoWsExportCompletedPayload, VideoWsExportProgressMessageBody } from '@/lib/types/video'
import { AxiosError, AxiosResponse } from 'axios'
import GooeyBalls from '../loaders/GooeyBalls'
import useStyledToast from '@/hooks/useStyledToast'
import { RiInformationLine } from "react-icons/ri";
import { Progress } from '../ui/progress';

import { MdOutlineFileDownload } from "react-icons/md";
import ReconnectingWebSocket from 'reconnecting-websocket'
import usePostRequest from '@/hooks/usePost'

import { SiOctanerender } from "react-icons/si";



const ExportVideoButton = ({ video = null }: { video: VideoResponse | null }) => {

    const [exportedVideo, setExportedVideo] = useState<ExportedVideo | null>(null)
    const [exportInProgress, setExportInProgress] = useState(true)
    const [progress, setProgress] = useState<number>(0)
    const [isOpen, setIsOpen] = useState(false)
    const [isDownloading, setIsDownloading] = useState(false)
    const toast = useStyledToast()

    const { mutate: getExportedVideo, isLoading: isGettingExportedVideo } = useFetchRequest({
        url: `/video/exported-video/${video?.id}/`,
        onSuccess: (response: AxiosResponse) => {
            const data = response.data

            if (data.last_exported_video) {
                const lastExportedVideo = data.last_exported_video as ExportedVideo
                setExportedVideo(lastExportedVideo)
            }
            setExportInProgress(data?.render_in_progress ?? false)

            setIsOpen(true)
        },
        onError: (error: AxiosError) => {
            if (error.status === 404) {
                setIsOpen(true)
                //Video has not been exported before, show the download button
                return
            }

            toast.error("Failed to export video")
        }
    })

    const { mutate: initiateExport, isLoading: isInitiatingExport } = usePostRequest({
        url: "/video/export/",
        onSuccess: (response: AxiosResponse) => {
            setExportInProgress(true)
        },
        onError: (error: AxiosError) => {
            if (error.status === 409) {
                setExportInProgress(true) //this means that the video is already being exported in the background
                return
            }
            toast.error("Failed to initiate video export")
        }
    })

    const isOutdated = useMemo(() => {
        if (!exportedVideo?.updated_at) return false
        const now = new Date().getTime()

        return (
            now - new Date(exportedVideo.updated_at).getTime() >
            3 * 60 * 1000
        );
    }, [exportedVideo])


    // Improved cross-device clipboard copy that works on iPhones and fallback for older browsers
    const copyToClipboard = (text: string, message: string = "Link copied to clipboard!") => {
        if (navigator.clipboard && window.isSecureContext) {
            // Modern async clipboard API
            navigator.clipboard
                .writeText(text)
                .then(() => {
                    toast.success(message);
                })
                .catch((err) => {
                    // fallback
                    fallbackCopyTextToClipboard(text, message);
                });
        } else {
            // fallback for iOS Safari and older browsers
            fallbackCopyTextToClipboard(text, message);
        }
    };

    function fallbackCopyTextToClipboard(text: string, message: string) {
        try {
            const textArea = document.createElement("textarea");
            textArea.value = text;
            // Place offscreen
            textArea.style.position = "fixed";
            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.width = "2em";
            textArea.style.height = "2em";
            textArea.style.padding = "0";
            textArea.style.border = "none";
            textArea.style.outline = "none";
            textArea.style.boxShadow = "none";
            textArea.style.background = "transparent";
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);

            if (successful) {
                toast.success(message);
            } else {
                toast.error("Could not copy text");
            }
        } catch (err) {
            console.error("Could not copy text: ", err);
            toast.error("Could not copy text");
        }
    }

    const handleDownload = async () => {
        if (!exportedVideo?.url) return;
        if (isDownloading) return

        try {
            setIsDownloading(true);

            const response = await fetch(exportedVideo.url);
            if (!response.ok) throw new Error('Download failed');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${video?.id || 'video'}.mp4`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            toast.success('Video downloaded successfully!');
        } catch (error) {
            console.error('Download failed:', error);
            toast.error('Failed to download video');
        } finally {
            setIsDownloading(false);
        }
    };



    useEffect(() => {
        if (exportInProgress && video?.id) {
            const rws = new ReconnectingWebSocket(`${makeMsUrl(`/ws/video/render/${video?.id}`, WS_PROTOCOL)}`);

            

            rws.onmessage = (event) => {
                const data = JSON.parse(event.data) as VideoWsExportProgressMessageBody

                console.log("data", data)

                if (data.type === "video_export_progress_update") {

                    setProgress(data.progress)
                }

                if (data.type === 'video_export_completed') {
                    const payload = data.payload as VideoWsExportCompletedPayload
                    setExportedVideo(payload.exported_video)
                    setExportInProgress(false)
                }

                if (data.type === 'video_export_failed') {
                    setExportInProgress(false)
                    toast.error("video rendering failed")
                }
            }
        }

    }, [exportInProgress, video?.id])

    return (

        <>
            <button disabled={isGettingExportedVideo} className="bg-senary text-white sm:px-6 px-4 py-2 text-sm rounded-sm flex flex-row items-center gap-2 cursor-pointer" onClick={() => getExportedVideo()}>
                {
                    isGettingExportedVideo ? <GooeyBalls size={20} /> : <BiExport />
                }
                <p className="">Export</p>

            </button>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger >

                </PopoverTrigger>
                <PopoverContent className='bg-denary border-greys1/10 overflow-hidden w-[90dvw] max-w-[400px]' align='end'>
                    <PopoverHeader>
                        <PopoverTitle className='text-white'>Export video</PopoverTitle>
                    </PopoverHeader>


                    {
                        exportedVideo && !exportInProgress && <div className='w-full flex flex-col gap-2 mt-4'>

                            <div className='w-full flex flex-col'>
                                <div className='w-full flex flex-row items-center justify-between pr-1 pl-2 py-1 bg-greys3 gap-2 rounded-md'>

                                    <p className='text-greys2 line-clamp-1 truncate text-sm w-full '>{exportedVideo.url}</p>
                                    <button onClick={() => copyToClipboard(exportedVideo.url, "Link copied to clipboard!")} className='text-nowrap cursor-pointer bg-denary border border-greys1/20 text-sm px-3 py-2 rounded-sm text-white '>
                                        Copy Link
                                    </button>

                                </div>



                                {exportedVideo.updated_at && isOutdated && (
                                    <div className='flex flex-row items-center gap-2 mt-1'>
                                        <RiInformationLine className='text-senary shrink-0' />
                                        <p className='text-greys2  text-xs'>
                                            This link points to the last exported video. Recompile to reflect any recent changes.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    }

                    {
                        exportInProgress && <div className='w-full flex flex-col gap-2 mt-5'>
                            <div className='w-full flex flex-row items-center justify-between'>
                                <p className='text-greys2 text-sm'>Rendering video...</p>

                                <p className='text-greys2 text-sm'>{Math.round(progress)}%</p>

                            </div>
                            <Progress value={progress} className="w-full  bg-greys1/20" indicatorClassName="bg-senary" />
                        </div>
                    }

                    <div className='mt-8 flex flex-col items-center gap-2'>
                        {
                            exportedVideo && !exportInProgress && <button onClick={() => initiateExport({ video_id: video?.id })} className='text-white flex flex-row w-full items-center justify-center gap-2 bg-senary px-4 py-2 rounded-sm cursor-pointer text-nowrap'>
                                <BiRefresh />
                                <p className='text-sm'>Recompile Video</p>
                            </button>
                        }

                        {
                            !exportInProgress && exportedVideo && <button onClick={handleDownload} disabled={isDownloading} className='text-white disabled:cursor-not-allowed text-nowrap flex flex-row w-full items-center justify-center gap-2 bg-denary border border-greys1/20 px-4 py-2 rounded-sm cursor-pointer'>

                                {isDownloading ? <GooeyBalls size={20} /> : <MdOutlineFileDownload />}
                                <p className='text-sm'>Download Video</p>
                            </button>
                        }
                        {
                            !exportInProgress && !exportedVideo && <div className='w-full flex flex-col gap-1'>
                                <button disabled={isInitiatingExport} onClick={() => initiateExport({ video_id: video?.id })} className='text-white text-nowrap flex flex-row w-full items-center justify-center gap-2 bg-denary border border-greys1/20 px-4 py-2 rounded-sm cursor-pointer'>
                                    <SiOctanerender />
                                    <p className='text-sm'>Generate My Video</p>
                                </button>
                            </div>
                        }




                    </div>
                </PopoverContent>
            </Popover>
        </>


    )
}

export default ExportVideoButton