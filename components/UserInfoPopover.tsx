"use client"

import React, { useState } from 'react'
import { useUserStore } from '@/hooks/useUser'
import { RoundedUserAvatar } from './RoundedUserAvatar'
import { RiExpandUpDownLine } from 'react-icons/ri'

import {
    Popover,
    PopoverContent,
    PopoverDescription,
    PopoverHeader,
    PopoverTitle,
    PopoverTrigger,
} from "@/components/ui/popover"
import { FiSettings } from "react-icons/fi";

import { PiWalletBold } from "react-icons/pi";
import { BiSolidVideos } from "react-icons/bi";
import { RiLogoutBoxRLine } from "react-icons/ri";
import useLogout from '@/hooks/useLogout'
import GooeyBalls from './loaders/GooeyBalls'
import { FaSlideshare } from "react-icons/fa";


const userInfoPopoverItems = [
    {
        label: "Settings",
        icon: <FiSettings size={18} />,
        href: "/profile",
    },
    {
        label: "Manage Billing",
        icon: <PiWalletBold size={18} />,
        href: "/wallet",
    },
    {
        label: "My Videos",
        icon: <BiSolidVideos size={18} />,
        href: "/videos",
    },
    {
        label: "Social accounts",
        icon: <FaSlideshare size={18} />,
        href: "/shared-videos",
    },
]

const UserInfoPopover = ({ state = "expanded", avatarSize = 40 }: { state?: "reduced" | "expanded", avatarSize?: number }) => {
    const { user } = useUserStore()
    const { logoutUser, isLogoutLoading } = useLogout()
    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className={`flex flex-row cursor-pointer items-center w-full ${state == "reduced" ? "justify-center" : "justify-between"} ${state == "expanded" ? "px-2 py-1" : ""}`}>
                    <div className="flex flex-row items-center gap-2">
                        <RoundedUserAvatar width={avatarSize} height={avatarSize} />

                        {
                            state == "expanded" && (
                                <div>
                                    <p className="text-sm font-medium">{user?.name}</p>
                                    <p className="text-xs text-greys2/50">{user?.email}</p>
                                </div>
                            )
                        }
                    </div>

                    {
                        state == "expanded" && <RiExpandUpDownLine />
                    }
                </div>
            </PopoverTrigger>
            <PopoverContent align="end" className='bg-denary max-md:bg-greys3 border-greys1/30 overflow-hidden max-w-[200px] px-0 pt-0'>
                <PopoverHeader>
                    <div className='flex flex-row items-center gap-4 px-4 py-3 border-b border-b-greys1/30'>
                        <RoundedUserAvatar />
                        <div>
                            <p className=" text-white">{user?.name}</p>
                            <p className="text-sm text-greys2/50 truncate max-w-[120px]">{user?.email}</p>
                        </div>
                    </div>
                </PopoverHeader>

                <div className='flex flex-col gap-2 my-3 px-3'>
                    {
                        userInfoPopoverItems.map((item) => (
                            <div key={item.label} className='flex flex-row items-center gap-2 text-white hover:bg-greys1/10 rounded-md py-2 px-3 cursor-pointer transition-all duration-300'>
                                {item.icon}
                                <p className="text-white text-sm">{item.label}</p>
                            </div>
                        ))
                    }


                </div>

                <div onClick={() => logoutUser({})} className='flex flex-row items-center gap-2 text-red-700 hover:bg-greys1/10 pt-3 pb-3 px-5 cursor-pointer transition-all duration-300 border-t border-t-greys1/30'>

                    {
                        isLogoutLoading ? <GooeyBalls /> :
                            <>
                                <RiLogoutBoxRLine />
                                <p className="text-sm text-white">Logout</p>
                            </>

                    }


                </div>
            </PopoverContent>
        </Popover>
    )
}

export default UserInfoPopover