"use client";

import React from 'react'
import Image from "next/image";
import { GoRocket } from "react-icons/go";
import { FaSlideshare } from "react-icons/fa6";
import { MdMotionPhotosOn } from "react-icons/md";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { appConfig } from '@/constants';
import { useRouter } from 'next/navigation';
import { TbScript } from "react-icons/tb";
import { RiVideoAiLine } from "react-icons/ri";
import { BiSolidCustomize } from "react-icons/bi";



const ShowcaseSection = () => {
    const router = useRouter();
    return (
        <div
            className="w-full  pt-[10px] padding-x relative bg-denary pb-[80px]"
            style={{
                backgroundImage: `
          linear-gradient(to bottom, rgba(0,0,0,0.02) 1px, transparent 1px),
          linear-gradient(to right, rgba(0,0,0,0.02) 1px, transparent 1px)
        `,
                backgroundSize: "80px 80px",
            }}
        >


            <div className="w-full mt-10 stack">
                <Image
                    height={200}
                    width={200}
                    src={"/embedcircles.svg"}
                    className="md:w-[50%] w-full max-w-[700px] mx-auto max-md:my-auto"
                    alt="Graph Steps"
                />

                <div className="flex flex-col md:flex-row items-center max-w-[1000px] mx-auto gap-10">
                    {/* left stack */}
                    <div className="flex flex-col gap-3">
                        {/* get a script */}
                        <div className="flex flex-col items-center gap-2 bg-greys3 rounded-xl px-5 py-7 w-full sm:max-w-[270px] border border-greys1/20">
                            <TbScript className="text-white text-2xl" />

                            <h3 className="font-medium">Get a script</h3>
                            <p className="text-sm text-gray-500 text-center">
                                Bring your custom script or generate one with our advanced AI script writer.
                            </p>

                            <button className="bg-senary text-white px-4 py-2 rounded-md w-max text-sm font-medium cursor-pointer mt-5" onClick={() => router.push("/dashboard/video/create")}>
                                Create a video
                            </button>
                        </div>

                        {/* generate a video */}
                        <div className="flex flex-row items-center gap-4 bg-greys3 rounded-xl px-5 py-7 w-full sm:max-w-[270px] border border-greys1/20">
                            <RiVideoAiLine className="text-white text-2xl shrink-0" />

                            <div className="flex flex-col text-start">
                                <h3 className="font-medium">Generate a video</h3>
                                <p className="text-sm text-gray-500">
                                    Based on your script and video style configurations, our AI will generate a high quality video for you.
                                </p>
                            </div>
                        </div>

                        <Image
                            height={70}
                            width={70}
                            src={"/rightcurlyarrow.svg"}
                            className="self-end max-md:hidden"
                            alt="Generate a video"
                        />
                    </div>

                    {/* video in the center */}
                    <div className=" w-full sm:w-[350px] sm:h-[530px] h-[400px] bg-white/90 rounded-xl overflow-hidden relative">
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            controls
                            preload="metadata"
                            className="w-full h-full object-cover"
                        >
                            <source src="https://s3.us-east-1.amazonaws.com/remotionlambda-useast1-h2ias1sgku/renders/kxmdxtsmnh/Clip-2aa0923b-6ca0-4255-90b1-e149645b41a8-out.mp4" type="video/mp4" />
                            Your browser doesn&apos;t support the video tag.
                        </video>

                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 flex flex-col items-center justify-end p-4">
                            <p className="text-white uppercase">CREATED BY {appConfig.APP_NAME}</p>
                        </div>
                    </div>

                    {/* right stack */}
                    <div className="flex flex-col gap-3">
                        <Image
                            height={70}
                            width={70}
                            src={"/leftcurlyarrow.svg"}
                            className="self-start max-md:hidden"
                            alt="Share your goals"
                        />

                        {/* solid proof */}
                        <div className="flex flex-col items-center gap-2 bg-greys3 rounded-xl px-5 py-10 w-full sm:max-w-[300px] border border-greys1/20">
                            <GoRocket className="text-white text-2xl" />

                            <h3 className="font-medium">Export your video</h3>
                            <p className="text-sm text-gray-500 text-center">
                                Export your video as a high quality mp4 file, ready to upload to your favorite social media platform.
                            </p>
                        </div>

                        {/* preview or edit the video */}
                        <div className="flex flex-col items-center gap-2 bg-greys3 rounded-xl px-5 py-10 w-full sm:max-w-[300px] border border-greys1/20">
                            <BiSolidCustomize className="text-white text-2xl" />

                            <h3 className="font-medium">Preview or edit the video</h3>
                            <p className="text-sm text-gray-500 text-center">
                                Preview the video and edit it to your liking, change background music, narrators voice, and more.
                            </p>
                        </div>
                    </div>
                </div>
            </div>




        </div>
    )
}

export default ShowcaseSection