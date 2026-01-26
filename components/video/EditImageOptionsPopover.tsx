"use client"
import { Scene } from '@/lib/types/video'
import React, { useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover"
import { BiEdit } from 'react-icons/bi'
import { HiColorSwatch } from "react-icons/hi";

import { FaMagic } from "react-icons/fa";
import { FiTrash2 } from 'react-icons/fi';
import Image from 'next/image';
import EditMotionEffectModal from './EditMotionEffect';


const EditImageOptionsPopover = ({ scene }: { scene: Scene }) => {


    const [open, setOpen] = useState(false)
    const [editMotionEffectOpen, setEditMotionEffectOpen] = useState(false)

    const options = [
        {
            label: 'Motion Effect',
            Icon: HiColorSwatch,
            value: "motionEffect",
            onClick: () => setEditMotionEffectOpen(true)
        },
        {
            label: "Animate Image",
            Icon: FaMagic,
            value: "animateImage"
        },
        {
            label: "Delete Image",
            Icon: FiTrash2,
            value: "deleteImage",
            variant: "destructive"
        }
    ]

    return (
        <>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <div className="flex flex-row items-center gap-2 w-[50px] h-[50px] bg-greys1/60 rounded-full justify-center cursor-pointer hover:bg-greys1/80 transition-all duration-300">
                        <BiEdit />
                    </div>
                </PopoverTrigger>
                <PopoverContent className='bg-denary border-greys1/10 overflow-hidden max-w-[220px]'>
                    <PopoverHeader>
                        <div className='flex flex-row items-center'>
                            <Image src={scene.image_url || "/images/defaultbg.png"} alt="scene image" width={100} height={100} className="w-full max-w-[30px] h-[30px] object-cover object-center rounded-md" />
                            <PopoverTitle className='text-white text-sm uppercase mx-2'>EDIT IMAGE</PopoverTitle>

                        </div>
                        <PopoverDescription className='hidden'>Choose how you’d like to edit your image</PopoverDescription>
                    </PopoverHeader>

                    <div className='flex flex-col gap-2 pt-3'>

                        <div className='w-full flex flex-col gap-2'>
                            {options.map((option) => (
                                <button onClick={() => {
                                    setOpen(false)

                                    option.onClick?.()
                                }} key={option.value} className='w-full flex flex-row items-center gap-4 py-2 px-2 rounded-full hover:bg-greys1/20 focus:outline-none focus:ring-0  transition-all duration-300 cursor-pointer '>
                                    <option.Icon className={`text-greys1 ${option.variant === "destructive" ? "text-red-500" : ""}`} />
                                    <p className='text-greys1 text-sm'>{option.label}</p>
                                </button>
                            ))}

                        </div>

                    </div>
                </PopoverContent>
            </Popover>

            <EditMotionEffectModal scene={scene} open={editMotionEffectOpen} onOpenChange={setEditMotionEffectOpen} />
        </>
    )
}

export default EditImageOptionsPopover