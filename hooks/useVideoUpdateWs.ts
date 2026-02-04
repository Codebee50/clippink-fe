import { useVideoStore } from "@/lib/store/video";
import { VideoUpdateMessageBody } from "@/lib/types/video";
import { videoUpdateManager } from "@/lib/utils/videoUpdateManager";
import { useEffect, useRef } from "react"

const useVideoUpdateWs = ({onMessage, listenerId}: {onMessage: (data: VideoUpdateMessageBody) => void, listenerId: string}) => {

    const { video: videoData } = useVideoStore();
    const onMessageRef = useRef(onMessage);

    useEffect(() => {
        onMessageRef.current = onMessage;
    }, [onMessage]);

    useEffect(() => {
        if(!videoData?.id) return 

        videoUpdateManager.connect(videoData.id)

        const unsubscribe = videoUpdateManager.subscribe((data) => {
            onMessageRef.current(data);
        }, listenerId)

        return () => {
            unsubscribe()
            if(videoUpdateManager.getListenerCount() === 0) {
                videoUpdateManager.disconnect()
            }
        }

    }, [videoData?.id]) 
    
}

export default useVideoUpdateWs