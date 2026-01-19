import React from "react";
import Image from "next/image";

const Marquee = ({ imageList = [], direction= "left" }: { imageList: string[], direction: "left" | "right" }) => {
  return (
    <div className="slider overflow-hidden w-full flex justify-start m-auto">
      <div className={`slide-track ${direction === "left" ? "slide-track-reverse" : ""}`}>
        {imageList.map((item) => (
          <a
            className="slide mx-2 h-auto min-w-[100px] sm:min-w-[150px] box-border cursor-pointer"
            key={item}
          >
            <div className="card overflow-hidden rounded-md mb-3 shadow w-full">
              <div className="relative overflow-hidden h-auto w-full">
                <Image
                  src={item}
                  width={500}
                  height={220}
                  alt={"Image"}
                  className="sm:h-[190px] h-[100px] object-cover object-center"
                />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
