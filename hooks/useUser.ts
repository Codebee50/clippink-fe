import { create } from "zustand";
import { UserData } from "@/lib/types/user";
import axios from "axios";
import { makeMsUrl } from "@/constants";

type UserStore = {
    user: UserData  | null;
    loading: boolean;
    fetchUser: () => Promise<UserData | null>;
    setUser: (user: UserData) => void;
} 

export const useUserStore = create<UserStore>((set)=>({
    user: null,
    loading: false,
    fetchUser: async()=>{
        set({loading: true})
        const response = await axios.get(makeMsUrl("/auth/me/"), {withCredentials: true})

        if(response.status === 200){
            const user = response.data as UserData
            set({user, loading: false})
            return user
        }

        set({loading: false})
        return null


    },
    setUser: (user: UserData) => set({ user }),
}))