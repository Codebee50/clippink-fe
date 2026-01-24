import { Scene } from "@/lib/types/video";
import { FiTrash2 } from "react-icons/fi";
import { TbAdjustmentsStar } from "react-icons/tb";
import Image from "next/image";
import { RiSpeakAiLine } from "react-icons/ri";
import { TbClockHour9 } from "react-icons/tb";
import EditImageModal from "./EditImageModal";


const SceneCard = ({ scene }: { scene: Scene }) => {
  return (
    <div key={scene.id} className="w-full  bg-greys3 rounded-md p-4 flex flex-col gap-4 border border-greys1/20">
      <div className="w-full flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2 border border-greys1/20 rounded-md px-2 py-1">
          <p className="font-bold">#{scene.order_number}</p>
        </div>

        <div className="flex flex-row items-center gap-4">
          <div className="cursor-pointer hover:text-senary transition-all duration-300">
            <TbAdjustmentsStar />
          </div>
          <div className="cursor-pointer hover:text-red-500 transition-all duration-300">
            <FiTrash2 />
          </div>
        </div>
      </div>

      <div className="w-full flex flex-row items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="w-full p-4 bg-[#1B1B25] rounded-md relative">
            <div className="flex flex-row items-center bg-senary/10 rounded-br-md px-2 py-1 text-sm gap-1 w-max absolute top-0 left-0">
              <RiSpeakAiLine className="text-senary" />
              <p className="text-sm text-senary font-medium">Narration</p>
            </div>
            <p className="mt-5 text-sm"> {scene.narration}</p>
          </div>
        </div>

        <div className="w-[100px] h-[110px] shrink-0 flex flex-col gap-2 relative group">
          <Image
            src={scene.image_url || "/images/defaultbg.png"}
            alt="scene image"
            width={100}
            height={100}
            className="w-[100px] h-[110px] object-cover object-center shrink-0 rounded-md"
          />

          {/* Hide by default, show on hover for desktop, always show on mobile */}
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">

            <EditImageModal scene={scene} />


          </div>
        </div>

      </div>

      <div className="flex flex-row items-center justify-between">
        <p className="text-sm text-greys2/50 flex flex-row items-center gap-1">
          <TbClockHour9 className="text-greys2/50" />
          {scene.duration_seconds?.toFixed(2) ?? "0.00"}s
        </p>
      </div>
    </div>
  );
};

export default SceneCard;
