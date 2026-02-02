export const loadGoogleFont = (fontFamily: string, weights: number[] = [400, 700]) => {
  // Only run in browser environment
  if (typeof window === 'undefined') return;
  
  import('webfontloader').then((WebFont) => {
    WebFont.default.load({
      google: {
        families: [`${fontFamily}:${weights.join(',')}`]
      }
    });
  });
};