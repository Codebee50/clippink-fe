import { AxiosError } from "axios"
import useStyledToast from "./useStyledToast"
import { makeMsUrl, routeMap } from "@/constants"
import { useRouter } from "next/navigation"
import usePostRequest from "./usePost"
import { genericErrorHandler } from "@/lib/errorHandler"

const useLogout = () =>{
    const router = useRouter()
    const toast = useStyledToast()
    const {mutate: logoutUser, isLoading: isLogoutLoading} = usePostRequest({
        url: makeMsUrl("/auth/logout/"),
        onSuccess: () => {
            toast.success("Logout successful")
            router.push(routeMap.LOGIN)
        },
        onError: (error: AxiosError) => {
            toast.error(genericErrorHandler(error, "Logout failed"))
        }
    })

    return {
        logoutUser,
        isLogoutLoading
    }
}

export default useLogout