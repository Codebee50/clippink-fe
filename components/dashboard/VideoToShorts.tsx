import React, { useEffect, useRef, useState } from 'react'
import { IoIosLink, IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import Image from 'next/image';
import LoadingButton from '../buttons/LoadingButton';
import { BsYoutube } from "react-icons/bs";
import { FaTwitch } from "react-icons/fa";
import { SiKick } from "react-icons/si";
import useStyledToast from '@/hooks/useStyledToast';
import useFetchRequest from '@/hooks/useFetch';
import { AxiosError, AxiosResponse } from 'axios';
import { ClippedVideoStatus, PlatformVideoInfoPreview } from '@/lib/types/videotoshorts';
import { genericErrorHandler } from '@/lib/errorHandler';
import usePostRequest from '@/hooks/usePost';
import { appConfig } from '@/constants';
import { LuClock, LuInbox } from "react-icons/lu";
import { useRouter } from 'next/navigation';
import { Skeleton } from '../ui/skeleton';
import { TbClockHour3 } from 'react-icons/tb';
import Footer from '../Footer';
import { getClassNameForStatus } from '@/lib/utils';

const isValidUrl = (value: string): boolean => {
    try {
        const url = new URL(value);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
        return false;
    }
};

type VideoClippingInitiatedResponse = {
    video_id: string;
    task_id: string;
    platform: string;
}


type ClippedVideoListitem = {
    video_url: string;
    ext_video_id: string;
    status: ClippedVideoStatus;
    platform: string;
    id: string;
    thumbnail_url: string | null
    title: string
    created_at: string
}

const LoadingRecentsSekeleton = () => {

    return (
        <div className="w-full flex flex-row overflow-scroll no-scrollbar gap-2 scroll-smooth">
            {Array.from({ length: 10 }).map((_, index: number) => (
                <Skeleton key={index} className="w-[200px] sm:w-[300px] h-[100px] sm:h-[200px] bg-greys3 rounded-md border border-greys1/30 shrink-0 cursor-pointer overflow-hidden relative" />
            ))
            }
        </div>
    )

}

const VideoToShorts = () => {
    const [url, setUrl] = useState('');
    const [urlError, setUrlError] = useState<string | null>(null);
    const toast = useStyledToast()
    const [platformVideoPreview, setPlatformVideoPreview] = useState<PlatformVideoInfoPreview | null>(null)
    const router = useRouter()
    const userVideosScrollRef = useRef<HTMLDivElement>(null);
    const [userClipped, setUserclipped] = useState<ClippedVideoListitem[]>([])



    const formatDuration = (seconds: number): string => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;

        if (h > 0) {
            return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        }
        return `${m}:${String(s).padStart(2, '0')}`;
    };


    const { mutate: initiateClipping, isLoading: isInitiatingClipping } = usePostRequest({
        url: "/to-shorts/",
        onSuccess: (response: AxiosResponse) => {
            toast.success("Clipping initiated successfully")
            const data = response.data as VideoClippingInitiatedResponse
            router.push(`/dashboard/clipped/${data.video_id}`)


        },
        onError: (error: AxiosError) => {
            toast.error(genericErrorHandler(error))
        }
    })


    const { mutate: fetchVideoInfo, isLoading: isFetchingVideoInfo } = usePostRequest({
        url: "/to-shorts/platform/video-info/",
        onSuccess: (response: AxiosResponse) => {
            const data = response.data as PlatformVideoInfoPreview
            setPlatformVideoPreview(data)

        },
        onError: (error: AxiosError) => {
            toast.error(genericErrorHandler(error, "Could not fetch video metadata"))
        }
    })

    const { mutate: fetchUserclippedVideos, isLoading: isfetchingUserclippedVideos } = useFetchRequest({
        url: "/to-shorts/",
        onSuccess: (response: AxiosResponse) => {
            const data = response.data as ClippedVideoListitem[]
            setUserclipped(data)

        },
        onError: (error: AxiosError) => {
            toast.error(genericErrorHandler(error, "Could not fetch user videos"))
        }
    })

    const handleInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(e.target.value);
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pasted = e.clipboardData.getData('text');

        console.log('pasted', pasted)
        if (!isValidUrl(pasted)) {
            toast.error("Please enter a valid url")
        } else {
            fetchVideoInfo({
                video_url: pasted
            })
        }
    };

    const scrollUserVideos = (direction: "left" | "right") => {
        if (userVideosScrollRef.current) {


            if (direction === "left") {
                userVideosScrollRef.current.scrollLeft -= userVideosScrollRef.current.scrollWidth / 3;
            }

            else if (direction === "right") {
                userVideosScrollRef.current.scrollLeft += userVideosScrollRef.current.scrollWidth / 3;
            }

            else {
                userVideosScrollRef.current.scrollLeft += userVideosScrollRef.current.scrollWidth / 3;
            }
        }
    }


    useEffect(() => {
        fetchUserclippedVideos()
    }, [])

    return (
        <div className='w-full flex flex-col gap-4 bg-denary'>

            {
                platformVideoPreview && <div className='w-full flex flex-col gap-4 justify-center items-center mt-10'>
                    <div className='w-[90%] max-w-[400px] shrink-0 relative'>
                        <Image src={platformVideoPreview.thumbnail || appConfig.PLACEHOLDER_IMAGE_URL} className='w-full shrink-0 rounded-md' alt={platformVideoPreview.title} width={400} height={400} />
                        <div className='flex flex-row items-center gap-1 text-sm m-2 bg-black p-2 rounded-md text-white absolute bottom-0 right-0'>
                            <LuClock />
                            <p>{formatDuration(platformVideoPreview.duration)}</p>
                        </div>
                    </div>

                    <div className='flex flex-col gap-2 text-center justify-center'>
                        <p className='font-medium'>{platformVideoPreview.title}</p>
                        <p className='text-sm text-greys1 max-w-[500px]'>Using video you don’t own may violate copyright laws. By continuing, you confirm this is your own original content.</p>

                        <div className='flex flex-row items-center gap-2 self-center mt-5'>
                            <LoadingButton className='w-max' text='Start clipping' onClick={() => {
                                initiateClipping({
                                    video_url: url
                                })
                            }} />

                            <LoadingButton text='Cancel' className='bg-red-600' onClick={() => setPlatformVideoPreview(null)} />

                        </div>

                    </div>
                </div>
            }

            {
                !platformVideoPreview && <div className='w-full py-[30px] relative sm:py-[50px] border overflow-hidden bg-linear-to-tr from-senary/10 to-senary/20 border-greys1/20 rounded-lg flex flex-col gap-4 items-center justify-center'>

                    <div className='flex flex-col gap-4 w-[90%] max-w-[500px] items-center justify-center z-10'>
                        <p className='text-lg sm:text-xl capitalize text-center max-w-[300px] max-sm:max-w-[250px]'>
                            Transform long videos into{' '}
                            <span className="bg-linear-to-r from-green-400 to-yellow-300 bg-clip-text text-transparent">
                                viral short clips
                            </span>
                        </p>

                        <div className={`w-full mx-auto bg-greys3 rounded-md px-3 py-4 flex flex-row items-center gap-2 mt-5 border ${urlError ? 'border-red-500' : 'border-transparent'}`}>
                            <IoIosLink className={urlError ? 'text-red-400' : 'text-greys4'} />
                            <input
                                onChange={handleInputValueChange}
                                onPaste={handlePaste}
                                value={url}
                                type="text"
                                placeholder="Enter video link"
                                className="bg-transparent outline-none flex-1 text-sm text-white/60 font-light placeholder:text-greys4"
                            />
                        </div>


                        <LoadingButton text='Extract short clips' isLoading={isFetchingVideoInfo} onClick={() => {
                            fetchVideoInfo({
                                video_url: url
                            })
                        }} />
                    </div>

                    <Image src="/images/stars.svg" alt="Idea for you" width={300} height={300} className="w-[200px] shrink-0 bottom-0 right-0 object-cover object-center absolute opacity-10" />
                    <Image src="/images/stars.svg" alt="Idea for you" width={300} height={300} className="w-[200px] shrink-0 bottom-0 left-0 object-cover object-center absolute opacity-10 max-sm:hidden" />
                </div>
            }


            <div className='w-full flex flex-col gap-4 mt-5'>
                <div className="w-full flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center gap-2">
                        <p>Your clipped Videos</p>

                        {/* <Link href="/dashboard/videos" className="underline text-senary hover:text-white transition-all duration-300 text-sm flex flex-row items-center gap-1">See all <IoIosArrowRoundForward className="text-sm" /></Link> */}

                    </div>

                    <div className="flex flex-row items-center gap-2">
                        <button onClick={() => scrollUserVideos("left")} className="border border-greys1/20 rounded-full p-2 text-greys1 cursor-pointer">
                            <IoMdArrowBack />
                        </button>
                        <button onClick={() => scrollUserVideos("right")} className="border border-greys1/20 rounded-full p-2 text-greys1 cursor-pointer">
                            <IoMdArrowForward />
                        </button>
                    </div>
                </div>


                {
                    isfetchingUserclippedVideos ? <LoadingRecentsSekeleton /> : userClipped.length > 0 ? <div className="w-full  flex flex-row overflow-scroll no-scrollbar gap-4 scroll-smooth" ref={userVideosScrollRef}>
                        {userClipped.map(clipped => {
                            return <div key={clipped.id} className='flex flex-col gap-1 cursor-pointer' onClick={() => router.push(`/dashboard/clipped/${clipped.id}`)}>

                                <div className='w-[250px] sm:w-[300px] h-[200px] bg-greys3 rounded-md overflow-hidden relative'>
                                    <Image src={clipped.thumbnail_url || appConfig.PLACEHOLDER_IMAGE_URL} alt={clipped.title} width={400} height={400} className='w-full h-full object-cover object-center' />

                                    <div className={`border border-greys1/30 rounded-md w-max px-2 py-1 text-xs absolute top-0 right-0 font-medium m-2 ${getClassNameForStatus(clipped.status)}`}>
                                        <p>{clipped.status}</p>

                                    </div>

                                </div>
                                <p className='max-w-[250px] line-clamp-2'>{clipped.title}</p>

                                <div className="flex flex-row items-center text-xs text-greys2/50 gap-1">
                                    <TbClockHour3 />
                                    <p className="text-nowrap line-clamp-1">
                                        {new Date(clipped.created_at)
                                            .toLocaleString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                                hour: "numeric",
                                                minute: "2-digit",
                                                hour12: true,
                                            })
                                            .replace(",", "")}
                                    </p>
                                </div>
                            </div>;
                        })}
                    </div> :
                        <div className="w-full flex flex-col items-center justify-center h-[200px] border border-greys1/20 rounded-md p-4 gap-2">
                            <LuInbox className="text-greys2/50 text-2xl" size={40} />
                            <p className="text-sm text-greys2/50 text-center">No videos yet. Ready to create your first one?</p>
                        </div>
                }
            </div>

            <Footer />
        </div>
    )
}

export default VideoToShorts