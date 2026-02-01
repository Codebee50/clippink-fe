// lib/types/captions.ts
export type CaptionStyle = 
  | 'clean' | 'bold_outline' | 'neon_glow' | 'double_shadow' 
  | 'soft_float' | 'hard_edge' | 'gradient_pop' | 'deep_3d'
  | 'glass_blur' | 'retro_stripes' | 'comic_burst' | 'fire_burn'
  | 'ice_frost' | 'gold_luxury' | 'cyber_tech' | 'rainbow_shift'
  | 'minimal_pop' | 'heavy_drop' | 'neon_outline' | 'vintage_tv'
  | 'bubblegum' | 'metal_chrome' | 'paper_cut' | 'electric_pulse';


export interface CaptionStyleConfig {
  // Visual styling only - NO font family here
  fontSize: number;
  fontWeight: string | number;
  color: string;
  backgroundColor?: string;
  textShadow?: string;
  padding?: string;
  borderRadius?: string;
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  letterSpacing?: string;
  highlightColor: string;
  highlightBackgroundColor?: string;
  border?: string;
  backdropFilter?: string;
  outline?: string;
  WebkitTextStroke?: string;
  filter?: string;
  highlightWordColor?: string;
  dormantTextColor?: string;
}

export interface FontConfig {
  fontFamily: string;
  googleFontName: string;
  weights: number[];
}

