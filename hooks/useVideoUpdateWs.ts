
import { useVideoStore } from "@/lib/store/video";
import { VideoUpdateMessageBody } from "@/lib/types/video";
import { videoUpdateManager } from "@/lib/utils";
import { useEffect } from "react"

const useVideoUpdateWs = ({onMessage}: {onMessage: (data: VideoUpdateMessageBody) => void}) => {

    const { video: videoData } = useVideoStore();

    useEffect(()=>{
        if(!videoData?.id) return 

        videoUpdateManager.connect(videoData.id)

        const unsubscribe = videoUpdateManager.subscribe(onMessage)

        return ()=>{
            unsubscribe()
            if(videoUpdateManager.getListenerCount() === 0){ //nobody is listening to the updates, so we can disconnect the websocket
                videoUpdateManager.disconnect()
            }

        }

    }, [videoData?.id])
    
}

export default useVideoUpdateWs