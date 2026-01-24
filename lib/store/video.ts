import {create} from "zustand"
import { Scene, VideoResponse } from "../types/video";
import { makeMsUrl } from "@/constants";
import axios from "axios";
type VideoStore = {
    video: VideoResponse | null;
    loading: boolean;
    fetchVideo: (videoId: string) => Promise<VideoResponse | null>;
    setVideo: (video: VideoResponse) => void;
    replaceScenes: (scenes: Scene[]) => void;
    replaceScene: (scene: Scene) => void;
}

export const useVideoStore = create<VideoStore>((set)=>({
    video: null,
    loading: false,
    setVideo: (video: VideoResponse) => set({ video }),

    fetchVideo: async(videoId: string) =>{
        set({loading: true})
        const response = await axios.get(`${makeMsUrl(`/video/${videoId}/`)}`)

        if(response.status === 200){
            set({video: response.data as VideoResponse, loading: false})
            return response.data as VideoResponse
        }

        set({loading: false})
        return null
    },

    replaceScenes: (scenes: Scene[]) => {
        const timestamp = new Date().getTime();
        set((state) => {
            if(!state.video) return state;

            return {
                video: {
                    ...state.video,
                    scenes: scenes,
                    last_changed_at: timestamp.toString()
                }
            }
        })
    },

    replaceScene: (scene: Scene) =>{
        const timestamp = new Date().getTime();
        set((state) => {
            if(!state.video) return state;
            return {
                video: {
                    ...state.video,
                    scenes: state.video.scenes.map(s => s.id === scene.id ? scene : s),
                    last_changed_at: timestamp.toString()
                }
            }
        })
    }



})) 