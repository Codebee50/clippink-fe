import { VideoStyleResponse } from '@/lib/types/video';
import { AxiosResponse } from 'axios';
import useFetchRequest from '@/hooks/useFetch';
import React, { useEffect, useState } from 'react'
import { makeMsUrl } from '@/constants';

import { IoMdArrowBack, IoMdArrowForward } from 'react-icons/io';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import Image from 'next/image';
const SelectVideoStyle = ({ onSelect }: { onSelect: (style: VideoStyleResponse) => void }) => {

    const [videoStyles, setVideoStyles] = useState<VideoStyleResponse[]>([]);
    const [selectedVideoStyle, setSelectedVideoStyle] = useState<VideoStyleResponse | null>(null);

    const updateSelectedVideoStyle = (style: VideoStyleResponse) => {
        setSelectedVideoStyle(style)
        onSelect(style)
    }


    const { mutate: getVideoStyles, isLoading: isGettingVideoStyles } = useFetchRequest({
        url: makeMsUrl(`/video/image-style-presets/`),
        onSuccess: (response: AxiosResponse) => {
            const data = response.data as VideoStyleResponse[];
            setVideoStyles(data);
            if (data.length > 0) {
                updateSelectedVideoStyle(data[0]);
            }
        },
    });

    useEffect(() => {
        getVideoStyles();
    }, []);
    return (

        <div className="w-full flex flex-col gap-2 border-b border-b-greys1/30 pb-4">
            <div className="flex flex-row items-center justify-between w-full">
                <div className="w-full flex flex-col gap-1">
                    <div className="flex flex-row items-center gap-2">
                        <p className="text-white">Select video style</p>

                        <AiOutlineInfoCircle size={16} className="text-greys4 text-sm" />
                    </div>
                    <p className="text-sm text-greys4">Every scene in your video will follow the selected style.</p>
                </div>

                <div className="flex flex-row items-center gap-2">
                    <button className="border border-greys1/20 bg-[#1D1D20] rounded-full p-2 text-[#929292] cursor-pointer">
                        <IoMdArrowBack />
                    </button>
                    <button className="border border-greys1/20 bg-[#1D1D20] rounded-full p-2 text-[#929292] cursor-pointer">
                        <IoMdArrowForward />
                    </button>
                </div>
            </div>

            <div className="w-full flex flex-row items-center gap-2 overflow-x-scroll no-scrollbar mt-4">
                {videoStyles.map(style => (
                    <div onClick={() => {
                        updateSelectedVideoStyle(style)
                    }} key={style.id} className={`w-[150px] flex flex-col border border-[#202020] rounded-md overflow-hidden cursor-pointer ${selectedVideoStyle?.id === style.id ? "border-2 border-senary" : ""}`}>
                        <Image src={style.preview_url} alt={style.name} width={100} height={100} className="w-full h-[120px] object-cover object-center" />
                        <div className="bg-greys5 px-2 py-3  flex flex-row items-center justify-between">
                            <p className="text-sm text-white">{style.name}</p>

                            <div className={`w-[15px] h-[15px] rounded-full bg-greys5 border border-greys4 flex items-center justify-center ${selectedVideoStyle?.id === style.id ? "border-senary" : ""}`}>
                                <div className={`w-[10px] h-[10px] rounded-full bg-greys4 ${selectedVideoStyle?.id === style.id ? "bg-senary" : ""}`}></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default SelectVideoStyle