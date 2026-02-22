import { create } from "zustand";

export const dialogIds = {
    LAUNCH_VIDEO_TO_SHORTS: "launch-video-to-shorts"
}

type UIStore = {
    dialogs: Record<string, boolean>
    openDialog: (id: string) => void;
    closeDialog: (id: string) => void
    getDialogState: (id: string) => boolean
    setDialogState: (id: string, new_state: boolean) => void
}


export const useUiStore = create<UIStore>((set, get) => ({
    dialogs: {},
    openDialog: (id) => set((state) => ({ dialogs: { ...state.dialogs, [id]: true } })),
    closeDialog: (id) => set((state) => ({ dialogs: { ...state.dialogs, [id]: false } })),
    getDialogState: (id) => get().dialogs[id] ?? false,
    setDialogState: (id, new_state) => set((state) => ({ dialogs: { ...state.dialogs, [id]: new_state } }))
}))