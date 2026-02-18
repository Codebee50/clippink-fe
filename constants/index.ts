import { MotionEffect } from "@/lib/types/video";

export const appConfig = {
  APP_NAME: "getclip",
  APP_SHORT_NAME: "getclip",
  APP_DESCRIPTION:
    "Create viral faceless videos with AI. Post daily without burnout and grow your audience while you sleep.",
  PLACEHOLDER_IMAGE_URL: "https://clippink-bkt.s3.us-east-1.amazonaws.com/defaultbg.png"
};


export const routeMap = {
  DASHBOARD: "/dashboard",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  EMAIL_VERIFY: "/auth/verify",
}

export const BASE_MS_URL = process.env.NEXT_PUBLIC_BASE_MS_URL || "http://192.168.1.164:9000"

export const BASE_MS_HOST = process.env.NEXT_PUBLIC_BASE_MS_HOST || "192.168.1.164"
export const BASE_MS_PORT = process.env.NEXT_PUBLIC_BASE_MS_PORT || "9000"
export const BASE_MS_PROTOCOL = process.env.NEXT_PUBLIC_BASE_MS_PROTOCOL || "http"
export const WS_PROTOCOL = process.env.NEXT_PUBLIC_WS_PROTOCOL || "ws"


export const makeMsUrl = (path: string, protocol: string | null = null) => {
  let url = ""
  if (protocol) {
    url = `${protocol}://${BASE_MS_HOST}:${BASE_MS_PORT}${path}`
  }

  if (BASE_MS_PROTOCOL === "https") {
    url = `https://${BASE_MS_HOST}${path}`
  }
  else {
    url = `${BASE_MS_PROTOCOL}://${BASE_MS_HOST}:${BASE_MS_PORT}${path}`
  }

  return url
}



export const motionEffects: MotionEffect[] = [
  {
    displayName: "None",
    value: "none"
  },

  {
    displayName: "Scroll Up",
    value: "scrollUp"
  },
  {
    displayName: "Scroll Down",
    value: "scrollDown"
  },
  {
    displayName: "Scroll Left",
    value: "scrollLeft"
  },
  {
    displayName: "Scroll Right",
    value: "scrollRight"
  },
  {
    displayName: "Zoom In",
    value: "zoomIn"
  },
  {
    displayName: "Zoom Out",
    value: "zoomOut"
  },
  {
    displayName: "Diagonal Up Left",
    value: "diagonalUpLeft"
  },
  {
    displayName: "Diagonal Up Right",
    value: "diagonalUpRight"
  },
  {
    displayName: "Diagonal Down Left",
    value: "diagonalDownLeft"
  },
  {
    displayName: "Diagonal Down Right",
    value: "diagonalDownRight"
  },
  {
    displayName: "Ken Burns Up",
    value: "kenBurnsUp"
  },
  {
    displayName: "Ken Burns Down",
    value: "kenBurnsDown"
  },
  // {
  //   displayName: "Slide In Left",
  //   value: "slideInLeft"
  // },
  // {
  //   displayName: "Slide In Right",
  //   value: "slideInRight"
  // },
  // {
  //   displayName: "Slide In Top",
  //   value: "slideInTop"
  // },
  // {
  //   displayName: "Slide In Bottom",
  //   value: "slideInBottom"
  // }
]