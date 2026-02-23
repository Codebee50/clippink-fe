import { AnimationType } from "../types/video";
import { Easing, interpolate, spring, useVideoConfig } from "remotion";

export interface AnimationStyle {
  style: React.CSSProperties;
  showReflection?: boolean;
  reflectionStyle?: React.CSSProperties;
  overlayStyle?: React.CSSProperties;
}

// Smooth spring config for slide-ins
const SPRING_CONFIG = {
  damping: 18,
  stiffness: 120,
  mass: 0.8,
};

// Cinematic easing
const cinematic = Easing.bezier(0.25, 0.46, 0.45, 0.94);
const easeOutExpo = Easing.bezier(0.19, 1.0, 0.22, 1.0);
const easeInOutCubic = Easing.bezier(0.645, 0.045, 0.355, 1.0);

export const getAnimationStyle = (
  type: AnimationType,
  frame: number,
  startTime: number,
  duration: number,
  fps: number = 30
): AnimationStyle => {
  const relFrame = frame - startTime;

  switch (type) {
    case "none":
      return { style: {} };

    case "scrollUp": {
      const translateY = interpolate(
        frame,
        [startTime, startTime + duration],
        [4, -4],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: cinematic }
      );
      const scale = interpolate(
        frame,
        [startTime, startTime + duration * 0.5, startTime + duration],
        [1.25, 1.28, 1.25],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: cinematic }
      );
      return {
        style: { transform: `scale(${scale}) translateY(${translateY}%)` },
      };
    }

    case "scrollDown": {
      const translateY = interpolate(
        frame,
        [startTime, startTime + duration],
        [-4, 4],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: cinematic }
      );
      const scale = interpolate(
        frame,
        [startTime, startTime + duration * 0.5, startTime + duration],
        [1.25, 1.28, 1.25],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: cinematic }
      );
      return {
        style: { transform: `scale(${scale}) translateY(${translateY}%)` },
      };
    }

    case "scrollLeft": {
      const translateX = interpolate(
        frame,
        [startTime, startTime + duration],
        [6, -6],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: cinematic }
      );
      const scale = interpolate(
        frame,
        [startTime, startTime + duration],
        [1.25, 1.3],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: cinematic }
      );
      return {
        style: { transform: `scale(${scale}) translateX(${translateX}%)` },
      };
    }

    case "scrollRight": {
      const translateX = interpolate(
        frame,
        [startTime, startTime + duration],
        [-6, 6],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: cinematic }
      );
      const scale = interpolate(
        frame,
        [startTime, startTime + duration],
        [1.25, 1.3],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: cinematic }
      );
      return {
        style: { transform: `scale(${scale}) translateX(${translateX}%)` },
      };
    }

    case "zoomIn": {
      const scale = interpolate(
        frame,
        [startTime, startTime + duration],
        [1.0, 1.2],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: cinematic }
      );
      // Subtle drift for life
      const driftX = interpolate(
        frame,
        [startTime, startTime + duration],
        [0, 1.5],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: cinematic }
      );
      const brightness = interpolate(
        frame,
        [startTime, startTime + duration * 0.15, startTime + duration],
        [1.15, 1.0, 1.0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      );
      return {
        style: {
          transform: `scale(${scale}) translateX(${driftX}%)`,
          filter: `brightness(${brightness})`,
        },
      };
    }

    case "zoomOut": {
      const scale = interpolate(
        frame,
        [startTime, startTime + duration],
        [1.22, 1.0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: cinematic }
      );
      const driftX = interpolate(
        frame,
        [startTime, startTime + duration],
        [-1.5, 0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: cinematic }
      );
      const brightness = interpolate(
        frame,
        [startTime, startTime + duration * 0.1, startTime + duration],
        [1.2, 1.0, 1.0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      );
      return {
        style: {
          transform: `scale(${scale}) translateX(${driftX}%)`,
          filter: `brightness(${brightness})`,
        },
      };
    }

    case "diagonalUpLeft": {
      const tx = interpolate(frame, [startTime, startTime + duration], [5, -5], {
        extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: cinematic,
      });
      const ty = interpolate(frame, [startTime, startTime + duration], [4, -4], {
        extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: cinematic,
      });
      const scale = interpolate(frame, [startTime, startTime + duration], [1.28, 1.32], {
        extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: cinematic,
      });
      return { style: { transform: `scale(${scale}) translate(${tx}%, ${ty}%)` } };
    }

    case "diagonalUpRight": {
      const tx = interpolate(frame, [startTime, startTime + duration], [-5, 5], {
        extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: cinematic,
      });
      const ty = interpolate(frame, [startTime, startTime + duration], [4, -4], {
        extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: cinematic,
      });
      const scale = interpolate(frame, [startTime, startTime + duration], [1.28, 1.32], {
        extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: cinematic,
      });
      return { style: { transform: `scale(${scale}) translate(${tx}%, ${ty}%)` } };
    }

    case "diagonalDownLeft": {
      const tx = interpolate(frame, [startTime, startTime + duration], [5, -5], {
        extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: cinematic,
      });
      const ty = interpolate(frame, [startTime, startTime + duration], [-4, 4], {
        extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: cinematic,
      });
      const scale = interpolate(frame, [startTime, startTime + duration], [1.28, 1.32], {
        extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: cinematic,
      });
      return { style: { transform: `scale(${scale}) translate(${tx}%, ${ty}%)` } };
    }

    case "diagonalDownRight": {
      const tx = interpolate(frame, [startTime, startTime + duration], [-5, 5], {
        extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: cinematic,
      });
      const ty = interpolate(frame, [startTime, startTime + duration], [-4, 4], {
        extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: cinematic,
      });
      const scale = interpolate(frame, [startTime, startTime + duration], [1.28, 1.32], {
        extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: cinematic,
      });
      return { style: { transform: `scale(${scale}) translate(${tx}%, ${ty}%)` } };
    }

    case "kenBurnsUp": {
      // Classic Ken Burns: slow zoom + upward drift, cinematic crop feel
      const scale = interpolate(
        frame,
        [startTime, startTime + duration],
        [1.05, 1.35],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.linear }
      );
      const ty = interpolate(
        frame,
        [startTime, startTime + duration],
        [6, -6],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: cinematic }
      );
      // Slight horizontal drift for realism
      const tx = interpolate(
        frame,
        [startTime, startTime + duration],
        [-1.5, 1.5],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: cinematic }
      );
      return {
        style: { transform: `scale(${scale}) translate(${tx}%, ${ty}%)` },
      };
    }

    case "kenBurnsDown": {
      const scale = interpolate(
        frame,
        [startTime, startTime + duration],
        [1.35, 1.05],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.linear }
      );
      const ty = interpolate(
        frame,
        [startTime, startTime + duration],
        [-6, 6],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: cinematic }
      );
      const tx = interpolate(
        frame,
        [startTime, startTime + duration],
        [1.5, -1.5],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: cinematic }
      );
      return {
        style: { transform: `scale(${scale}) translate(${tx}%, ${ty}%)` },
      };
    }

    case "slideInLeft": {
      const progress = spring({
        frame: relFrame,
        fps,
        config: SPRING_CONFIG,
      });
      const translateX = interpolate(progress, [0, 1], [-105, 0]);
      // Motion blur effect: blur decreases as it settles
      const blurAmount = interpolate(progress, [0, 0.6, 1], [8, 2, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      // Slight brightness flash on entry
      const brightness = interpolate(progress, [0, 0.3, 1], [1.1, 1.05, 1.0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });

      return {
        style: {
          transform: `translateX(${translateX}%)`,
          filter: `blur(${blurAmount}px) brightness(${brightness})`,
        },
        showReflection: progress < 0.95,
        reflectionStyle: {
          transform: `translateX(${translateX}%) scaleX(-1)`,
          opacity: interpolate(progress, [0, 0.7, 1], [0.35, 0.1, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
          filter: `blur(${blurAmount * 1.5}px)`,
        },
      };
    }

    case "slideInRight": {
      const progress = spring({
        frame: relFrame,
        fps,
        config: SPRING_CONFIG,
      });
      const translateX = interpolate(progress, [0, 1], [105, 0]);
      const blurAmount = interpolate(progress, [0, 0.6, 1], [8, 2, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      const brightness = interpolate(progress, [0, 0.3, 1], [1.1, 1.05, 1.0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });

      return {
        style: {
          transform: `translateX(${translateX}%)`,
          filter: `blur(${blurAmount}px) brightness(${brightness})`,
        },
        showReflection: progress < 0.95,
        reflectionStyle: {
          transform: `translateX(${translateX}%) scaleX(-1)`,
          opacity: interpolate(progress, [0, 0.7, 1], [0.35, 0.1, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
          filter: `blur(${blurAmount * 1.5}px)`,
        },
      };
    }

    case "slideInTop": {
      const progress = spring({
        frame: relFrame,
        fps,
        config: SPRING_CONFIG,
      });
      const translateY = interpolate(progress, [0, 1], [-105, 0]);
      const blurAmount = interpolate(progress, [0, 0.6, 1], [8, 2, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      const brightness = interpolate(progress, [0, 0.3, 1], [1.1, 1.05, 1.0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });

      return {
        style: {
          transform: `translateY(${translateY}%)`,
          filter: `blur(${blurAmount}px) brightness(${brightness})`,
        },
        showReflection: progress < 0.95,
        reflectionStyle: {
          transform: `translateY(${translateY}%) scaleY(-1)`,
          opacity: interpolate(progress, [0, 0.7, 1], [0.35, 0.1, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
          filter: `blur(${blurAmount * 1.5}px)`,
        },
      };
    }

    case "slideInBottom": {
      const progress = spring({
        frame: relFrame,
        fps,
        config: SPRING_CONFIG,
      });
      const translateY = interpolate(progress, [0, 1], [105, 0]);
      const blurAmount = interpolate(progress, [0, 0.6, 1], [8, 2, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
      const brightness = interpolate(progress, [0, 0.3, 1], [1.1, 1.05, 1.0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });

      return {
        style: {
          transform: `translateY(${translateY}%)`,
          filter: `blur(${blurAmount}px) brightness(${brightness})`,
        },
        showReflection: progress < 0.95,
        reflectionStyle: {
          transform: `translateY(${translateY}%) scaleY(-1)`,
          opacity: interpolate(progress, [0, 0.7, 1], [0.35, 0.1, 0], {
            extrapolateLeft: "clamp", extrapolateRight: "clamp",
          }),
          filter: `blur(${blurAmount * 1.5}px)`,
        },
      };
    }

    default:
      return { style: {} };
  }
};