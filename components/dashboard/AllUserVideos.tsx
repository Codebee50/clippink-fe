import React, { useState } from 'react'
import useFetchRequest from '@/hooks/useFetch';
import { AxiosResponse } from 'axios';
import { VideoResponse } from '@/lib/types/video';
import { useEffect } from 'react';
import AllUserVideosListCard from '../video/AllUserVideosListCard';
import { Skeleton } from '../ui/skeleton';
import { LuInbox } from 'react-icons/lu';

import { motion, AnimatePresence } from "framer-motion"
import CustomPagination from '../CustomPagination';
import { DEFAULT_PAGINATION_INFO, PaginationInfo } from '@/lib/types/global';
import { useQueryParams } from '@/hooks/useQueryParams';


const LoadingVideosSkeleton = () => {
    return (
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {Array.from({ length: 10 }).map((_, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.7 }}
                >
                    <Skeleton className="w-full sm:h-[350px] h-[250px] bg-greys3 rounded-md" />
                </motion.div>
            ))}
        </div>
    );
};

const AllUserVideos = () => {
    const [userVideos, setUserVideos] = useState<VideoResponse[]>([]);
    const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>(DEFAULT_PAGINATION_INFO);

    const { getParam, setParam } = useQueryParams()

    const page = Number(getParam("page")) || 1

    const { mutate: fetchVideos, isLoading: isFetchingVideos } = useFetchRequest({
        url: `/video/user-videos?page_size=12&page=${page}`,
        onSuccess: (response: AxiosResponse) => {
            const data = response.data.videos as VideoResponse[];
            const paginationInfo = response.data.page_info as PaginationInfo
            setUserVideos(data);
            setPaginationInfo(paginationInfo);
        },
    });

    useEffect(() => {
        fetchVideos();
    }, []);
    return (
        <div className='w-full flex flex-col gap-4'>

            <h1 className='text-xl'>Your Videos</h1>

            {
                isFetchingVideos ? <LoadingVideosSkeleton /> : userVideos.length > 0 ? <div className='w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5'>
                    {
                        userVideos.map(video => <AllUserVideosListCard key={video.id} video={video} />)
                    }
                </div> : <div className='w-full flex flex-col items-center justify-center h-[200px] border border-greys1/20 rounded-md p-4 gap-2'>
                    <LuInbox className="text-greys2/50 text-2xl" size={40} />
                    <p className="text-sm text-greys2/50 text-center">No videos yet. Ready to create your first one?</p>
                </div>
            }

            <div className='w-full mt-5'>

                <CustomPagination paginationInfo={paginationInfo} />

            </div>
        </div>
    )
}

export default AllUserVideos