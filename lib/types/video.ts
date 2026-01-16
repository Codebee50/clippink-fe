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
  scenes: Scene[];
}
