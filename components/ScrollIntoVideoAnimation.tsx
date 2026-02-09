"use client"
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useScroll, useTransform, motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";

const ScrollIntoVideoAnimation = ({ images }: { images: string[] }) => {
    const ref = useRef(null)

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"] // when to start/end tracking the scroll
    });

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (latest) => {
            console.log("scrollYProgress", latest);
        });

        return () => unsubscribe();
    }, [scrollYProgress]);
    return (
        <div ref={ref} className='max-w-[1300px] mx-auto w-full'>
            <div className="w-full flex flex-row items-center justify-center sm:gap-5 gap-2 padding-x overflow-x-hidden">

                {
                    images.map((image, index) => {
                        return <motion.div

                            key={index} className="flex flex-col items-center justify-center gap-2 mt-[50px] min-w-[120px] flex-1 rounded-md overflow-hidden relative">
                            <Image src={image} alt={`hero-section-${index}`} width={200} height={200} className="w-full h-full object-cover object-center" />

                        
                            <div className='bg-white/50 rounded-full sm:p-4 p-3 shrink-0 absolute bottom-2 right-2 cursor-pointer'>
                                <FaPlay className='text-black' />

                            </div>

                        </motion.div>
                    })
                }

            </div>
        </div>
    )
}

export default ScrollIntoVideoAnimation