"use client"
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { useScroll, useTransform, motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";

const ScrollIntoVideoAnimation = ({ images }: { images: { thumbnail: string, style: string, videoUrl: string }[] }) => {
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
        <div ref={ref} className='max-w-[2500px] mx-auto w-full relative'>


            <div className="slider overflow-hidden w-full flex justify-start padding-x mt-[70px] relative">



                <div className='absolute inset-0 bg-linear-to-r from-denary  to-95%  to-denary via-80% via-transparent z-20'>

                </div>

                <div className="slide-track gap-5 flex flex-row items-center"
                    style={{
                        "--num-images": images.length * 3
                    } as React.CSSProperties}>
                    {[...images, ...images].map((image, index) => (
                        <div
                            className="slide shrink-0 cursor-pointer relative rounded-md overflow-hidden md:max-w-[290px] max-w-[150px]"
                            key={`hero-section-${index}`}
                        >
                            <Image src={image.thumbnail} alt={`hero-section-${index}`} width={200} height={200} className="w-full h-full object-cover object-center " />


                            <div className='absolute inset-x-0 bottom-0 py-3 px-4 flex flex-row items-center justify-between backdrop-blur-lg'>
                                <p className='text-white text-sm uppercase tracking-widest'>{image.style}</p>
                                {
                                    image.videoUrl && image.videoUrl !== "" && <div className='bg-white/50 rounded-full sm:p-3 p-2 shrink-0 cursor-pointer'>
                                        <FaPlay className='text-black max-sm:text-xs' />

                                    </div>
                                }
                            </div>



                        </div>
                    ))}
                </div>
            </div>


        </div>
    )
}

export default ScrollIntoVideoAnimation