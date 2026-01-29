import { toast } from "sonner";

const useStyledToast = ()=>{
    return {
        success: (message: string)=>{
            toast.success(message, {
              style: {
                '--normal-bg': 'light-dark(var(--color-green-600), var(--color-green-400))',
                '--normal-text': 'var(--color-white)',
                '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
              } as React.CSSProperties
              })
        },
        error: (message: string)=>{
            toast.error(message, {
                style: {
                    '--normal-bg':
                      'light-dark(var(--destructive), color-mix(in oklab, var(--destructive) 60%, var(--background)))',
                    '--normal-text': 'var(--color-white)',
                    '--normal-border': 'transparent'
                  } as React.CSSProperties
              })
        },
        warning: (message: string)=>{
            toast.warning(message, {
                style: {
            '--normal-bg': 'light-dark(var(--color-green-600), var(--color-green-400))',
            '--normal-text': 'var(--color-white)',
            '--normal-border': 'light-dark(var(--color-green-600), var(--color-green-400))'
          } as React.CSSProperties
            })
        }
    }
}


export default useStyledToast