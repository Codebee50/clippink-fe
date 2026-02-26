import { Scene } from "@/lib/types/video";
import { FiTrash2 } from "react-icons/fi";
import { TbAdjustmentsStar } from "react-icons/tb";
import Image from "next/image";
import { RiSpeakAiLine } from "react-icons/ri";
import { TbClockHour9 } from "react-icons/tb";
import EditImageModal from "./EditMotionEffect";
import EditImageOptionsPopover from "./EditImageOptionsPopover";
import { useEffect, useRef, useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";

import { IoClose } from "react-icons/io5";
import TextareaAutosize from 'react-textarea-autosize';
import useStyledToast from "@/hooks/useStyledToast";
import usePostRequest from "@/hooks/usePost";
import { AxiosError, AxiosResponse } from "axios";
import { genericErrorHandler } from "@/lib/errorHandler";
import CircleSpinner from "../loaders/CircleSpinner";
import useDeleteRequest from "@/hooks/useDelete";
import { useVideoStore } from "@/lib/store/video";



const SceneCard = ({ scene, scene_index }: { scene: Scene, scene_index: number }) => {
  const [narrationChanged, setNarrationChanged] = useState(false)
  const narrationInputRef = useRef<HTMLTextAreaElement | null>(null)
  const toast = useStyledToast()

  const deleteScene = useVideoStore((state) => state.deleteScene)

  const [newNarration, setNewNarration] = useState<string | null>(null)

  const [isRegeneratingAudio, setIsRegeneratingAudio] = useState(false)

  const { mutate: makeDeleteSceneRequest, isLoading: isDeletingScene } = useDeleteRequest({
    url: `/video/scene/${scene.id}/delete/`,
    onSuccess: (reponse: AxiosResponse) => {
      deleteScene(scene.id)
      toast.success("Scene deleted successfully")
    },
    onError: (error: AxiosError) => {
      toast.error(genericErrorHandler(error, "Scene deletion failed"))
    }
  })

  const { mutate: initiateRegenerateAudio, isLoading: isInitiatingRegenerateAudio } = usePostRequest(
    {
      url: "/video/scene/audio/regenerate/",
      onSuccess: (response: AxiosResponse) => {
        setIsRegeneratingAudio(true)
      },
      onError: (error: AxiosError) => {
        toast.error(genericErrorHandler(error, "Could not regenerate audio"))
      }
    }
  )


  const handleNarrationChanged = (newNarration: string) => {
    if (!narrationChanged) {
      setNarrationChanged(true)
    }

    setNewNarration(newNarration)
  }

  const handleCancelNarrationEdit = () => {
    if (narrationInputRef.current) {
      narrationInputRef.current.value = scene.narration
    }
    setNarrationChanged(false)
  }

  const handleRegenerateAudio = () => {

    if (newNarration === scene.narration || newNarration == null) {
      toast.error("You have not made any changes to the narration")
      return
    }



    initiateRegenerateAudio({
      scene_id: scene.id,
      new_narration: newNarration
    })
  }

  useEffect(() => {
    const indicateSceneNarrationChanged = () => {
      setIsRegeneratingAudio(false)
      setNarrationChanged(false)
    }


    if (newNarration == scene.narration) {
      toast.success("Scene audio successfully regenerated")
    }
    indicateSceneNarrationChanged()
  }, [scene.narration])



  return (
    <div key={scene.id} className="w-full  bg-greys3 rounded-md p-4 flex flex-col gap-4 border border-greys1/20">
      <div className="w-full flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-2 border border-greys1/20 rounded-md px-2 py-1">
          <p className="font-bold">#{scene_index}</p>
        </div>

        <div className="flex flex-row items-center gap-4">
          <div className="cursor-pointer hover:text-senary transition-all duration-300">
            <TbAdjustmentsStar />
          </div>
          <button onClick={() => makeDeleteSceneRequest()} className="cursor-pointer hover:text-red-500 transition-all duration-300">
            <FiTrash2 />
          </button>
        </div>
      </div>

      <div className="w-full flex flex-row items-end justify-between gap-4">
        <div className="flex flex-col gap-2 flex-1">
          {
            narrationChanged && <div className="w-full flex flex-row items-center justify-end gap-2">

              <button onClick={handleCancelNarrationEdit} className="text-xs bg-red-600/20 p-1 text-red-600 rounded-md border border-red-600/40 flex flex-row gap-1 cursor-pointer hover:bg-red-600/30 transition-all ease-in-out duration-300 items-center">
                <IoClose />

                Cancel</button>
              <button onClick={handleRegenerateAudio} disabled={isRegeneratingAudio || isInitiatingRegenerateAudio} className="text-xs bg-senary/20 p-1 text-senary rounded-md border border-senary/40 disabled:opacity-50 flex flex-row gap-1 cursor-pointer hover:bg-senary/30 transition-all ease-in-out duration-300 items-center">

                {
                  isRegeneratingAudio || isInitiatingRegenerateAudio ? <CircleSpinner size={13} color="var(--color-senary)" /> : <FiRefreshCcw className={(isRegeneratingAudio || isInitiatingRegenerateAudio) ? "animate-spin" : ""} />
                }
                Regenerate audio</button>

            </div>
          }
          <div className="w-full p-4 bg-[#1B1B25] rounded-md relative">
            <div className="flex flex-row items-center bg-senary/10 rounded-br-md px-2 py-1 text-sm gap-1 w-max absolute top-0 left-0">
              <RiSpeakAiLine className="text-senary" />
              <p className="text-sm text-senary font-medium">Narration</p>
            </div>
            <TextareaAutosize
              onChange={(e) => handleNarrationChanged(e.target.value)}
              defaultValue={scene.narration}
              className="text-sm resize-none w-full mt-5 outline-none border-none"
              ref={narrationInputRef}
            />

            {/* <textarea onChange={(e) => handleNarrationChanged(e.target.value)} defaultValue={scene.narration} className="text-sm max-h-[400px] resize-none w-full mt-5 outline-none border-none" /> */}
            {/* <p className="mt-5 text-sm"> {scene.narration}</p> */}
          </div>
        </div>

        <div className="w-[100px] h-[110px] shrink-0 flex flex-col gap-2 relative group">
          <Image
            src={scene.image_url || "/images/defaultbg.png"}
            alt="scene image"
            width={100}
            height={110}
            className="w-[100px] h-[110px] object-cover object-center shrink-0 rounded-md"
          />

          {/* Hide by default, show on hover for desktop, always show on mobile */}
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">

            <EditImageOptionsPopover
              scene={scene}
            />

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
