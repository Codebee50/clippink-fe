import { CaptionStyleConfig } from "./captions";

export interface Word {
  end: number;
  text: string;
  start: number;
}

export interface Caption {
  end: number;
  text: string;
  start: number;
  words: Word[];
}

export type AnimationType =
  | 'none'
  | 'scrollUp'
  | 'scrollDown'
  | 'scrollLeft'
  | 'scrollRight'
  | 'zoomIn'
  | 'zoomOut'
  | 'diagonalUpLeft'
  | 'diagonalUpRight'
  | 'diagonalDownLeft'
  | 'diagonalDownRight'
  | 'kenBurnsUp'
  | 'kenBurnsDown'
  | 'slideInLeft'
  | 'slideInRight'
  | 'slideInTop'
  | 'slideInBottom';

export type MotionEffect = {
  displayName: string;
  value: AnimationType;
}

export interface Scene {
  order_number: number;
  media_type: string;
  video_id: string;
  narration: string;
  duration_seconds?: number | null;
  mood: string;
  audio_file_key?: string | null;
  image_file_key?: string | null;
  video_file_key?: string | null;
  captions: Caption[] | null;
  id: string;
  visual_prompt: string;
  audio_url?: string | null;
  image_url: string | null;
  video_url?: string | null;
  audio_duration_seconds?: number | null;
  motion_effect: AnimationType | null
}

export type BackgroundAudio = {
  id: string;
  name: string;
  url: string;
  file_name: string
  is_public: boolean

}

export type VideoStatus = "pending" | 'processing' | "completed" | 'failed'


export interface VideoResponse {
  created_at: string;
  status: VideoStatus;
  final_audio_key?: string | null;
  script: string;
  id: string;
  updated_at: string;
  final_audio_url?: string | null;
  thumbnail_url: string | null;
  title: string | null;
  scenes: Scene[];
  last_changed_at?: string | null;
  caption_settings: CaptionStyleConfig | null
  background_audio: BackgroundAudio | null
  background_audio_volume: number | null //value between 0 and 1
}

export type UpdateVideoReqConfig = {
  background_audio_id?: string | null,
  background_audio_volume?: number | null,
  title?: string | null
}

export type VideoStyleResponse = {
  id: string;
  name: string;
  preview_url: string;
};
export type BackgroundMusicResponse = {
  id: string;
  name: string;
  description: string;
  updated_at: string;
  file_name: string | null;
  url: string;
  created_at: string;
  s3_key: string | null;
  is_public: boolean | null;
};


export type NarratorVoiceLabels = {
  use_case: string;
  gender: string;
  accent: string;
  age: string;
  language: string;
  descriptive: string;
};

export type NarratorsVoiceResponse = {
  voice_id: string;
  name: string
  description: string;
  preview_url: string;
  gradient_avatar: string | null | undefined
  labels: NarratorVoiceLabels
}


export type ScriptToVideoReqConfig = {
  script: string | null;
  background_audio_id: string | null;
  voice_id: string | null;
  image_style_preset_id: string | null;
}

export type TextToVideoReqConfig = {
  script: string | null;
  video_style_id: string | null;
  background_audio_id: string | null;
  voice_id: string | null;
}

export type VideoCreateReqConfig = ScriptToVideoReqConfig | TextToVideoReqConfig;

export type VideoCreateReqBody = {
  type: "script-to-video" | "text-to-video";
  config: VideoCreateReqConfig;
}


export type SceneGeneratedPayload = {
  progress: number,
  scenes: Scene[]
}

export type SceneAudioGeneratedPayload = {
  audio: {
    audio_file_key: string,
    audio_url: string,
    captions: Caption[],
    duration_seconds: number
  },
  scene: Scene
}

export type SceneImageGeneratedPayload = {
  image: {
    image_file_key: string,
    image_url: string
  },
  scene: Scene
}

export type SceneImageGenerationFailedPayload = {
  scene_id: string,
  error: string
}

export type SceneAnimationSuccessfulPayload = {
  scene: Scene,
  video: {
    video_file_key: string,
    video_url: string
  }
}

export type VideoUpdateMessageBody = {
  type: "scene_audio_generated" | "scene_image_generated" | "scenes_generated" | "completed" | "failed" | "scene_image_generation_failed" | "scene_animation_successful";
  progress?: number,
  payload: SceneGeneratedPayload | SceneAudioGeneratedPayload | SceneImageGeneratedPayload | SceneImageGenerationFailedPayload | SceneAnimationSuccessfulPayload
}

export type ExportedVideo = {
  url: string;
  render_id: string | null;
  bucket_name: string | null;
  created_at: string
  updated_at: string
}

export type VideoWsExportStartedPayload = {
  render_id: string;
  bucket_name: string
}

export type VideoWsExportFailedPayload = {
  render_id: string,
  bucket_name: string;
  errors: Record<string, string>[],
  video_id: string
}

export type VideoWsExportCompletedPayload = {
  render_id: string,
  bucket_name: string;
  video_id: string;
  url: string;
  exported_video: ExportedVideo
}

export type VideoWsExportProgressUpdatePayload = {
  progress: number;
  render_id: string;
  video_id: string
}

export type VideoWsExportProgressMessageBody = {
  type: 'video_export_started' | "video_export_completed" | "video_export_failed" | "_update";
  progress: number | undefined | null;
  payload: VideoWsExportStartedPayload | VideoWsExportCompletedPayload | VideoWsExportFailedPayload | VideoWsExportProgressUpdatePayload
}


