"use client"

import React from 'react'
import Image from 'next/image'
import Nav from '@/components/Nav'
import { useFormik } from "formik";
import TextInput from '@/components/inputs/TextInput';
import LoadingButton from '@/components/buttons/LoadingButton';
import Footer from '@/components/Footer';
import Logo from '@/components/Logo';
import usePostRequest from '@/hooks/usePost';
import { AxiosError, AxiosResponse } from 'axios';
import useStyledToast from '@/hooks/useStyledToast';
import { useRouter } from 'next/navigation';
import { makeMsUrl, routeMap } from '@/constants';
import { UserData } from '@/lib/types/user';
import { useUserStore } from '@/hooks/useUser';
import Link from 'next/link';
import AuthLayout from '@/components/AuthLayout';
import GoogleSignInButton from '@/components/GoogleSignInButton';


const Page = () => {
    const toast = useStyledToast()
    const router = useRouter()

    const { setUser } = useUserStore()


    const { mutate: login, isLoading: isLoginLoading } = usePostRequest({
        url: "/auth/login/",
        onSuccess: (response: AxiosResponse) => {
            const user = response.data.user as UserData
            setUser(user)
            toast.success("Login successful")
            router.push("/dashboard")
        },
        onError: (error: AxiosError) => {
            toast.error("Login failed")
        }
    })

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""

        },
        onSubmit: (values) => {
            login({
                email: values.email,
                password: values.password
            })
        }
    })
    return (
        <AuthLayout title="Log in to your account">
            <div className='w-full flex flex-col gap-4'>
                <div className='w-full  mt-5'>
                    <GoogleSignInButton />
                </div>

                <div className='w-full  flex flex-row items-center justify-center gap-2'>
                    <div className='w-full h-px bg-greys2/20 max-w-[100px]'></div>
                    <p>OR</p>

                    <div className='w-full h-px bg-greys2/20 max-w-[100px]'></div>

                </div>

                <form onSubmit={formik.handleSubmit} className='w-full  mt-[5px] flex flex-col gap-2'>


                    <TextInput formik={formik} name='email' label='Email' placeholder='Enter your email' type='email' />
                    <TextInput formik={formik} name='password' label='Password' placeholder='Enter your password' type='password' labelSider={
                        <Link
                            href="/auth/password/request"
                            className="text-senary/70 font-inter font-medium text-sm"
                        >
                            Forgot your password?
                        </Link>
                    } />

                    <div className='w-full mt-5 flex flex-col gap-2'>
                        <LoadingButton text='Login' type='submit' isLoading={isLoginLoading} loadingText='Logging in...' />

                        <p className='text-center text-greys2 font-inter f text-sm'>
                            <span>Don&apos;t have an account?</span>
                            <Link href={routeMap.REGISTER} className='text-senary font-inter  text-sm text-center underline'> Register</Link>

                        </p>

                    </div>

                </form>

            </div>
        </AuthLayout>

    )
}

export default Page