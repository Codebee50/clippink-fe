import React from 'react'
import { VideoResponse } from '@/lib/types/video'
import Image from 'next/image'
import { appConfig } from '@/constants'
import Link from 'next/link'
import { IoMdMore } from "react-icons/io";
import { TbClockHour3 } from 'react-icons/tb'
import { useRouter } from 'next/navigation'


const AllUserVideosListCard = ({ video }: { video: VideoResponse }) => {
    const router = useRouter()


    const getVideoThumbnailUrl = (): string => {
        if (video.thumbnail_url && video.thumbnail_url.includes("https")) {
            return video.thumbnail_url
        }
        return appConfig.PLACEHOLDER_IMAGE_URL
    }

    return (
        <div className='flex flex-col gap-1'>
            <Image onClick={() => router.push(`/dashboard/video/${video.id}`)} src={getVideoThumbnailUrl()} alt={video.title || "Untitled"} width={200} height={200} className="w-full h-[260px] sm:h-[350px] rounded-lg cursor-pointer hover:scale-105 transition-all duration-300 object-cover object-center" />
            <div className='w-full flex flex-row justify-between gap-4 mt-2'>
                <Link href={`/dashboard/video/${video.id}`} className='text-white line-clamp-2 '>{video.title || "Untitled"}</Link>

                <div className='cursor-pointer  transition-all duration-300 w-[40px] h-[40px] flex items-center justify-center rounded-full hover:bg-greys1/30 bg-greys1/20 p-2'>
                    <IoMdMore size={30} />
                </div>


            </div>
            <div className="flex flex-row items-center text-sm text-greys2/50 gap-1">
                <TbClockHour3 />
                <p className="text-nowrap line-clamp-1">
                    {new Date(video.created_at)
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
        </div>
    )
}

export default AllUserVideosListCard