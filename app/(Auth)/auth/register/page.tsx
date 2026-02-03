"use client"

import AuthLayout from '@/components/AuthLayout'
import React from 'react'
import Image from 'next/image'
import LoadingButton from '@/components/buttons/LoadingButton'
import { useFormik } from 'formik'
import TextInput from '@/components/inputs/TextInput'
import Link from 'next/link'
import { routeMap } from '@/constants'
import { registrationSchema } from '@/lib/validationSchemas'
import usePostRequest from '@/hooks/usePost'
import { AxiosError, AxiosResponse } from 'axios'
import useStyledToast from '@/hooks/useStyledToast'
import { useRouter } from 'next/navigation'
import { genericErrorHandler } from '@/lib/errorHandler'

const Page = () => {

    const toast = useStyledToast()
    const router = useRouter()

    const { mutate: register, isLoading: isRegisterLoading } = usePostRequest({
        url: "/auth/register/",
        onSuccess: (response: AxiosResponse) => {

            toast.success("Account created successfully")
            router.push(`${routeMap.EMAIL_VERIFY}/${response.data.email}`)

        },
        onError: (error: AxiosError) => {
            toast.error(genericErrorHandler(error, "Unable to create account"))
        }
    })

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            name: ""
        },
        validationSchema: registrationSchema,
        onSubmit: (values) => {
            register(values)
        }
    })
    return (
        <AuthLayout title="Create an account">
            <div className='w-full flex flex-col gap-4'>
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


                    <TextInput formik={formik} name='name' label='Username' placeholder='Choose your username' type='text' />
                    <TextInput formik={formik} name='email' label='Email' placeholder='Enter your email' type='email' />
                    <TextInput formik={formik} name='password' label='Password' placeholder='Enter your password' type='password' />

                    <div className='w-full mt-5 flex flex-col gap-2'>
                        <LoadingButton text='Create account' onClick={formik.handleSubmit} isLoading={isRegisterLoading} loadingText='Creating your account...' />

                        <p className='text-center text-greys2 font-inter f text-sm'>
                            <span>Already have an account?</span>
                            <Link href={routeMap.LOGIN} className='text-senary font-inter  text-sm text-center underline'> Login</Link>

                        </p>
                    </div>

                </div>
            </div>
        </AuthLayout>
    )
}

export default Page