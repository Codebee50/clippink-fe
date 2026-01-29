import React, { useMemo, useState } from "react";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";

const Marquee = ({ imageList = [], direction = "left" }: { imageList: string[]; direction: "left" | "right" }) => {
  const [views] = useState(() => Math.floor(Math.random() * (6000000 - 10000 + 1)) + 10000);
  return (
    <div className="slider overflow-hidden w-full flex justify-start m-auto">
      <div className={`slide-track ${direction === "left" ? "slide-track-reverse" : ""}`}>
        {imageList.map(item => (
          <a className="slide mx-2 h-auto min-w-[130px] sm:min-w-[150px] box-border  cursor-pointer" key={item}>
            <div className="card overflow-hidden rounded-md mb-3 shadow w-full">
              <div className="relative overflow-hidden h-auto w-full">
                <Image src={item} width={500} height={220} alt={"Image"} className="sm:h-[230px] h-[170px] object-cover object-center bg-greys3" />
                <div className="absolute bottom-2 right-2 text-white flex flex-row items-center gap-1">
                  <FaPlay size={13} />

                  <p className="text-sm font-medium">
                    {`${Intl.NumberFormat('en', {
                      notation: "compact",
                      maximumFractionDigits: 1
                    }).format(
                      views
                    )} Views`}
                  </p>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
