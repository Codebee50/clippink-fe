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

export interface Scene {
  order_number: number;
  media_type: string;
  video_id: string;
  narration: string;
  duration_seconds: number;
  mood: string;
  audio_file_key: string;
  image_file_key: string;
  video_file_key: string | null;
  captions: Caption[];
  id: string;
  visual_prompt: string;
  audio_url: string;
  image_url: string | null;
  video_url: string | null;
  audio_duration_seconds: number;
}

export interface VideoResponse {
  created_at: string;
  status: string;
  final_audio_key: string;
  script: string;
  id: string;
  updated_at: string;
  final_audio_url: string;
  thumbnail_url: string | null;
  title: string | null;
  scenes: Scene[];
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