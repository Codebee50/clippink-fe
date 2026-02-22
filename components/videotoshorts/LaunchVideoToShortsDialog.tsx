"use client"

import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { dialogIds, useUiStore } from '@/lib/store/uiStore'
import { RiSearch2Line } from "react-icons/ri";
import { IoIosLink } from "react-icons/io";
import LoadingButton from '../buttons/LoadingButton';


const DIALOG_ID = dialogIds.LAUNCH_VIDEO_TO_SHORTS

type propsType = {
    showTrigger?: boolean
}
const LaunchVideoToShortsDialog = ({ showTrigger = false }: propsType) => {

    const setDialogState = useUiStore((state) => state.setDialogState)
    const dialogs = useUiStore((state) => state.dialogs)

    const open = dialogs[DIALOG_ID] === true
    return (
        <Dialog open={open} onOpenChange={(state) => setDialogState(DIALOG_ID, state)}>
            {
                showTrigger && <DialogTrigger>Open</DialogTrigger>

            }
            <DialogContent className='bg-denary text-white border-greys1/30 p-0 overflow-hidden'>
                <DialogHeader>
                    <DialogTitle className='hidden'>Easily go form long to short form</DialogTitle>


                    <DialogDescription className='p-5 bg-senary/10 text-senary text-center'>
                        Transform long form videos into viral short clips
                    </DialogDescription>


                    <div className='min-h-[200px] flex flex-col gap-4 w-full p-5'>

                        <div className="w-full  bg-greys1/5 rounded-md border border-greys1/20 px-3 py-4 flex flex-row items-center gap-2">
                            <IoIosLink className="text-greys4" />
                            <input type="text" placeholder="Enter video link" className="bg-transparent outline-none flex-1 text-sm text-white/60 font-light placeholder:text-greys4" />
                        </div>

                        {/* <button className='w-full bg-senary text-white text-sm p-3 rounded-sm cursor-pointer mt-5'>
                            Extract short clips
                        </button> */}

                        <div className='mt-5'>

                        </div>

                        <LoadingButton text='Extract short clips' />

                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default LaunchVideoToShortsDialog