import React from 'react'
import GooeyBalls from '../loaders/GooeyBalls'
import { cn } from '@/lib/utils'

type LoadingButtonProps = {
    text: string;
    isLoading?: boolean;
    Icon?: React.ReactNode;
    onClick?: () => void;
    loadingText?: string;
    type?: "button" | "submit"
    className?: string
}

const LoadingButton = ({ text, isLoading = false, Icon = null, onClick = () => { }, loadingText = "Loading...", type = "button", className = "" }: LoadingButtonProps) => {
    return (
        <button type={type} disabled={isLoading} className={cn('w-full flex flex-row items-center gap-2 justify-center bg-senary disabled:opacity-80 disabled:cursor-not-allowed px-6 py-2 rounded-sm text-sm text-nowrap cursor-pointer', className)} onClick={onClick}>

            {
                isLoading ? <><GooeyBalls /> <p className='text-sm text-white'>{loadingText || "Loading..."}</p></> :
                    <>
                        {Icon && Icon}
                        <p>{text}</p>
                    </>
            }
        </button>
    )
}

export default LoadingButton