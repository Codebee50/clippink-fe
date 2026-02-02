import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectGroup,
    SelectValue,
} from "@/components/ui/select"
import { CAPTION_FONTS, getFontKeyFromFontFamily } from '@/lib/utils/caption'
import { FontConfig } from '@/lib/types/captions'
import { VideoResponse } from '@/lib/types/video'
import { loadGoogleFont } from '@/lib/utils/fontLoader'
import { useEffect } from 'react'
import { useVideoStore } from '@/lib/store/video'


const FontItem = ({ font }: { font: FontConfig }) => {
    useEffect(() => {
        try{
            loadGoogleFont(font.googleFontName, font.weights);
        }
        catch(error){
            console.error('error loading font', error)
        }
    }, [font.googleFontName]);
    return (
        <div className='' style={{ fontFamily: font.fontFamily }}>
            <p>{font.googleFontName}</p>
        </div>
    )
}

const SelectFont = ({ video }: { video: VideoResponse | null }) => {


    const [selectedFont, setSelectedFont] = useState(getFontKeyFromFontFamily(video?.caption_settings?.fontFamily || CAPTION_FONTS.inter.fontFamily));
    const [selectedWeight, setSelectedWeight] = useState((video?.caption_settings?.fontWeight || 400).toString());

    const updateCaptionSettingsByKey = useVideoStore((state) => state.updateCaptionSettingsByKey)


    const [fontSize, setFontSize] = useState(16);
    const getWeightName = (weight: number) => {
        switch (weight) {
            case 400:
                return "Regular";
            case 500:
                return "Medium";
            case 600:
                return "Semi-Bold";
            case 700:
                return "Bold";
            case 800:
                return "Extra-Bold";
            case 900:
                return "Black";
            default:
                return "Regular";
        }
    }

    const handleFontChange = (font: string) => {
        setSelectedFont(font)

        const fontConfig = CAPTION_FONTS[font]
        if (fontConfig) {
            updateCaptionSettingsByKey("fontFamily", fontConfig.fontFamily, true)
            const existingWeight = fontConfig.weights.find((weight) => weight.toString() === selectedWeight.toString())
            if (existingWeight) {
                //this means the previously selected font already has a weight that is available in the new font
                setSelectedWeight(existingWeight.toString())
            }
            else {
                setSelectedWeight(fontConfig.weights[0].toString())
                updateCaptionSettingsByKey("fontWeight", fontConfig.weights[0], true)
            }



        }
    }

    const handleFontWeightChange = (weight: string) => {
        setSelectedWeight(weight)
        updateCaptionSettingsByKey("fontWeight", weight, true)
    }

    const handleFontSizeChange = (size: number) => {
        console.log('the size changed', size)
        setFontSize(size)
        updateCaptionSettingsByKey("fontSize", size, true)
    }

    return (
        <div className='w-full flex flex-col gap-2'>
            <Select defaultValue={selectedFont} onValueChange={handleFontChange}>
                <SelectTrigger className="w-full border-greys1/30 bg-denary rounded-md">
                    <SelectValue placeholder="Select a font" />
                </SelectTrigger>
                <SelectContent className='bg-denary max-w-[300px] border border-greys1/30 rounded-md p-1'>
                    {Object.entries(CAPTION_FONTS).map(([key, value]) => (
                        <SelectGroup key={key}>
                            <SelectItem value={key} className='text-white'>
                                <FontItem font={value} />
                            </SelectItem>
                        </SelectGroup>
                    ))}
                </SelectContent>
            </Select>


            <div className='w-full grid grid-cols-2 gap-2'>
                <Select defaultValue={selectedWeight} onValueChange={handleFontWeightChange} value={selectedWeight}>
                    <SelectTrigger className="w-full border-greys1/30 bg-denary rounded-md">
                        <SelectValue placeholder="Select a font" />
                    </SelectTrigger>
                    <SelectContent className='bg-denary max-w-[300px] border border-greys1/30 rounded-md p-1'>
                        {
                            CAPTION_FONTS[selectedFont].weights.map((weight) => (
                                <SelectItem key={weight.toString()} value={weight.toString()} className='text-white'>
                                    <div key={weight} className='w-full h-full  border border-greys1/30 rounded-md'>
                                        <p>{getWeightName(weight)}</p>
                                    </div>
                                </SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>


                <input
                    type="number"
                    className='w-full bg-greys1/25 text-sm outline-none rounded-md px-3 py-2 [-webkit-appearance:none]'
                    defaultValue={video?.caption_settings?.fontSize || 16}
                    placeholder='Enter font size'
                    onBlur={(e) => handleFontSizeChange(Number(e.target.value))}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleFontSizeChange(Number(e.currentTarget.value));
                        }
                    }}
                />
            </div>
        </div>

    )
}

export default SelectFont