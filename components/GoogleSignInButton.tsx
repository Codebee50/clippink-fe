import React, { useState } from 'react'
import Image from 'next/image'
import useStyledToast from '@/hooks/useStyledToast'
import { AuthError, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth as firebaseAuth } from '@/lib/firebase/firebaseConfig';
import usePostRequest from '@/hooks/usePost';
import { AxiosError, AxiosResponse } from 'axios';
import { genericErrorHandler } from '@/lib/errorHandler';
import { UserData } from '@/lib/types/user';
import { useUserStore } from '@/hooks/useUser';
import { routeMap } from '@/constants';
import { useRouter } from 'next/navigation';
import GooeyBalls from './loaders/GooeyBalls';

const GoogleSignInButton = () => {
    const toast = useStyledToast()
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()
    const setUser = useUserStore((state) => state.setUser)


    const { mutate: loginWithIdToken, isLoading: isLoginWithIdTokenLoading } = usePostRequest({
        url: "/auth/google/",
        onSuccess: (response: AxiosResponse) => {
            const user = response.data.user as UserData
            setUser(user)
            toast.success("Login successful")
            router.push(routeMap.DASHBOARD)


        },
        onError: (error: AxiosError) => {
            toast.error(genericErrorHandler(error, "Google authentication failed"))
        }
    })


    const signInWithGoogle = async () => {
        setIsLoading(true);

        try {
            const provider = new GoogleAuthProvider();
            provider.addScope("profile");
            provider.addScope("email");

            if (!firebaseAuth) {
                toast.error("Firebase not connected")
                return
            }

            const result = await signInWithPopup(firebaseAuth, provider);
            const idToken = await result.user.getIdToken();

            loginWithIdToken({
                id_token: idToken,
            })


        } catch (error) {
            const code = (error as AuthError)?.code;

            if (
                code !== "auth/popup-closed-by-user" &&
                code !== "auth/cancelled-popup-request"
            ) {
                toast.error("Google authentication failed. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <button onClick={signInWithGoogle} disabled={isLoading || isLoginWithIdTokenLoading} className='w-full flex flex-row items-center gap-5 justify-center bg-greys3/50  text-white px-4 py-3 rounded-md border border-greys2/10 cursor-pointer '>

            {
                isLoading || isLoginWithIdTokenLoading ? <GooeyBalls /> :
                    <>
                        <Image src="/images/google.png" alt="google" width={20} height={20} />
                        <p>Continue with Google</p>
                    </>
            }
        </button>
    )
}

export default GoogleSignInButton