// lib/utils/fonts.ts
import WebFont from 'webfontloader';

export const loadGoogleFont = (fontFamily: string, weights: number[] = [400, 700]) => {
  WebFont.load({
    google: {
      families: [`${fontFamily}:${weights.join(',')}`]
    }
  });
};

