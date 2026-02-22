export type PlatformVideoInfoPreview = {
    video_id: string;
    thumbnail: string | null,
    duration: number;
    platform: string;
    webpage_url: string;
    title: string;
    description: string | null
}

export type ShortClip = {
    id: string;
    title: string;
    description: string;
    tags: string[];
    end_time: number;
    start_time: number;
    duration: number;
    s3_key: string;
    clip_url: string;
    virality_reason: string;
    virality_score: number;
}

export type ClippedVideoStatus = "pending" | 'processing' | "completed" | 'failed'

export type ClippedVideo = {
    video_url: string;
    ext_video_id: string;
    status: ClippedVideoStatus;
    platform: string;
    title: string;
    id: string
}

export type ProgressUpdateWsPayload = {
    progress_delta: number;
    message: string;
}

export type TextMessageWsPayload = {
    message: string
}


export type ClipGeneratedPayload = {
    message : string | null;
    progress_delta: number
    clip: ShortClip 
}

export type VideoClippingTaskUpdateWsBody = {
    type: 'progress_update' | 'completed' | 'failed' | 'clip_generated' | "text_notification";
    payload: ProgressUpdateWsPayload | TextMessageWsPayload | ClipGeneratedPayload;
    progress: number | undefined
}