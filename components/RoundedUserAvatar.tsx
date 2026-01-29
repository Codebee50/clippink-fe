import React from "react";
import Image from "next/image";

export const RoundedUserAvatar = ({ width = 30, height = 30 }: { width?: number; height?: number }) => {
  return (
    <div className="cursor-pointer text-greys2/50 hover:text-white transition-all duration-300  rounded-md hover:bg-greys1/10 relative shrink-0">
      <Image
        src="/avaters/bear.png"
        alt="avatar"
        width={width}
        height={height}
        className="rounded-full object-cover object-center"
        style={{ width: width, height: height }}
      />
    </div>
  );
};
