export const appConfig = {
  APP_NAME: "Clipink",
  APP_DESCRIPTION:
    "Create viral faceless videos with AI. Post daily without burnout and grow your audience while you sleep.",
};

export const BASE_MS_URL = process.env.NEXT_PUBLIC_BASE_MS_URL || "http://localhost:9000"

export const makeMsUrl = (path: string) =>{
    return `${BASE_MS_URL}${path}`
}