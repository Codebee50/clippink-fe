import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectGroup,
    SelectValue,
} from "@/components/ui/select"
import { CAPTION_FONTS } from '@/lib/utils/caption'
import { FontConfig } from '@/lib/types/captions'
import { loadGoogleFont } from '@/lib/utils/fontLoader'
import { useEffect } from 'react'


const FontItem = ({ font }: { font: FontConfig }) => {
    useEffect(() => {
        loadGoogleFont(font.googleFontName, font.weights);
    }, [font.googleFontName]);
    return (
        <div className='' style={{ fontFamily: font.fontFamily }}>
            <p>{font.googleFontName}</p>
        </div>
    )
}

const SelectFont = () => {
    const [selectedFont, setSelectedFont] = useState("inter");
    const [selectedWeight, setSelectedWeight] = useState(CAPTION_FONTS[selectedFont].weights[0].toString());
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
            const existingWeight = fontConfig.weights.find((weight) => weight.toString() === selectedWeight)
            if (existingWeight) {
                setSelectedWeight(existingWeight.toString())
            }
            else {
                setSelectedWeight(fontConfig.weights[0].toString())
            }
        }
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
                <Select defaultValue={selectedWeight} onValueChange={setSelectedWeight}>
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
                    defaultValue={16}
                    placeholder='Enter font size'
                    onChange={(e) => setFontSize(Number(e.target.value))}
                />
            </div>
        </div>

    )
}

export default SelectFont