"use client"

import React from 'react'
import Image from 'next/image'
import Nav from '@/components/Nav'
import { useFormik } from "formik";
import TextInput from '@/components/inputs/TextInput';
import LoadingButton from '@/components/buttons/LoadingButton';
import Footer from '@/components/Footer';
import Logo from '@/components/Logo';


const Page = () => {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""

        },
        onSubmit: (values) => {
        }
    })
    return (
        <>
            <div className='w-full flex flex-row gap-2 bg-denary min-h-screen'>
                <Nav fixed={true} />



                <div className='w-full min-h-dvh flex flex-col items-center justify-center pt-[90px] sm:pt-[150px] gap-5'>

                    <p className='text-white text-2xl font-bold capitalize'>Log in to your account</p>

                    <div className='w-[90%] max-w-[400px] flex flex-col gap-4'>
                        <div className='w-full  mt-5'>
                            <button className='w-full flex flex-row items-center gap-5 justify-center bg-greys3/50  text-white px-4 py-3 rounded-md border border-greys2/10 cursor-pointer '>
                                <Image src="/images/google.png" alt="google" width={20} height={20} />
                                <p>Continue with Google</p>
                            </button>
                        </div>

                        <div className='w-full  flex flex-row items-center justify-center gap-2'>
                            <div className='w-full h-px bg-greys2/20 max-w-[100px]'></div>
                            <p>OR</p>

                            <div className='w-full h-px bg-greys2/20 max-w-[100px]'></div>

                        </div>

                        <div className='w-full  mt-[5px] flex flex-col gap-2'>


                            <TextInput formik={formik} name='email' label='Email' placeholder='Enter your email' type='email' />
                            <TextInput formik={formik} name='password' label='Password' placeholder='Enter your password' type='password' />

                            <div className='w-full mt-5'>

                                <LoadingButton text='Login' onClick={formik.handleSubmit} />

                            </div>

                        </div>

                    </div>








                </div>




            </div>
            <Footer />

        </>

    )
}

export default Page