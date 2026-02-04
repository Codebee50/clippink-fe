"use client";

import React, { useRef, useState } from 'react'
import { RiVideoOnAiFill } from 'react-icons/ri';
import { IoMdAdd } from 'react-icons/io';
import { GoBookmark } from 'react-icons/go';
import { BsStars } from 'react-icons/bs';
import { IoMdArrowBack, IoMdArrowForward } from 'react-icons/io';
import { LuInbox } from 'react-icons/lu';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IoCreateOutline } from 'react-icons/io5';
import useFetchRequest from '@/hooks/useFetch';
import { makeMsUrl } from '@/constants';
import { AxiosResponse } from 'axios';
import { VideoResponse } from '@/lib/types/video';
import { useEffect } from 'react';
import { useUserStore } from '@/hooks/useUser';
import { Skeleton } from '../ui/skeleton';
import VideoListCard from '../video/VideoListCard';


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

            <div className="w-full flex flex-row items-center">


                <div className="flex flex-col gap-2 items-center justify-center w-full">


                    <div className="w-full flex sm:flex-row flex-col items-center gap-4">

                        <div className="sm:w-[70%] w-full p-5 sm:h-[280px] relative overflow-hidden rounded-lg bg-gradient-to-tr from-[#113924] via-[#14532d] to-[#1e293b] shadow-lg flex flex-col justify-between">

                            <div className="flex flex-col gap-2">
                                <RiVideoOnAiFill className="text-white text-2xl" />
                                <p className="text-white text-xl sm:text-2xl font-medium">High Quality Faceless Videos</p>
                                <p className="text-greys2 text-sm">Turn any idea or script into a ready-to-publish video in seconds</p>

                            </div>

                            <div className="w-full flex flex-row items-center gap-4">

                                <button onClick={() => router.push("/dashboard/video/create")} className="bg-denary  z-10 text-white font-medium px-4 py-2 rounded-md flex flex-row items-center gap-2 cursor-pointer w-max max-sm:mt-10">
                                    <IoMdAdd className="text-lg" />
                                    <p className="text-sm capitalize">Create new video</p>
                                </button>

                                {/* <button onClick={() => router.push("/dashboard/video/create")} className=" z-10 text-white font-medium  py-2 rounded-md flex flex-row items-center gap-2 cursor-pointer w-max max-sm:mt-10">
                    My Videos
                    <IoArrowForwardSharp className="text-lg" />
                  </button> */}
                            </div>




                            <Image src="/images/stars.svg" alt="Generate content using AI" width={1000} height={1000} className="w-[200px] opacity-50  absolute bottom-0 right-0" />


                        </div>



                        <div className="sm:w-[30%] w-full min-h-[250px] sm:h-[280px] h-[200px] rounded-lg bg-senary/10 border border-[#2F2F2F] flex flex-col  cursor-pointer relative overflow-hidden">
                            {/* <p className="text-sm">Idea for you</p> */}

                            <div className="w-full h-1/2 bg-greys1/10 rounded-md relative">
                                <Image src="https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/b1215c73-f9c8-4db2-a9e1-8c36d6c1034a.jpeg" alt="Idea for you" width={300} height={300} className="w-full h-full shrink-0  object-cover object-center" />


                                <div className="absolute inset-0 flex flex-col  p-2">
                                    <div className="w-full flex flex-row items-center justify-between">

                                        <div></div>

                                        {/* <div className="bg-denary/60 w-max text-xs px-4 py-2 rounded-full text-center border border-white/10 flex flex-row items-center gap-1">
                                            <BsStars className="sm:text-lg text-senary" />
                                            <p>Video idea for you</p>
                                        </div> */}

                                        <button className="bg-denary rounded-full p-2">
                                            <GoBookmark className="text-white text-lg" />
                                        </button>


                                    </div>

                                </div>

                            </div>





                            <div className="w-full flex flex-col justify-center  bg-denary flex-1 px-3 py-2 gap-2">

                                <p className="font-medium">Idea for you</p>

                                <p className="text-greys2 text-sm font-light  line-clamp-3  tracking-wide leading-[1.7]">
                                    &quot;As the early morning light filters through the window, the world awakens to quiet possibility. A new idea takes shape, unfolding gently in your mind, ready to transform the ordinary into something extraordinary. Guided by curiosity and a spark of inspiration, you embark on a journey where each moment holds the potential to create, discover, and imagine without limits.&quot;
                                </p>

                            </div>

                        </div>

                    </div>


                </div>

                <div className="w-full h-[300px] rounded-lg overflow-hidden bg-senary/10 border border-[#2F2F2F] relative shrink-0 hidden">
                    {/* <Image src="/images/dashbanner.jpg" alt="Generate content using AI" width={1000} height={1000} className="w-full h-full object-cover object-center" /> */}

                    <div className="absolute inset-0 bg-linear-to-tr from-denary/95 from-20% to-denary  via-transparent flex flex-col justify-between p-4">
                        <div className="bg-[#3C3C40]/50 w-max text-xs px-4 py-1 rounded-full text-center border border-white/10">🔥Now Trending</div>

                        <div className="flex flex-col gap-2 mb-5">
                            <h1 className="text-lg sm:text-2xl lg:text-4xl font-semibold capitalize">
                                Start generating content with AI
                            </h1>
                            <p className="max-w-[500px] text-greys2/90 text-xs sm:text-sm">
                                Our advanced AI tool is here to automate the creation of high-quality faceless videos, turning any idea into a ready-to-publish video in seconds.
                            </p>

                            <div className="flex flex-row items-center gap-2 mt-1">
                                <button className="bg-senary text-white px-4 py-2 rounded-sm flex flex-row items-center gap-2 cursor-pointer" onClick={() => router.push("/dashboard/video/create")}>
                                    <IoCreateOutline className="text-lg" />
                                    <p className="text-sm">Create new video</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


            </div>


            <div className="flex flex-col gap-4 text-lg w-full">
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
        </div>
    )
}

export default LandingDashboard