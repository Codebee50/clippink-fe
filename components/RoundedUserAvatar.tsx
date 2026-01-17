import React from "react";
import Image from "next/image";

export const RoundedUserAvatar = ({ width = 30, height = 30 }: { width?: number; height?: number }) => {
  return (
    <div className="cursor-pointer text-greys2/50 hover:text-white transition-all duration-300  rounded-md hover:bg-greys1/10 relative shrink-0">
      <Image
        src="https://images.unsplash.com/photo-1618835962148-cf177563c6c0?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="avatar"
        width={width}
        height={height}
        className="rounded-full object-cover object-center"
        style={{ width: width, height: height }}
      />
    </div>
  );
};
