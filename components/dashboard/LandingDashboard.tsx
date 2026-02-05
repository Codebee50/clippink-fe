"use client";

import React, { useRef, useState } from 'react'
import { RiVideoOnAiFill } from 'react-icons/ri';
import { IoMdAdd } from 'react-icons/io';
import { IoMdArrowBack, IoMdArrowForward } from 'react-icons/io';
import { LuInbox } from 'react-icons/lu';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useFetchRequest from '@/hooks/useFetch';
import { AxiosResponse } from 'axios';
import { VideoResponse } from '@/lib/types/video';
import { useEffect } from 'react';
import { Skeleton } from '../ui/skeleton';
import VideoListCard from '../video/VideoListCard';
import { RiProgress6Line } from "react-icons/ri";
import { IoMdInformationCircleOutline } from "react-icons/io";

import { RiProgress8Line } from "react-icons/ri";
import { TbFaceIdError } from "react-icons/tb";
import Footer from '../Footer';
import { TbProgressCheck } from "react-icons/tb";
import { useUserStore } from '@/hooks/useUser';
import { RiVideoAiLine } from "react-icons/ri";
import { TbVideoPlus } from "react-icons/tb";



const LoadingRecentsSekeleton = () => {

    return (
        <div className="w-full flex flex-row overflow-scroll no-scrollbar gap-2 scroll-smooth">
            {Array.from({ length: 10 }).map((_, index: number) => (
                <Skeleton key={index} className="w-[150px] sm:w-[200px] h-[200px] sm:h-[250px] bg-greys3 rounded-md border border-greys1/30 shrink-0 cursor-pointer overflow-hidden relative" />
            ))
            }
        </div>
    )

}

const LandingDashboard = () => {
    const router = useRouter()
    const userVideosScrollRef = useRef<HTMLDivElement>(null);
    const [userVideos, setUserVideos] = useState<VideoResponse[]>([]);
    const user = useUserStore((state) => state.user)


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


    const { mutate: fetchVideos, isLoading: isFetchingVideos } = useFetchRequest({
        url: `/video/user-videos`,
        onSuccess: (response: AxiosResponse) => {
            const data = response.data.videos as VideoResponse[];
            setUserVideos(data);
        },
    });

    useEffect(() => {
        fetchVideos();
    }, []);

    return (
        <div className="w-full flex flex-col gap-4 h-full">

            <div className="w-full flex flex-col">

                <div className='w-full flex flex-row items-center justify-between gap-4 py-4'>

                    <div>
                        <h2 className='text-xl text-white'>Dashboard</h2>
                        <p className='text-greys2 text-sm'>Welcome back, {user?.name}</p>
                    </div>


                    <div className='flex flex-row items-center gap-2'>

                        <button className='bg-senary text-white px-4 py-2 rounded-sm flex flex-row items-center gap-2 cursor-pointer' onClick={() => router.push("/dashboard/video/create")}>
                            <TbVideoPlus className='text-lg' />
                            <p className='text-sm'>New Video</p>
                        </button>
                    </div>


                </div>


                <div className="flex flex-col gap-2  w-full overflow-x-scroll no-scrollbar">


                    <div className="w-full min-w-[1000px] grid grid-cols-4 gap-4">

                        {/* Total Videos Created */}
                        <div className=" px-5 py-3 h-full min-w-[250px] min-h-[180px] relative overflow-hidden rounded-lg bg-gradient-to-tr from-[#113924] via-[#14532d] to-[#1e293b] shadow-lg flex flex-col justify-between">

                            <div className="flex flex-row items-center gap-2 justify-between w-full">
                                <p className="text-white text-sm">Total Videos Created</p>

                                <div className='w-[40px] h-[40px] bg-greys1/30 rounded-md flex items-center justify-center'>
                                    <RiVideoOnAiFill className="text-white shrink-0" />

                                </div>


                            </div>

                            <div>
                                <p className='text-4xl  text-white'>10</p>
                            </div>

                            <div className='w-full flex flex-row items-center gap-2'>
                                <IoMdInformationCircleOutline className='text-greys2 shrink-0' size={16} />
                                <p className='text-greys2 text-xs'>Total videos created</p>
                            </div>

                            {/* <div className="w-full flex flex-row items-center gap-4">
                                <button
                                    onClick={() => router.push("/dashboard/video/create")}
                                    className="bg-denary  z-10 text-white font-medium px-4 py-2 rounded-md flex flex-row items-center gap-2 cursor-pointer w-max max-sm:mt-10"
                                >
                                    <IoMdAdd className="text-lg" />
                                    <p className="text-sm capitalize">Create new video</p>
                                </button>
                            </div> */}


                            <Image src="/images/stars.svg" alt="Idea for you" width={300} height={300} className="w-full h-full shrink-0  object-cover object-center absolute opacity-10" />

                        </div>

                        {/* Pending videos */}
                        <div className='w-full min-w-[250px] rounded-lg bg-greys3/50 p-4 h-full min-h-[180px] flex flex-col justify-between'>

                            <div className="flex flex-row items-center gap-2 justify-between w-full">
                                <p className="text-white text-sm">Pending videos</p>

                                <div className='w-[40px] h-[40px] bg-greys1/20 rounded-md flex items-center justify-center'>
                                    <RiProgress6Line className="text-white shrink-0" />

                                </div>


                            </div>

                            <div>
                                <p className='text-white text-4xl '>0</p>
                            </div>


                            <div className='w-full flex flex-row items-center gap-2'>
                                <IoMdInformationCircleOutline className='text-greys2 shrink-0' size={16} />
                                <p className='text-greys2 text-xs'>Videos currently being processed</p>

                            </div>




                        </div>

                        {/* completed videos */}
                        <div className='w-full min-w-[250px] rounded-lg bg-greys3/50 p-4 h-full min-h-[180px] flex flex-col justify-between'>

                            <div className="flex flex-row items-center gap-2 justify-between w-full">
                                <p className="text-white text-sm">Completed</p>

                                <div className='w-[40px] h-[40px] bg-greys1/20 rounded-md flex items-center justify-center'>
                                    <TbProgressCheck className="text-white shrink-0" />

                                </div>


                            </div>

                            <div>
                                <p className='text-white text-4xl'>0</p>
                            </div>


                            <div className='w-full flex flex-row items-center gap-2'>
                                <IoMdInformationCircleOutline className='text-greys2 shrink-0' size={16} />
                                <p className='text-greys2 text-xs'>Successfully processed videos</p>

                            </div>
                        </div>


                        {/* Failed videos */}
                        <div className='w-full min-w-[250px] rounded-lg bg-greys3/50 p-4 h-full min-h-[180px] flex flex-col justify-between'>

                            <div className="flex flex-row items-center gap-2 justify-between w-full">
                                <p className="text-white text-sm">Failed</p>

                                <div className='w-[40px] h-[40px] bg-greys1/20 rounded-md flex items-center justify-center'>
                                    <TbFaceIdError className="text-white shrink-0" />

                                </div>


                            </div>

                            <div>
                                <p className='text-white text-4xl'>0</p>
                            </div>


                            <div className='w-full flex flex-row items-center gap-2'>
                                <IoMdInformationCircleOutline className='text-greys2 shrink-0' size={16} />
                                <p className='text-greys2 text-xs'>Videos that could not be processed</p>

                            </div>




                        </div>

                    </div>


                </div>

            </div>


            <div className="flex flex-col gap-4 text-lg w-full mt-5">
                <div className="w-full flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center gap-2">
                        <p>Recently Created</p>

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
                    isFetchingVideos ? <LoadingRecentsSekeleton /> : userVideos.length > 0 ? <div className="w-full  flex flex-row overflow-scroll no-scrollbar gap-4 scroll-smooth" ref={userVideosScrollRef}>
                        {userVideos.map(video => {
                            return <VideoListCard key={video.id} video={video} />;
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

export default LandingDashboard