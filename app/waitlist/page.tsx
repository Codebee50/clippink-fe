"use client"

import Footer from "@/components/Footer"
import Nav from "@/components/Nav"
import { WaitlistForm } from "@/components/waitlist/waitlist-form"
import { getFireStoreColumn } from "@/lib/utils/waitlist"
import Image from "next/image"
import { useEffect, useState } from "react"
import { IoPlay } from "react-icons/io5";


export default function WaitlistPage() {

    const [names, setNames] = useState<string[]>([])

    const fetchWaitlistNames = async () => {
        const names = await getFireStoreColumn('waitlist', "name")
        setNames(names)
    }


    useEffect(() => {
        (async () => {
            await fetchWaitlistNames()
        })()
    }, [])


    return (
        <div className="min-h-screen bg-denary">


            <main className="flex section-con flex-col items-center justify-center padding-x pt-[150px] pb-16 relative">
                <Nav fixed={true} backdrop={true} />

                <div className="grid w-full items-center gap-16 lg:grid-cols-2 lg:gap-20">
                    {/* Left column - copy */}
                    <div className="flex flex-col items-start">
                        <p className="mb-3 text-sm font-medium tracking-wide text-senary uppercase">
                            Early Access
                        </p>
                        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-foreground text-balance sm:text-4xl leading-[1.1]">
                            Be first to create videos on getclip
                        </h1>
                        <p className="mb-10 max-w-md text-base text-greys2 leading-relaxed">
                            {"We're building the fastest way to produce short-form video content. Join the waitlist and get early access before everyone else."}
                        </p>

                        {/* Waitlist form */}
                        <div className="w-full max-w-md">
                            <WaitlistForm onSuccess={() => {
                                fetchWaitlistNames()
                            }} />
                        </div>

                        {/* Social proof */}
                        <div className="mt-8 flex items-center gap-3">
                            <div className="flex -space-x-2">
                                {names.slice(0, 4).map((name) => (
                                    <div
                                        key={name}
                                        className="flex h-8 w-8 items-center uppercase justify-center rounded-full border-2 border-denary bg-greys3 text-xs font-medium text-greys2"
                                        aria-hidden="true"
                                    >
                                        {name[0]}
                                    </div>
                                ))}


                                {
                                    names.length > 4 && <div className="w-8 h-8 rounded-full text-xs flex text-greys2 items-center justify-center object-cover object-center bg-denary border border-greys1/20 shrink-0">
                                        <p>
                                            +{names.length - 4}
                                        </p>
                                    </div>
                                }
                            </div>
                            <div className="h-5 w-px bg-border" aria-hidden="true" />
                            <p className="text-sm text-greys4">
                                <span className="font-medium text-greys2">{names.length}</span>{" "}
                                on the waitlist
                            </p>
                        </div>
                    </div>

                    <div className="relative">
                        <Image src="https://clippink-bkt.s3.amazonaws.com/images/23fbb339-aece-43a5-95c2-549d828fc0fc/bb5848bf-730f-46b8-bb61-87d2cd994e70.jpeg" className="max-h-[600px] object-cover object-center rounded-sm" alt="Cartoon image" width={1000} height={1000} />
                        {/* <Image src="https://clippink-bkt.s3.amazonaws.com/images/23fbb339-aece-43a5-95c2-549d828fc0fc/e97eca64-e387-4546-9a67-515ce8d32449.jpeg" className="max-h-[600px] object-cover object-center rounded-sm" alt="Cartoon image" width={600} height={600} /> */}

                        <div className="absolute inset-0 flex items-center justify-center">

                            <div className="bg-white/50 w-[100px] h-[100px] rounded-full flex items-center justify-center">


                                <div className="bg-white w-[70px] h-[70px] rounded-full flex">
                                    <IoPlay className="m-auto shrink-0 text-black text-2xl" />

                                </div>

                            </div>

                        </div>


                    </div>
                </div>
            </main>

            <Footer pad={true} />
        </div>
    )
}
