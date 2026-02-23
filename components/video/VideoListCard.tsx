import React from "react";
import { VideoResponse } from "@/lib/types/video";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TbClockHour3 } from "react-icons/tb";
import Logo from "../Logo";
import { appConfig } from "@/constants";
import { getClassNameForStatus } from "@/lib/utils";
import { ClippedVideoStatus } from "@/lib/types/videotoshorts";

const VideoListCard = ({ video }: { video: VideoResponse }) => {
  const router = useRouter();

  return (
    <div className="w-[150px] sm:w-[200px] h-[200px] sm:h-[290px] bg-greys3 rounded-md border border-greys1/30 shrink-0 cursor-pointer overflow-hidden relative" onClick={() => router.push(`/dashboard/video/${video.id}`)}>
      {video.thumbnail_url ? (
        <Image src={video.thumbnail_url || appConfig.PLACEHOLDER_IMAGE_URL} alt={video.title || "Untitled"} width={200} height={200} className="w-full h-full object-cover object-center" />
      ) : (
        <div className="w-full h-full bg-greys3 flex items-center justify-center">
          <div>
            <Logo width={40} height={40} showText={false} dotColor="#2a2e33" color="#2a2e33" />
          </div>
        </div>
      )}
      <div className="absolute inset-0 bg-linear-to-b from-transparent  to-denary  via-transparent flex flex-col justify-between p-2">


        <div className={`self-end text-xs font-medium px-2 py-1 rounded-md ${getClassNameForStatus(video.status as ClippedVideoStatus)}`}>
          <p>{video.status}</p>
        </div>

        <div className="w-full flex flex-col gap-1">
          <p className="text-sm text-white line-clamp-2">{video.title || "Untitled"}</p>
          <div className="flex flex-row items-center text-xs text-greys2/50 gap-1">
            <TbClockHour3 />
            <p className="text-nowrap line-clamp-1">
              {new Date(video.created_at)
                .toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })
                .replace(",", "")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoListCard;
