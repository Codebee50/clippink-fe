import { create } from "zustand"
import { Scene, UpdateVideoReqConfig, VideoResponse } from "../types/video";
import { makeMsUrl } from "@/constants";
import axios, { AxiosResponse } from "axios";
import { getDefaultCaptionSettings } from "../utils/caption";
import { CaptionStyleConfig } from "../types/captions";
import baseApiClient from "@/lib/axios/api";


type VideoStore = {
    video: VideoResponse | null;
    loading: boolean;
    fetchVideo: (videoId: string) => Promise<VideoResponse | null>;
    setVideo: (video: VideoResponse) => void;
    replaceScenes: (scenes: Scene[]) => void;
    replaceScene: (scene: Scene) => void;
    addScene: (scene: Scene) => void;
    deleteScene: (scene_id: string) => void;
    updateCaptionSettingsByKey: (key: keyof CaptionStyleConfig, value: unknown, persist?: boolean) => void;
    bulkUpdateCaptionSettings: (captionSettings: CaptionStyleConfig) => Promise<void>;
    updateVideo: (config: UpdateVideoReqConfig, persist?: boolean) => Promise<AxiosResponse | null>;
    prepareVideoForState: (video: VideoResponse) => VideoResponse;
}

export const useVideoStore = create<VideoStore>((set, get) => ({
    video: null,
    loading: false,
    setVideo: (video: VideoResponse) => set({ video }),

    // call this function anytime you fetch the complete video from the backend and want to override the entire video state 
    //i am doing this so that defaults or other video preparations can be done as this stage
    // it does not modify the state, it only prepares the video with any defaults and returns it
    prepareVideoForState: (video: VideoResponse) => {
        if (!video.caption_settings) {
            video.caption_settings = getDefaultCaptionSettings()
        }
        return video
    },

    fetchVideo: async (videoId: string) => {
        set({ loading: true })
        const response = await baseApiClient.get(`/video/${videoId}/`)

        if (response.status === 200) {
            const video = response.data as VideoResponse
            const updatedVideo = get().prepareVideoForState(video)
            set({ video: updatedVideo, loading: false })
            return updatedVideo
        }

        set({ loading: false })
        return null
    },

    replaceScenes: (scenes: Scene[]) => {
        const timestamp = new Date().getTime();
        set((state) => {
            if (!state.video) return state;

            return {
                video: {
                    ...state.video,
                    scenes: scenes,
                    last_changed_at: timestamp.toString()
                }
            }
        })
    },

    addScene: (scene: Scene) => {
        const timestamp = new Date().getTime()
        set((state) => {
            if (!state.video) return state;

            return {
                video: {
                    ...state.video,
                    scenes: [...state.video.scenes, scene],
                    last_changed_at: timestamp.toString()
                }
            }
        })
    },

    deleteScene: (scene_id: string) => {
        const timestamp = new Date().getTime()

        set((state) => {
            if (!state.video) return state;

            return {
                video: {
                    ...state.video,
                    scenes: state.video.scenes.filter((scene) => scene.id !== scene_id),
                    last_changed_at: timestamp.toString()
                }
            }
        })
    },



    replaceScene: (scene: Scene) => {
        const timestamp = new Date().getTime();
        set((state) => {
            if (!state.video) return state;
            return {
                video: {
                    ...state.video,
                    scenes: state.video.scenes.map(s => s.id === scene.id ? scene : s),
                    last_changed_at: timestamp.toString()
                }
            }
        })
    },

    updateCaptionSettingsByKey: async (key: keyof CaptionStyleConfig, value: unknown, persist: boolean = false) => {
        let videoId = null;
        let captionSettings = null
        set((state) => {
            if (!state.video) return state;
            if (!state.video.caption_settings) {
                state.video.caption_settings = getDefaultCaptionSettings()
            }

            const newCaptionSettings = { ...state.video.caption_settings, [key]: value }

            videoId = state.video.id
            captionSettings = newCaptionSettings

            return {
                video: {
                    ...state.video,
                    caption_settings: newCaptionSettings
                }
            }
        })

        if (persist && videoId && captionSettings) {
            const requestbody = {
                "video_id": videoId,
                "caption_settings": captionSettings
            }
            await baseApiClient.post(`/video/captions/update/`, requestbody)

        }

    },

    bulkUpdateCaptionSettings: async (captionSettings: CaptionStyleConfig) => {
        let videoId = null
        set((state) => {
            if (!state.video) return state;

            videoId = state.video.id

            return {
                video: {
                    ...state.video,
                    caption_settings: captionSettings
                }
            }
        })

        if (videoId && captionSettings) {
            const requestbody = {
                "video_id": videoId,
                "caption_settings": captionSettings
            }
            await baseApiClient.post(`/video/captions/update/`, requestbody)
        }
    },

    updateVideo: async (config: UpdateVideoReqConfig, persist: boolean = false): Promise<AxiosResponse | null> => {
        const videoId = get().video?.id
        if (!videoId) return null

        if (!persist) {
            set((state) => {
                if (!state.video) return state
                return {
                    video: {
                        ...state.video,
                        ...config
                    }
                }
            })
            return null
        }

        const response = await baseApiClient.patch(`/video/update/${videoId}/`, config)
        if (response.status === 200) {
            const video = response.data as VideoResponse
            const updatedVideo = get().prepareVideoForState(video)
            set({ video: updatedVideo })
        }
        return response
    }
})) 