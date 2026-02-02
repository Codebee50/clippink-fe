import { CAPTION_STYLES, getDefaultCaptionSettings } from '@/lib/utils/caption'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import SelectFont from '../SelectFont'
import { HexColorPicker } from 'react-colorful';
import {
    Popover,
    PopoverContent,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover"
import { IoColorFillOutline } from "react-icons/io5";
import { useVideoStore } from '@/lib/store/video';
import { CaptionStyle, CaptionStyleConfig } from '@/lib/types/captions';
import { Slider } from "@/components/ui/slider"



const CaptionModifications = () => {
    const video = useVideoStore((state) => state.video)
    const updateCaptionSettingsByKey = useVideoStore((state) => state.updateCaptionSettingsByKey)
    const bulkUpdateCaptionSettings = useVideoStore((state) => state.bulkUpdateCaptionSettings)

    const [activeWordColor, setActiveWordColor] = useState(video?.caption_settings?.highlightWordColor || '#FFFFFF');
    const [dormantTextColor, setDormantTextColor] = useState(video?.caption_settings?.dormantTextColor || '#0C0C10');

    const activeColorDebounceTimer = useRef<NodeJS.Timeout | null>(null)
    const dormantColorDebounceTimer = useRef<NodeJS.Timeout | null>(null)
    const marginBottomPercentageDebounceTimer = useRef<NodeJS.Timeout | null>(null)

    const [selectedCaptionStyle, setSelectedCaptionStyle] = useState<string | null>(null)


    const handleActiveWordColorChange = (color: string) => {
        setActiveWordColor(color)

        updateCaptionSettingsByKey("highlightWordColor", color)

        if (activeColorDebounceTimer.current) {
            clearTimeout(activeColorDebounceTimer.current)
        }

        activeColorDebounceTimer.current = setTimeout(() => {
            updateCaptionSettingsByKey("highlightWordColor", color, true)
        }, 1000)
    }

    const handleDormantTextColorChange = (color: string) => {
        setDormantTextColor(color)

        updateCaptionSettingsByKey("dormantTextColor", color)

        if (dormantColorDebounceTimer.current) {
            clearTimeout(dormantColorDebounceTimer.current)
        }

        dormantColorDebounceTimer.current = setTimeout(() => {
            updateCaptionSettingsByKey("dormantTextColor", color, true)
        }, 1000)
    }

    const handleMarginBottomPercentageChange = (value: number[]) => {
        const marginBottomPercentage = value[0]

        updateCaptionSettingsByKey("marginBottomPercentage", marginBottomPercentage)

        if(marginBottomPercentageDebounceTimer.current){
            clearTimeout(marginBottomPercentageDebounceTimer.current)
        }

        marginBottomPercentageDebounceTimer.current = setTimeout(() => {
            updateCaptionSettingsByKey("marginBottomPercentage", marginBottomPercentage, true)
        }, 1000)
    }


    const handleCaptionStyleClicked = (style: CaptionStyleConfig, key: string) => {

        const { fontSize, fontWeight, color, ...rest } = style

        const oldCaptionSettings = video?.caption_settings || getDefaultCaptionSettings()

        const newCaptionSettings = {
            fontSize: oldCaptionSettings.fontSize,
            fontWeight: oldCaptionSettings.fontWeight,
            color: oldCaptionSettings.color,
            highlightWordColor: oldCaptionSettings.highlightWordColor,
            dormantTextColor: oldCaptionSettings.dormantTextColor,
            ...rest
        }


        setSelectedCaptionStyle(key)
        bulkUpdateCaptionSettings(newCaptionSettings)
    }

    return (
        <div className='w-full h-full border-r border-r-greys1/20 bg-[#0C0C10] overflow-y-scroll px-1  pb-10 flex flex-col gap-1 cus-scrollbar shrink-0 '>
            {/* <p className='text-white font-medium ml-3'>Edit caption settings</p> */}

            <div className='w-full  bg-denary border border-greys1/10 rounded-md px-4 py-3 flex flex-col gap-2 mt-3'>
                <p className='text-greys1 text-sm'>Typography</p>

                <SelectFont video={video} />

            </div>

            <div className='w-full bg-denary border border-greys1/10 rounded-md px-4 py-3 flex flex-col gap-2'>
                <p className='text-greys1 text-sm'>Colors</p>

                {/* Active word color */}
                <div>
                    <p className='text-sm'>Active word color</p>
                    <div className='flex flex-row items-center gap-2 mt-2 w-full justify-between'>

                        <div className='flex flex-row items-center gap-2'>
                            <div className='w-[30px] h-[30px] shrink-0 bg-greys1/60 rounded-sm justify-center cursor-pointer hover:bg-greys1/80 transition-all duration-300' style={{ backgroundColor: activeWordColor }}>

                            </div>
                            <p className='text-sm'>{activeWordColor}</p>

                        </div>

                        <Popover>
                            <PopoverTrigger asChild>
                                <button className='text-sm bg-greys3 border border-greys1/20 rounded-md px-2 py-1 flex flex-row items-center gap-2 cursor-pointer'>
                                    <IoColorFillOutline size={16} />
                                    Change
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className='w-max bg-denary border-none'>
                                <PopoverHeader>
                                    <PopoverTitle className='hidden'>Word Highlight Color</PopoverTitle>
                                    <HexColorPicker onChange={handleActiveWordColorChange} />
                                </PopoverHeader>
                            </PopoverContent>
                        </Popover>




                    </div>
                </div>

                {/* Background color */}
                <div className='mt-4'>
                    <p className='text-sm'>Dormant text color</p>
                    <div className='flex flex-row items-center gap-2 mt-2 w-full justify-between'>


                        <div className='flex flex-row items-center gap-2'>
                            <div className='w-[30px] h-[30px] shrink-0 bg-greys1/60 rounded-sm justify-center cursor-pointer hover:bg-greys1/80 transition-all duration-300' style={{ backgroundColor: dormantTextColor }}>

                            </div>
                            <p className='text-sm'>{dormantTextColor}</p>


                        </div>

                        <Popover>
                            <PopoverTrigger asChild>

                                <button className='text-sm bg-greys3 border border-greys1/20 rounded-md px-2 py-1 flex flex-row items-center gap-2 cursor-pointer'>
                                    <IoColorFillOutline size={16} />
                                    Change
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className='w-max bg-denary border-none'>
                                <PopoverHeader>
                                    <PopoverTitle className='hidden'>Word Highlight Color</PopoverTitle>
                                    <HexColorPicker onChange={handleDormantTextColorChange} />
                                </PopoverHeader>
                            </PopoverContent>
                        </Popover>



                    </div>
                </div>

            </div>

            <div className='w-full bg-denary border border-greys1/10 rounded-md px-4 py-3 pb-5 flex flex-col gap-2'>
                <p className='text-greys1 text-sm'>Position</p>


                <div className='w-full flex flex-col gap-2 items-start'>
                    <Slider
                        defaultValue={[video?.caption_settings?.marginBottomPercentage || 15]}
                        max={100}
                        step={1}
                        className="w-full max-w-xs"
                        onValueChange={handleMarginBottomPercentageChange}
                    />
                </div>
            </div>

            <div className='w-full bg-denary border border-greys1/10 rounded-md px-4 py-3 flex flex-col gap-2'>
                <p className='text-greys1 text-sm'>Caption style</p>
                <div className='grid sm:grid-cols-3 grid-cols-2 gap-2 '>
                    {
                        Object.entries(CAPTION_STYLES).map(([key, value]) => (
                            <div key={key} className='w-full h-[150px] rounded-md overflow-hidden border border-greys1/20 relative cursor-pointer' onClick={() => handleCaptionStyleClicked(value, key)}>

                                <Image src={`https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/f1e59269-be29-4e2c-80a4-19dd548d82ef.jpeg`} className='w-full h-full object-cover object-center' alt={key} width={100} height={100} />

                                <div className='absolute inset-0 flex flex-col items-center justify-end '>

                                    <p className='capitalize text-center m-5 px-2 py-1' style={{ ...value, fontSize: '0.8rem' }}>{key.replace('_', ' ')}</p>

                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>


        </div>
    )
}

export default CaptionModifications