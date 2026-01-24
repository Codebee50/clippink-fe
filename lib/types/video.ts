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

export interface VideoResponse {
  created_at: string;
  status: string;
  final_audio_key?: string | null;
  script: string;
  id: string;
  updated_at: string;
  final_audio_url?: string | null;
  thumbnail_url: string | null;
  title: string | null;
  scenes: Scene[];
  last_changed_at?: string | null;
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


export type NarratorsVoiceResponse = {
  voice_id: string;
  name: string
  description: string;
  preview_url: string;
  gradient_avatar: string | null | undefined
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

export type VideoWsProgressMessageBody = {
  type: "scene_audio_generated" | "scene_image_generated" | "scenes_generated" | "completed" | "failed";
  progress?:number,
  payload: SceneGeneratedPayload | SceneAudioGeneratedPayload | SceneImageGeneratedPayload
}


