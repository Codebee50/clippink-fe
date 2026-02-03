"use client"

import AuthLayout from '@/components/AuthLayout'
import React from 'react'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import LoadingButton from '@/components/buttons/LoadingButton';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useParams, useRouter } from 'next/navigation';
import useStyledToast from '@/hooks/useStyledToast';
import Link from 'next/link';
import { appConfig, makeMsUrl, routeMap } from '@/constants';
import usePostRequest from '@/hooks/usePost';
import { AxiosError, AxiosResponse } from 'axios';
import { genericErrorHandler } from '@/lib/errorHandler';
import { useUserStore } from '@/hooks/useUser';
import { UserData } from '@/lib/types/user';

const Page = () => {
  const { email } = useParams();
  const decodedEmail = email ? decodeURIComponent(email as string) : "";

  const toast = useStyledToast()
  const router = useRouter()
  const setUser = useUserStore((state) => state.setUser)

  const { mutate: verifyEmail, isLoading: isVerifyingEmail } = usePostRequest({
    url: "/auth/email/verify/",
    onSuccess: (response: AxiosResponse) => {
      toast.success(`Email verified successfully, welcome to ${appConfig.APP_NAME}`)
      setUser(response.data as UserData)
      router.push(routeMap.DASHBOARD)
    },
    onError: (error: AxiosError) => {
      toast.error(genericErrorHandler(error, "Unable to verify email"))
    }
  })

  const { mutate: resendEmail, isLoading: isResendingEmail } = usePostRequest({
    url: "/auth/email/verification/resend/",
    onSuccess: (response: AxiosResponse) => {
      toast.success("Email resent successfully")
    },
    onError: (error: AxiosError) => {
      toast.error(genericErrorHandler(error, "Unable to resend email"))
    }
  })


  const handleFormSubmitted = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const userOtp = formData.get("otp") as string;
    if (userOtp && userOtp.length < 6) {
      toast.error("OTP must be 6 digits");
      return;
    }

    const reqBody = {
      email: decodedEmail,
      otp: userOtp,
    };

    verifyEmail(reqBody)


  };
  return (
    <AuthLayout title="Verify your email" showColorFooter={false} description={`Enter the 6-digit code sent to your ${decodedEmail}`}>

      <form action="" onSubmit={handleFormSubmitted} className='w-full flex flex-col gap-4 items-center justify-center'>
        <InputOTP maxLength={6} name="otp" pattern={REGEXP_ONLY_DIGITS}>
          <InputOTPGroup className={"gap-2 grid grid-cols-6"}>
            {Array.from({ length: 6 }, (_, index) => (
              <InputOTPSlot
                key={`slot-${index}`}
                index={index}
                className="w-[50px] h-[50px]   border border-greys1/50 text-2xl font-medium text-senary"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>

        <div className='w-full flex flex-row items-center justify-center gap-2'>
          <p className='text-greys2 font-inter text-sm'>Didn&apos;t receive the code?</p>
          <button type='button' onClick={() => resendEmail({ email: decodedEmail })} disabled={isResendingEmail} className='text-senary font-inter text-sm underline cursor-pointer disabled:cursor-not-allowed'>Resend code</button>
        </div>

        <LoadingButton
          text="Verify my account"
          type="submit"
          isLoading={isVerifyingEmail}
          loadingText="Verifying email..."
        />
      </form>


    </AuthLayout>
  )
}

export default Page