
import { VideoUpdateMessageBody } from "../types/video";

import ReconnectingWebSocket from 'reconnecting-websocket'
import { makeMsUrl } from "@/constants"


type Listener = (data: VideoUpdateMessageBody) => void

class VideoUpdateManager {
  private ws: ReconnectingWebSocket | null = null
  private listeners = new Set<Listener>()
  private currentVideoId: string | null = null

  connect(videoId: string) {
    if (this.currentVideoId === videoId && this.ws){
      return
    }

    this.disconnect()
    this.currentVideoId = videoId

    this.ws = new ReconnectingWebSocket(`${makeMsUrl(`/ws/video/task/${videoId}`, "ws")}`)

    this.ws.onmessage = (event) =>{
      const data = JSON.parse(event.data) as VideoUpdateMessageBody
      this.listeners.forEach(listener => listener(data))
    }

  }

  subscribe(listener: Listener){
    this.listeners.add(listener)
    return () => this.listeners.delete(listener) // return a clean up function to unsubscribe
  }

  disconnect(){
    if(this.ws){
      this.ws.close()
      this.ws = null
    }
    this.currentVideoId = null
  }

  getListenerCount(){
    return this.listeners.size
  }
}

export const videoUpdateManager = new VideoUpdateManager()