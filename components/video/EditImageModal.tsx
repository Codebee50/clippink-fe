"use client"

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { BiEdit } from 'react-icons/bi'
import { Scene } from '@/lib/types/video'
import Image from 'next/image'
import { MdOutlineClose } from "react-icons/md";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const EditImageModal = ({ scene }: { scene: Scene }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (

    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <div className="flex flex-row items-center gap-2 w-[50px] h-[50px] bg-greys1/60 rounded-full justify-center cursor-pointer hover:bg-greys1/80 transition-all duration-300">
          <BiEdit />
        </div>
      </DialogTrigger>
      <DialogContent showCloseButton={false} className='bg-denary border-greys1/10 pt-0 overflow-hidden p-0 max-h-[90vh]'>
        <DialogHeader>
          <div className='w-full flex flex-row items-center justify-between  border-b border-greys1/20 py-2 px-2'>

            <div className='flex flex-row items-center gap-4'>
              <div className='flex flex-row items-center border border-senary/20 bg-senary/10 rounded-md py-2 px-4 h-[40px] w-[40px] justify-center'>
                <p className='text-sm text-senary '>#{scene.order_number}</p>
              </div>

              <DialogTitle className='text-white font-medium text-[1rem]'>Edit Image </DialogTitle>


            </div>

            <button onClick={() => setIsOpen(false)} className='flex flex-row items-center gap-2 w-[30px] h-[30px] border border-greys1/20 rounded-md justify-center cursor-pointer  transition-all duration-300'>
              <MdOutlineClose size={16} className='text-white text-lg cursor-pointer hover:text-red-500 transition-all duration-300' />
            </button>

          </div>
          <DialogDescription className='hidden'>
            Edit image for the scene {scene.order_number}
          </DialogDescription>
        </DialogHeader>

        <div className='w-full flex flex-col gap-2 px-4'>
          <div className='w-full pt-2 flex flex-col gap-2 h-[500px] overflow-y-scroll cus-scrollbar'>
            <div className='w-full flex items-center justify-center'>
              <Image src={scene.image_url || "/images/defaultbg.png"} alt="scene image" width={400} height={400} className="w-full max-w-[150px] h-[200px] object-cover object-center rounded-md" />
            </div>

            <div className='w-full flex flex-col items-center mt-3 justify-center'>
              <Tabs defaultValue="animate" className="w-full">
                <TabsList variant={"line"} className='text-senary '>
                  <TabsTrigger value="animate">Animate</TabsTrigger>
                  <TabsTrigger value="effects">Effects</TabsTrigger>
                </TabsList>
                <TabsContent value="animate" className='w-full!'>
                  <div className='w-full bg-greys3 h-[200px] flex items-center justify-center'>
                    <p className='text-white text-sm'>Animate</p>
                  </div>

                </TabsContent>
                <TabsContent value="effects" className='w-full!'>
                  <div className='w-full bg-greys3 h-[200px] flex items-center justify-center'>
                    <p className='text-white text-sm'>Effects</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>




          </div>
        </div>


      </DialogContent>
    </Dialog>
  )
}

export default EditImageModal