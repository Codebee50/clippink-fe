"use client";

import React from 'react'
import { MdOutlineMenu } from 'react-icons/md'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer"
import DashboardNav from './DashboardNav'
import { useState } from 'react';

const MobileDashboardNav = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="md:hidden">
            <Drawer direction='left' open={isOpen} onOpenChange={setIsOpen}>
                <DrawerTrigger>
                    <div className="md:hidden w-[40px] h-[40px] flex items-center justify-center border border-greys1/20 rounded-md">
                        <MdOutlineMenu className="text-greys2 transition-all duration-300" />
                    </div>
                </DrawerTrigger>
                <DrawerContent className='bg-denary border-none! w-[85%]! h-dvh!'>


                    <div className='w-full h-dvh'>
                        <DashboardNav isMobile={true} onMobileClose={() => setIsOpen(false)} />

                    </div>


                </DrawerContent>
            </Drawer>
        </div>

    )
}

export default MobileDashboardNav