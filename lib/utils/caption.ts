import { CaptionStyle, CaptionStyleConfig } from "../types/captions"
import { FontConfig } from "../types/captions";




// Font library - completely separate
export const CAPTION_FONTS: Record<string, FontConfig> = {
    inter: {
      fontFamily: "'Inter', sans-serif",
      googleFontName: 'Inter',
      weights: [400, 600, 700, 800, 900],
    },
    bebas: {
      fontFamily: "'Bebas Neue', sans-serif",
      googleFontName: 'Bebas Neue',
      weights: [400],
    },
    poppins: {
      fontFamily: "'Poppins', sans-serif",
      googleFontName: 'Poppins',
      weights: [400, 600, 700, 800, 900],
    },
    montserrat: {
      fontFamily: "'Montserrat', sans-serif",
      googleFontName: 'Montserrat',
      weights: [400, 600, 700, 800, 900],
    },
    roboto: {
      fontFamily: "'Roboto', sans-serif",
      googleFontName: 'Roboto',
      weights: [400, 500, 700, 900],
    },
    oswald: {
      fontFamily: "'Oswald', sans-serif",
      googleFontName: 'Oswald',
      weights: [400, 500, 600, 700],
    },
    nunito: {
      fontFamily: "'Nunito', sans-serif",
      googleFontName: 'Nunito',
      weights: [400, 600, 700, 800, 900],
    },
    raleway: {
      fontFamily: "'Raleway', sans-serif",
      googleFontName: 'Raleway',
      weights: [400, 600, 700, 800, 900],
    },
    quicksand: {
      fontFamily: "'Quicksand', sans-serif",
      googleFontName: 'Quicksand',
      weights: [400, 500, 600, 700],
    },
    rubik: {
      fontFamily: "'Rubik', sans-serif",
      googleFontName: 'Rubik',
      weights: [400, 500, 600, 700, 800, 900],
    },
    lato: {
      fontFamily: "'Lato', sans-serif",
      googleFontName: 'Lato',
      weights: [400, 700, 900],
    },
    opensans: {
      fontFamily: "'Open Sans', sans-serif",
      googleFontName: 'Open Sans',
      weights: [400, 600, 700, 800],
    },
    playfair: {
      fontFamily: "'Playfair Display', serif",
      googleFontName: 'Playfair Display',
      weights: [400, 600, 700, 800, 900],
    },
    merriweather: {
      fontFamily: "'Merriweather', serif",
      googleFontName: 'Merriweather',
      weights: [400, 700, 900],
    },
    sourcesans: {
      fontFamily: "'Source Sans 3', sans-serif",
      googleFontName: 'Source Sans 3',
      weights: [400, 600, 700, 800, 900],
    },
    worksans: {
      fontFamily: "'Work Sans', sans-serif",
      googleFontName: 'Work Sans',
      weights: [400, 600, 700, 800, 900],
    },
    dmserif: {
      fontFamily: "'DM Serif Display', serif",
      googleFontName: 'DM Serif Display',
      weights: [400],
    },
    anton: {
      fontFamily: "'Anton', sans-serif",
      googleFontName: 'Anton',
      weights: [400],
    },
    lilitaone: {
      fontFamily: "'Lilita One', cursive",
      googleFontName: 'Lilita One',
      weights: [400],
    },
    bangers: {
      fontFamily: "'Bangers', cursive",
      googleFontName: 'Bangers',
      weights: [400],
    },
    pacifico: {
      fontFamily: "'Pacifico', cursive",
      googleFontName: 'Pacifico',
      weights: [400],
    },
    fredokab: {
      fontFamily: "'Fredoka One', cursive",
      googleFontName: 'Fredoka One',
      weights: [400],
    },
    dancing: {
      fontFamily: "'Dancing Script', cursive",
      googleFontName: 'Dancing Script',
      weights: [400, 500, 600, 700],
    },
    caveat: {
      fontFamily: "'Caveat', cursive",
      googleFontName: 'Caveat',
      weights: [400, 500, 600, 700],
    },
    fira: {
      fontFamily: "'Fira Sans', sans-serif",
      googleFontName: 'Fira Sans',
      weights: [400, 500, 600, 700, 800, 900],
    },
    exo: {
      fontFamily: "'Exo 2', sans-serif",
      googleFontName: 'Exo 2',
      weights: [400, 500, 600, 700, 800, 900],
    },
    mplus: {
      fontFamily: "'M PLUS Rounded 1c', sans-serif",
      googleFontName: 'M PLUS Rounded 1c',
      weights: [400, 500, 700, 800, 900],
    },
    barlow: {
      fontFamily: "'Barlow', sans-serif",
      googleFontName: 'Barlow',
      weights: [400, 500, 600, 700, 800, 900],
    },
    orbitron: {
      fontFamily: "'Orbitron', sans-serif",
      googleFontName: 'Orbitron',
      weights: [400, 500, 600, 700, 800, 900],
    },
    sigmar: {
      fontFamily: "'Sigmar One', cursive",
      googleFontName: 'Sigmar One',
      weights: [400],
    },
    ubuntu: {
      fontFamily: "'Ubuntu', sans-serif",
      googleFontName: 'Ubuntu',
      weights: [400, 500, 700],
    },
    josefin: {
      fontFamily: "'Josefin Sans', sans-serif",
      googleFontName: 'Josefin Sans',
      weights: [400, 500, 600, 700],
    },
    pressstart: {
      fontFamily: "'Press Start 2P', cursive",
      googleFontName: 'Press Start 2P',
      weights: [400],
    },
  }
  
  // Pure visual styles - NO fonts included
  export const CAPTION_STYLES: Record<CaptionStyle, CaptionStyleConfig> = {
    // Simple, elegant shadow
    clean: {
      fontSize: 1,
      fontWeight: '700',
      color: 'white',
      textShadow: '0.08em 0.08em 0.12em rgba(0,0,0,0.9), 0.12em 0.12em 0.18em rgba(0,0,0,0.7), 0.16em 0.16em 0.24em rgba(0,0,0,0.5)',
      highlightColor: '#FDE047',
    },
  
    // Thick black outline around letters
    bold_outline: {
      fontSize: 1.1,
      fontWeight: '900',
      color: 'white',
      textShadow: '.12em .12em .1em #000, .12em -.12em .1em #000, -.12em .12em .1em #000, -.12em -.12em .1em #000, .18em .18em .15em #000, .18em -.18em .15em #000, -.18em .18em .15em #000, -.18em -.18em .15em #000, .24em .24em .2em #000, .24em -.24em .2em #000, -.24em .24em .2em #000, -.24em -.24em .2em #000',
      textTransform: 'uppercase',
      highlightColor: '#FCD34D',
    },
  
    // Bright neon glow effect
    neon_glow: {
      fontSize: 1.15,
      fontWeight: '800',
      color: '#06FFA5',
      textShadow: '0 0 .08em #06FFA5, 0 0 .12em #06FFA5, 0 0 .16em #06FFA5, 0 0 .2em #06FFA5, 0 0 .28em #06FFA5, 0 0 .36em #06FFA5, 0 0 .48em #06FFA5, .08em .08em .15em rgba(0,0,0,0.8)',
      highlightColor: '#FF006E',
    },
  
    // Two-tone offset shadow (3D effect)
    double_shadow: {
      fontSize: 1.2,
      fontWeight: '900',
      color: 'white',
      textShadow: '.1em .1em 0 #FF006E, .15em .15em 0 #FF006E, .2em .2em 0 #FF006E, .25em .25em 0 #3A86FF, .3em .3em 0 #3A86FF, .35em .35em 0 #3A86FF, .4em .4em .3em rgba(0,0,0,0.8)',
      textTransform: 'uppercase',
      highlightColor: '#FFBE0B',
    },
  
    // Soft floating appearance
    soft_float: {
      fontSize: 1,
      fontWeight: '600',
      color: 'white',
      textShadow: '0 0.05em 0.15em rgba(0,0,0,0.3), 0 0.1em 0.25em rgba(0,0,0,0.25), 0 0.15em 0.35em rgba(0,0,0,0.2), 0 0.2em 0.45em rgba(0,0,0,0.15), 0 0.25em 0.55em rgba(0,0,0,0.1)',
      highlightColor: '#A78BFA',
    },
  
    // Sharp, crisp edges with hard shadow
    hard_edge: {
      fontSize: 1.1,
      fontWeight: '800',
      color: '#FEF08A',
      textShadow: '.08em .08em 0 #DC2626, .16em .16em 0 #DC2626, .24em .24em 0 #7F1D1D, .32em .32em 0 #450A0A, .4em .4em 0 #000',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      highlightColor: 'white',
    },
  
    // Box with gradient-like layered shadows
    gradient_pop: {
      fontSize: 1,
      fontWeight: '700',
      color: 'white',
      backgroundColor: 'rgba(0,0,0,0.7)',
      padding: '14px 10px',
      borderRadius: '20px',
      textShadow: '0 0 .1em rgba(255,255,255,0.5), 0 0 .2em rgba(255,255,255,0.3), 0 0 .3em rgba(255,255,255,0.2)',
      highlightColor: '#F472B6',
    },
  
    // Deep 3D extrusion effect
    deep_3d: {
      fontSize: 1.2,
      fontWeight: '900',
      color: '#60A5FA',
      textShadow: '.04em .04em 0 #3B82F6, .08em .08em 0 #2563EB, .12em .12em 0 #1D4ED8, .16em .16em 0 #1E40AF, .2em .2em 0 #1E3A8A, .24em .24em 0 #172554, .28em .28em 0 #0F172A, .32em .32em .2em #000, .36em .36em .3em rgba(0,0,0,0.6)',
      highlightColor: '#FDE047',
    },
  
    // Frosted glass effect with blur
    glass_blur: {
      fontSize: 1,
      fontWeight: '700',
      color: 'white',
      backgroundColor: 'rgba(255,255,255,0.15)',
      backdropFilter: 'blur(16px) saturate(180%)',
      padding: '16px 32px',
      borderRadius: '24px',
      border: '2px solid rgba(255,255,255,0.3)',
      textShadow: '0 0.05em 0.1em rgba(0,0,0,0.3), 0 0 .2em rgba(255,255,255,0.5)',
      highlightColor: '#FBBF24',
    },
  
    // Retro TV scan lines effect
    retro_stripes: {
      fontSize: 1.1,
      fontWeight: '800',
      color: '#10B981',
      backgroundColor: 'rgba(0,0,0,0.85)',
      // padding: '12px 24px',
      borderRadius: '8px',
      textShadow: '0 0 .1em #10B981, 0 0 .2em #10B981, 0 0 .3em #059669, 0.08em 0.08em .15em #000, -0.04em 0.04em .1em #10B981',
      highlightColor: '#FDE047',
    },
  
    // Comic book style with multiple outlines
    comic_burst: {
      fontSize: 1.25,
      fontWeight: '900',
      color: '#FEF08A',
      textShadow: '.08em .08em 0 #000, -.08em -.08em 0 #000, .08em -.08em 0 #000, -.08em .08em 0 #000, .12em .12em 0 #DC2626, -.12em -.12em 0 #DC2626, .12em -.12em 0 #DC2626, -.12em .12em 0 #DC2626, .18em .18em 0 #7F1D1D, .24em .24em .2em #000',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      highlightColor: '#06FFA5',
    },
  
    // Fire/burning effect with orange/red glow
    fire_burn: {
      fontSize: 1.15,
      fontWeight: '800',
      color: '#FEF08A',
      textShadow: '0 0 .08em #FBBF24, 0 0 .15em #F59E0B, 0 0 .22em #F59E0B, 0 0 .3em #EF4444, 0 0 .38em #EF4444, 0 0 .46em #DC2626, 0 0 .54em #DC2626, .1em .1em .2em #7F1D1D, .15em .15em .3em #000',
      highlightColor: 'white',
    },
  
    // Icy/frozen effect with blue glow
    ice_frost: {
      fontSize: 1.1,
      fontWeight: '700',
      color: '#DBEAFE',
      textShadow: '0 0 .08em #93C5FD, 0 0 .15em #60A5FA, 0 0 .22em #3B82F6, 0 0 .3em #2563EB, 0 0 .38em #1D4ED8, .08em .08em .15em rgba(30,58,138,0.8), .12em .12em .25em rgba(0,0,0,0.6)',
      highlightColor: '#FCD34D',
    },
  
    // Luxury gold effect
    gold_luxury: {
      fontSize: 1.1,
      fontWeight: '800',
      color: '#FEF3C7',
      textShadow: '.06em .06em .08em #92400E, .1em .1em .12em #78350F, .14em .14em .16em #451A03, 0 0 .15em #FBBF24, 0 0 .25em #F59E0B, 0 0 .35em #D97706, 0 0 .45em #B45309',
      letterSpacing: '0.06em',
      highlightColor: 'white',
    },
  
    // Cyberpunk tech style
    cyber_tech: {
      fontSize: 1.15,
      fontWeight: '900',
      color: '#06FFA5',
      textShadow: '.08em .08em 0 #FF006E, -.08em -.08em 0 #3A86FF, .12em .12em 0 #FF006E, -.12em -.12em 0 #3A86FF, 0 0 .2em #06FFA5, 0 0 .3em #06FFA5, 0 0 .4em #FF006E, .15em .15em .3em rgba(0,0,0,0.8)',
      textTransform: 'uppercase',
      highlightColor: '#FFBE0B',
    },
  
    // Rainbow gradient outline
    rainbow_shift: {
      fontSize: 1.2,
      fontWeight: '900',
      color: 'white',
      textShadow: '.08em .08em 0 #FF006E, .12em .12em 0 #FB5607, .16em .16em 0 #FFBE0B, .2em .2em 0 #06FFA5, .24em .24em 0 #8338EC, .28em .28em 0 #3A86FF, .32em .32em .25em #000, .36em .36em .35em rgba(0,0,0,0.7)',
      textTransform: 'uppercase',
      highlightColor: '#FCD34D',
    },
  
    // Minimal with subtle pop
    minimal_pop: {
      fontSize: 1,
      fontWeight: '700',
      color: 'white',
      textShadow: '0.06em 0.06em 0.1em rgba(0,0,0,0.8), 0.1em 0.1em 0.15em rgba(0,0,0,0.6)',
      highlightColor: '#60A5FA',
      highlightBackgroundColor: 'rgba(96,165,250,0.2)',
    },
  
    // Heavy drop shadow
    heavy_drop: {
      fontSize: 1.15,
      fontWeight: '800',
      color: 'white',
      textShadow: '.15em .15em 0 rgba(0,0,0,0.3), .3em .3em 0 rgba(0,0,0,0.25), .45em .45em 0 rgba(0,0,0,0.2), .6em .6em 0 rgba(0,0,0,0.15), .75em .75em 0 rgba(0,0,0,0.1), .9em .9em .5em rgba(0,0,0,0.5)',
      highlightColor: '#FB923C',
    },
  
    // Neon outline only (hollow letters)
    neon_outline: {
      fontSize: 1.2,
      fontWeight: '900',
      color: 'transparent',
      WebkitTextStroke: '0.06em #FF006E',
      textShadow: '0 0 .1em #FF006E, 0 0 .2em #FF006E, 0 0 .3em #FF006E, 0 0 .4em #FF006E, 0 0 .5em #FF006E, .08em .08em .15em rgba(0,0,0,0.8)',
      textTransform: 'uppercase',
      highlightColor: '#06FFA5',
    },
  
    // Old TV/VHS effect
    vintage_tv: {
      fontSize: 1,
      fontWeight: '800',
      color: '#FDE047',
      textShadow: '0.04em 0 0 #FF006E, -0.04em 0 0 #06FFA5, 0.08em 0 0 #FF006E, -0.08em 0 0 #06FFA5, 0 0 .15em rgba(0,0,0,0.8), 0 0 .25em rgba(0,0,0,0.6)',
      backgroundColor: 'rgba(0,0,0,0.7)',
      padding: '12px 24px',
      borderRadius: '6px',
      highlightColor: 'white',
    },
  
    // Bubblegum pop style
    bubblegum: {
      fontSize: 1.1,
      fontWeight: '800',
      color: '#1F2937',
      backgroundColor: '#FDE047',
      padding: '12px 24px',
      borderRadius: '28px',
      border: '4px solid #1F2937',
      textShadow: '0.06em 0.06em 0 rgba(255,255,255,0.8), 0.1em 0.1em 0 rgba(0,0,0,0.2)',
      highlightColor: '#EC4899',
    },
  
    // Metallic chrome effect
    metal_chrome: {
      fontSize: 1.15,
      fontWeight: '900',
      color: '#F3F4F6',
      textShadow: '.04em .04em .06em #6B7280, .08em .08em .1em #4B5563, .12em .12em .14em #374151, .16em .16em .18em #1F2937, 0 0 .1em rgba(255,255,255,0.5), 0 0 .2em rgba(255,255,255,0.3)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      highlightColor: '#FBBF24',
    },
  
    // Paper cut / layered effect
    paper_cut: {
      fontSize: 1.1,
      fontWeight: '800',
      color: '#FEF3C7',
      textShadow: '.05em .05em 0 #FBBF24, .1em .1em 0 #F59E0B, .15em .15em 0 #D97706, .2em .2em 0 #B45309, .25em .25em 0 #92400E, .3em .3em .2em rgba(0,0,0,0.5)',
      highlightColor: 'white',
    },
  
    // Electric pulse effect
    electric_pulse: {
      fontSize: 1.15,
      fontWeight: '900',
      color: '#DBEAFE',
      textShadow: '0 0 .06em #60A5FA, 0 0 .12em #60A5FA, 0 0 .18em #3B82F6, 0 0 .24em #3B82F6, 0 0 .32em #2563EB, 0 0 .4em #2563EB, 0 0 .5em #1D4ED8, .1em .1em .2em rgba(0,0,0,0.8), -.05em -.05em .15em #60A5FA, .05em .05em .15em #60A5FA',
      textTransform: 'uppercase',
      highlightColor: '#FDE047',
    },
  };


  export const getDefaultCaptionSettings = (): CaptionStyleConfig => {
    return {
        ...CAPTION_STYLES.clean,
        highlightWordColor: '#FDE047',
        dormantTextColor: '#FFFFFF',
    }
}