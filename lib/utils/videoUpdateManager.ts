
import { VideoUpdateMessageBody } from "../types/video";

import ReconnectingWebSocket from 'reconnecting-websocket'
import { makeMsUrl, WS_PROTOCOL } from "@/constants"


type Listener = (data: VideoUpdateMessageBody) => void

class VideoUpdateManager {
  private ws: ReconnectingWebSocket | null = null
  private listeners = new Map<string, Listener>()
  private currentVideoId: string | null = null

  connect(videoId: string) {
    if (this.currentVideoId === videoId && this.ws) {
      return
    }

    this.listeners.clear()
    this.disconnect()
    this.currentVideoId = videoId

    this.ws = new ReconnectingWebSocket(`${makeMsUrl(`/ws/video/task/${videoId}`, WS_PROTOCOL)}`)

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data) as VideoUpdateMessageBody
      this.listeners.forEach((listener, key) => {
        listener(data)
      })
    }

  }

  subscribe(listener: Listener, listenerId: string) {
    this.listeners.set(listenerId, listener)
    return () => this.listeners.delete(listenerId) // return a clean up function to unsubscribe
  }

  disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
    this.currentVideoId = null
  }

  getListenerCount() {
    return this.listeners.size
  }
}

export const videoUpdateManager = new VideoUpdateManager()