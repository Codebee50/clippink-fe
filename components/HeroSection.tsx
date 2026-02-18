"use client";

import React, { useEffect, useRef, useState } from "react";
import Marquee from "./Marquee";
import Nav from "./Nav";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import ScrollIntoVideoAnimation from "./ScrollIntoVideoAnimation";
import { useScroll, useTransform, motion } from "framer-motion";


const imageUrls = [
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/feaf47bb-baf6-4aef-9904-3897edf6e8a5.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/926b011e-b733-4bc2-b16d-f86a16f227c1.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/c9a5ea07-98b0-4395-b679-17fc1d1f726f.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/208c0444-0fb6-43a8-a0a7-f1ba8672f379.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/816034ce-96e9-4140-9013-08e51fad6a61.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/ee507857-7ae5-4447-bc53-5bda43ed6838.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/1a673720-0c1f-4551-b415-cad6ac232e74.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/e8286f64-f023-4eb9-8471-b6c23887fae0.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/ba0f1248-ac46-425c-8121-62302a71d2c8.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/2142ee9f-3a34-45b9-8f78-1a42d5164937.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/e16dace4-38ae-43c3-aebe-95c69e005775.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/1026794f-e469-4330-b551-28aabfc86650.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/6f7814eb-a05a-49a3-a2da-b5c8ab46f0a0.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/cb7f8345-3f0d-4349-bbdb-a2b5be7ec271.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/13587733-a512-454e-b01f-e82c4c1a4c6a.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/98936c49-887c-42fb-9558-500c312cddd9.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/411d7f52-d177-49b0-b564-2e08fe65361d.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/4c43b071-d6c3-44e7-b453-cc25e50f0067.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/5fe374f8-5028-4247-b4df-3ac80bd110a2.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/2fe4b958-8fd5-425b-828b-09c4a6c584ec.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/ca837ef6-f358-4325-8484-153787a49afa.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/03121a3c-2397-476f-a84b-263c071b1869.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/9c6ba8f3-c1a0-435f-982f-487c0170a2f0.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/ac602e42-d963-49b4-a733-a933e52d6d4e.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/044a7193-ad18-45f4-a199-d4f46617e942.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/c8962dc5-4399-489a-b8b7-7bb27186174f.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/02c9e199-89b7-40dd-bd38-82218d104d4f.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/e0056ef2-b25f-401f-b2ed-71f225618c72.jpeg",

    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/3da93ad6-54f7-4ceb-9a47-9dbc6c082a3c.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/f9676ae9-c794-443a-aa0a-e36292fb9e14.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/14cc3324-1ab4-4f00-a4d1-391dc4594574.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/f1e59269-be29-4e2c-80a4-19dd548d82ef.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/7bf41b72-84e4-4a36-bc6f-41d62b4dff14.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/a88d4209-1b89-4eb5-bd86-40050db5dd39.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/f55f0bf9-96fb-4bf8-9521-2bef37431157.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/7e747102-4c83-4c6b-8e60-2bf8dad69dd9.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/47cfaf73-5145-4ad8-b5c7-474684459595.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/e84e7747-03e9-4765-9337-08b6fef4dfe2.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/aaee0891-5d26-4f46-97d1-f586ed0dd773.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/0bfee944-46b1-4045-acaf-b17ff8289821.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/b1215c73-f9c8-4db2-a9e1-8c36d6c1034a.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/3fbd4a80-d588-4538-ab9a-13b7c3ecc6a8.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/122b9d27-94ad-4af6-8a00-952d2b1bd934.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/7e71a86a-7bdc-4a76-b9bc-f4336d1b201e.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/072d6df3-c2fe-4d48-8aaf-1279659f3290.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/d8ceacf1-8537-4cfe-9e6b-43af0e961723.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/710f8e20-7f28-42d8-9310-a97c809a704e.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/f741f9f3-739a-453a-a6b2-d4e9126bc9a4.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/c1e3016e-2eea-4dd4-9d79-e168d08af4ed.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/184d831d-cb43-4c11-855f-6414b0510e25.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/43b210de-91ea-4df3-89f1-7fdf810a8cb5.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/1e0782a4-2bc0-44f5-823c-c9a96c01df64.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/a123548b-bfb1-4d36-b7e0-24a63d1f3fb7.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/fe0135cc-51b2-4e5f-b59f-8a34dca27951.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/43a4569e-961e-49b9-961c-5ee31f62337e.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/58b150a8-f7ea-4d35-96cc-eb2a9e2848a9.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/ebbebd15-d577-42dd-87d4-410146dad95f.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/2ce56873-7dd0-4296-a041-ddb103877574.jpeg",

    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/d3a1e5a2-b49d-43fe-97cb-f671831e59d3.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/19f807ac-468d-4a57-a1c2-d01faaf96848.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/bb8d0f2b-0d13-41e9-ae86-f37b467ed82b.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/e1bbbcfd-6da7-476c-8c14-f510aab5c2d8.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/a0ac76f6-7dee-4507-852b-d48cc5234f3a.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/444d5bb4-d6fa-4a63-8994-ed0f0bfb763b.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/42045190-3261-49b9-92f3-91a6f41c1825.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/d7f3fdab-8b90-4c37-bcfd-7d8f761ed467.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/92825ae7-08e4-4a3e-aef0-ced36521515a.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/0d822e84-46b5-4654-8b1d-ac5a681e3ae1.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/c784d5d6-9bb5-4e05-953f-3f682fe998a3.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/01b9506f-46a1-4cda-adcd-4e794e7e1b29.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/e4cf7017-c383-449e-864d-8763ba106304.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/026f5186-12be-4e7e-ada8-2c35c586ba7d.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/15812e49-4509-46a2-8963-56c6e1f06675.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/4ad8275c-0db6-4580-b659-f0888ed25040.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/3e1d864e-a35b-48a2-b072-130da2895931.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/f0bf4aa7-2192-4db8-974f-fa825b283c40.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/0cd57b4e-c5f7-4cb4-a457-bbc8baf495bc.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/8acad5e5-6222-43c8-ab1a-5081372ebf6f.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/a06395fa-8b6b-44f7-952e-37b5dd92e2a9.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/495573db-595a-46ee-825a-5f6c4ac40dcb.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/3334a5b2-c98e-40e1-aeb1-101c8c6a5692.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/4570e302-edb5-4e2b-b0ff-be0cedd54c1e.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/44f7c8c7-6993-457c-a837-e7c9a90f4cd8.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/567cae24-6461-4218-bff8-571a103b7f65.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/66d262e4-ec43-41c5-a93a-d889d58baf2b.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/9d62d579-e96e-46b2-b411-00aa6ade3515.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/de51016e-747b-4de9-b435-c65c1dc06f98.jpeg",
    "https://clippink-bkt.s3.amazonaws.com/images/landing-page-images/ab4c2a0f-fe84-4d8d-ba04-e26ae42412c8.jpeg",
];


const imageList = [
    {
        thumbnail: "https://clippink-bkt.s3.amazonaws.com/images/77df34e4-6260-4d4b-904e-d79a6a3e645e/11c44cca-4aa7-4720-bf09-d5dc0fcf9877.jpeg",
        style: "Realistic",
        videoUrl: ""
    },
    {
        thumbnail: "https://clippink-bkt.s3.amazonaws.com/images/a51e55fc-e009-4d64-9a6d-baa799d76c65/c364eda6-e67f-4aff-b7b8-8185ef98a7c6.jpeg",
        style: "Anime",
        videoUrl: ""
    },
    {
        thumbnail: "https://clippink-bkt.s3.amazonaws.com/images/d01da742-80f3-4858-8464-805e0d657e56/98f55c22-b597-4b1c-9aa8-24be5b8b6c75.jpeg",
        style: "Cartoon",
        videoUrl: ""
    },
    {
        thumbnail: "https://clippink-bkt.s3.amazonaws.com/images/2032ee58-7b58-47e7-87ba-c28c50056dda/c7506295-0b8a-452f-b76c-d30b48a5dabc.jpeg",
        style: "Realistic",
        videoUrl: ""
    },
    {
        thumbnail: "https://clippink-bkt.s3.amazonaws.com/images/619aca91-4ce2-4200-bc36-396401e9f484/ce1a1494-36c8-4565-8860-0a837d8b30ea.jpeg",
        style: "Cartoon",
        videoUrl: ""
    },
    {
        thumbnail: "https://clippink-bkt.s3.amazonaws.com/images/dc717093-b252-44f2-92e1-48bff8fa86f6/66973684-3adb-4c85-b1db-635915b6058a.jpeg",
        style: "Line art",
        videoUrl: ""
    },
    {
        thumbnail: "https://clippink-bkt.s3.amazonaws.com/images/a51e55fc-e009-4d64-9a6d-baa799d76c65/ff5cb6ac-d212-4793-85a4-05693f1a57f7.jpeg",
        style: "Anime",
        videoUrl: ""
    }
]

const randomAvatars = ["/avaters/bear.png", "/avaters/dog.png", "/avaters/meerkat.png", "/avaters/rabbit.png"];

const shuffleArray = (array: string[]) => {
    return array.slice().sort(() => Math.random() - 0.5);
};


const HeroSection = () => {
    const router = useRouter();

    const ref = useRef(null)


    return (
        <div className="flex flex-col  bg-denary  w-full relative" ref={ref}>

            <div className="flex flex-col relative bg-linear-to-t from-denary to-senary/10 via-denary pb-15">

                <div className="inset-0 bg-transparent">
                    <Nav fixed={true} backdrop={true} />

                    <div className="h-[120px]"></div>

                    <div className="flex flex-col items-center justify-center gap-4 padding-x">
                        <h1 className="text-white text-2xl md:text-5xl lg:text-[50px]  capitalize font-alegreya text-center">
                            Create Viral faceless videos<br /> Faster, Easier and Better
                        </h1>
                        <p className="font-intertight text-greys2 max-sm:text-sm max-sm:max-w-[270px] text-center">Post daily without burnout and grow your audience while you sleep. </p>
                        <button
                            onClick={() => router.push("/dashboard")}
                            className="bg-senary text-white px-6 py-2 rounded-md cursor-pointer capitalize font-medium text-center mt-5"
                        >
                            Start creating videos
                        </button>

                        <div className="mt-2 flex flex-row items-center sm:gap-4 gap-3">
                            <div className="flex flex-row items-center justify-center">
                                {randomAvatars.map(avatar => (
                                    <Image src={avatar} alt="avatar" key={avatar} width={50} height={50} className="sm:w-10 sm:h-10 w-8 h-8 rounded-full object-cover object-center shrink-0 -m-1" />
                                ))}
                            </div>

                            <div className="w-[0.5px] sm:h-[40px] h-[30px] bg-gray-600 opacity-50 "></div>

                            <div className="flex flex-col justify-start items-start">
                                <div className="flex flex-row gap-1 items-center">
                                    {[1, 2, 3, 4, 5].map(item => (
                                        <FaStar className="text-yellow-500 max-sm:text-xs" key={`${item}-starry`} />
                                    ))}
                                    <p className="max-sm:text-sm">5.0</p>
                                </div>
                                <p className=" text-gray-200 text-sm">
                                    <span className="font-medium max-sm:text-sm">{randomAvatars.length}</span> early adopter{randomAvatars.length > 1 && "s"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


                <ScrollIntoVideoAnimation images={imageList} />

            </div>



        </div>
    );
}

export default HeroSection