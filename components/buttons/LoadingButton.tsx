import React from 'react'
import GooeyBalls from '../loaders/GooeyBalls'

const LoadingButton = ({ text, isLoading = false, Icon = null, onClick = () => { }, loadingText = "Loading..." }: { text: string, isLoading?: boolean, Icon?: React.ReactNode, onClick?: () => void, loadingText?: string }) => {
    return (
        <button disabled={isLoading} className='w-full flex flex-row items-center gap-2 justify-center bg-senary disabled:opacity-80 disabled:cursor-not-allowed px-6 py-2 rounded-sm text-sm text-nowrap cursor-pointer' onClick={onClick}>

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