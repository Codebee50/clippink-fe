import React from 'react'
import Nav from './Nav'
import Image from 'next/image'
import TextInput from './inputs/TextInput'
import Link from 'next/link'
import LoadingButton from './buttons/LoadingButton'
import Footer from './Footer'

const AuthLayout = ({ children, title = "Login", showColorFooter = true, description }: { children: React.ReactNode, title?: string, showColorFooter?: boolean, description?: string }) => {
    return (
        <div className='w-full min-h-dvh flex flex-col  bg-denary '>
            <div className='w-full flex flex-col items-center justify-center gap-5 bg-linear-to-b from-denary to-senary/20 via-denary  max-h-[1000px] relative '>
                <Nav fixed={true} backdrop={true} logoWidth={30} logoHeight={30} className='border-b border-greys1/20' />

                <div className='mt-[100px]'>

                </div>



                <div className='w-[95%]  flex flex-col items-center justify-center gap-5 border border-greys1/20 max-w-[450px] mx-auto rounded-lg pb-8 mb-9 pt-[30px] sm:px-5 px-3 h-max z-10 bg-denary'>

                    <div className='w-full flex flex-col items-center justify-center '>
                        <p className='text-white sm:text-2xl text-xl font-semibold capitalize'>{title}</p>

                        {
                            description && <p className='text-greys2 font-inter text-sm text-center max-w-[300px]'>{description}</p>
                        }

                    </div>



                    <div className='w-[90%] flex flex-col gap-4'>

                        {children}

                    </div>

                </div>
{/* 
                {
                    showColorFooter && <div className="w-full h-[300px] overflow-hidden absolute bottom-0 left-0 right-0 grid md:grid-cols-2">
                        <Image src="/images/abstractcolors.svg" alt="login-bg" width={1000} height={1000} className='w-full bg-repeat max-md:min-w-[600px]' />
                        <Image src="/images/abstractcolors.svg" alt="login-bg" width={1000} height={1000} className='w-full bg-repeat max-md:hidden' />

                    </div>
                } */}






            </div>


            <Footer />

        </div>
    )
}

export default AuthLayout