import Lottie from "lottie-react";
import React from "react";
import soundAnimation from "@/public/lottie/sound.json";

const SoundLottie = () => {
  return (
    <div className="w-[40px] h-[40px] opacity-20">
        <Lottie animationData={soundAnimation} loop={true} />
    </div>
  )
}

export default SoundLottie