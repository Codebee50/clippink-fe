import React from "react";
import { VideoResponse } from "@/lib/types/video";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TbClockHour3 } from "react-icons/tb";

const VideoListCard = ({ video }: { video: VideoResponse }) => {
  const router = useRouter();
  const sortedScenes = video.scenes.sort((a, b) => a.order_number - b.order_number);
  const firstSceneWithImage = sortedScenes.find(scene => scene.image_url);

  const firstScene = sortedScenes[0];

  return (
    <div className="w-[200px] h-[250px] bg-greys3 rounded-md border border-greys1/30 shrink-0 cursor-pointer overflow-hidden relative" onClick={() => router.push(`/dashboard/video/${video.id}`)}>
      {firstSceneWithImage && firstSceneWithImage.image_url?.startsWith("https") && (
        <Image src={firstSceneWithImage?.image_url || ""} alt={firstScene.narration.slice(0, 40)} width={200} height={200} className="w-full h-full object-cover object-center" />
      )}
      <div className="absolute inset-0 bg-linear-to-b from-transparent  to-denary  via-transparent flex flex-col justify-between p-2">
        <div className="self-end bg-red-600 text-white text-sm font-medium px-2 py-1 rounded-md">
          <p>New</p>
        </div>

        <div className="w-full flex flex-col gap-1">
          <p className="text-sm text-white line-clamp-2">{firstScene.narration.slice(0, 200)}</p>
          <div className="flex flex-row items-center text-xs text-greys2/50 gap-1">
            <TbClockHour3 />
            <p>
              {new Date(video.created_at).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              }).replace(",", "")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoListCard;
