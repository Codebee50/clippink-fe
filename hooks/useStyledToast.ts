import { toast } from "sonner";

const useStyledToast = ()=>{
    return {
        success: (message: string)=>{
            toast.success(message, {
                className: "bg-green-500 text-white",
            })
        },
        error: (message: string)=>{
            toast.error(message, {
                className: "bg-red-500 text-white",
            })
        }
    }
}


export default useStyledToast