import { AnimationType } from "../types/video";
import { Easing, interpolate } from "remotion";


interface AnimationStyle {
  style: React.CSSProperties;
  showReflection?: boolean;
  reflectionStyle?: React.CSSProperties;
}

export const getAnimationStyle = (
  type: AnimationType,
  frame: number,
  startTime: number,
  duration: number
): AnimationStyle => {
  
  switch (type) {
    case 'none':
      return {
        style: { transform: 'scale(1)' }
      };
      
    case 'scrollUp': {
      const translateYUp = interpolate(frame, [startTime, startTime + duration], [6, -6], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.ease,
      });
      return {
        style: { transform: `scale(1.3) translateY(${translateYUp}%)` }
      };
    }
      
    case 'scrollDown': {
      const translateYDown = interpolate(frame, [startTime, startTime + duration], [-6, 6], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.ease,
      });
      return {
        style: { transform: `scale(1.3) translateY(${translateYDown}%)` }
      };
    }
      
    case 'scrollLeft': {
      const translateXLeft = interpolate(frame, [startTime, startTime + duration], [6, -6], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.ease,
      });
      return {
        style: { transform: `scale(1.3) translateX(${translateXLeft}%)` }
      };
    }
      
    case 'scrollRight': {
      const translateXRight = interpolate(frame, [startTime, startTime + duration], [-6, 6], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.ease,
      });
      return {
        style: { transform: `scale(1.3) translateX(${translateXRight}%)` }
      };
    }
      
    case 'zoomIn': {
      const scaleIn = interpolate(frame, [startTime, startTime + duration], [1, 1.4], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.ease,
      });
      return {
        style: { transform: `scale(${scaleIn})` }
      };
    }
      
    case 'zoomOut': {
      const scaleOut = interpolate(frame, [startTime, startTime + duration], [1.4, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.ease,
      });
      return {
        style: { transform: `scale(${scaleOut})` }
      };
    }
      
    case 'diagonalUpLeft': {
      const dulTranslateX = interpolate(frame, [startTime, startTime + duration], [6, -6], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.ease,
      });
      const dulTranslateY = interpolate(frame, [startTime, startTime + duration], [6, -6], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.ease,
      });
      return {
        style: { transform: `scale(1.3) translate(${dulTranslateX}%, ${dulTranslateY}%)` }
      };
    }
      
    case 'diagonalUpRight': {
      const durTranslateX = interpolate(frame, [startTime, startTime + duration], [-6, 6], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.ease,
      });
      const durTranslateY = interpolate(frame, [startTime, startTime + duration], [6, -6], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.ease,
      });
      return {
        style: { transform: `scale(1.3) translate(${durTranslateX}%, ${durTranslateY}%)` }
      };
    }
      
    case 'diagonalDownLeft': {
      const ddlTranslateX = interpolate(frame, [startTime, startTime + duration], [6, -6], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.ease,
      });
      const ddlTranslateY = interpolate(frame, [startTime, startTime + duration], [-6, 6], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.ease,
      });
      return {
        style: { transform: `scale(1.3) translate(${ddlTranslateX}%, ${ddlTranslateY}%)` }
      };
    }
      
    case 'diagonalDownRight': {
      const ddrTranslateX = interpolate(frame, [startTime, startTime + duration], [-6, 6], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.ease,
      });
      const ddrTranslateY = interpolate(frame, [startTime, startTime + duration], [-6, 6], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.ease,
      });
      return {
        style: { transform: `scale(1.3) translate(${ddrTranslateX}%, ${ddrTranslateY}%)` }
      };
    }
      
    case 'kenBurnsUp': {
      const kbuScale = interpolate(frame, [startTime, startTime + duration], [1, 1.3], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.ease,
      });
      const kbuTranslateY = interpolate(frame, [startTime, startTime + duration], [5, -5], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.ease,
      });
      return {
        style: { transform: `scale(${kbuScale}) translateY(${kbuTranslateY}%)` }
      };
    }
      
    case 'kenBurnsDown': {
      const kbdScale = interpolate(frame, [startTime, startTime + duration], [1, 1.3], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.ease,
      });
      const kbdTranslateY = interpolate(frame, [startTime, startTime + duration], [-5, 5], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.ease,
      });
      return {
        style: { transform: `scale(${kbdScale}) translateY(${kbdTranslateY}%)` }
      };
    }
      
    case 'slideInLeft': {
      const translateX = interpolate(frame, [startTime, startTime + duration * 0.3], [-100, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
      });
      
      const reflectionOpacity = interpolate(frame, [startTime, startTime + duration * 0.3], [0.4, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.ease,
      });
      
      return {
        style: { transform: `translateX(${translateX}%)` },
        showReflection: translateX < 0,
        reflectionStyle: {
          transform: `translateX(${translateX}%) scaleX(-1)`,
          opacity: reflectionOpacity,
          filter: 'blur(1px)',
        }
      };
    }
      
    case 'slideInRight': {


      const translateX = interpolate(frame, [startTime, startTime + duration * 0.3], [100, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
      });
      
      const reflectionOpacity = interpolate(frame, [startTime, startTime + duration * 0.3], [0.4, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.ease,
      });
      
      return {
        style: { transform: `translateX(${translateX}%)` },
        showReflection: translateX > 0,
        reflectionStyle: {
          transform: `translateX(${translateX}%) scaleX(-1)`,
          opacity: reflectionOpacity,
          filter: 'blur(1px)',
        }
      };
    }
      
    case 'slideInTop': {
      const translateY = interpolate(frame, [startTime, startTime + duration * 0.3], [-100, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
      });
      
      const reflectionOpacity = interpolate(frame, [startTime, startTime + duration * 0.3], [0.4, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.ease,
      });
      
      return {
        style: { transform: `translateY(${translateY}%)` },
        showReflection: translateY < 0,
        reflectionStyle: {
          transform: `translateY(${translateY}%) scaleY(-1)`,
          opacity: reflectionOpacity,
          filter: 'blur(1px)',
        }
      };
    }
      
    case 'slideInBottom': {
      const translateY = interpolate(frame, [startTime, startTime + duration * 0.3], [100, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.cubic),
      });
      
      const reflectionOpacity = interpolate(frame, [startTime, startTime + duration * 0.3], [0.4, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.ease,
      });
      
      return {
        style: { transform: `translateY(${translateY}%)` },
        showReflection: translateY > 0,
        reflectionStyle: {
          transform: `translateY(${translateY}%) scaleY(-1)`,
          opacity: reflectionOpacity,
          filter: 'blur(1px)',
        }
      };
    }
      
    default:
      return {
        style: { transform: 'scale(1)' }
      };
  }
};