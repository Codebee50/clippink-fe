import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ClippedVideoStatus } from "./types/videotoshorts"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getClassNameForStatus = (status: ClippedVideoStatus): string => {
  if (status === 'processing' || status == 'pending') {
    return "bg-yellow-200 text-yellow-900"
  }
  if (status === 'completed') {
    return "bg-green-400 text-green-900"
  }
  if (status === 'failed') {
    return "bg-red-200 text-red-900"
  }

  return ""
}