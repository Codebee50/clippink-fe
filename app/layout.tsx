import type { Metadata } from "next";
import "./globals.css";
import { appConfig } from "@/constants";
import { ReactQueryProvider } from "./ReactQueryProvider";
import { Toaster } from "@/components/ui/sonner";
import UserHeader from "@/components/UserHeader";
import { Suspense } from "react";




export const metadata: Metadata = {
  title: `${appConfig.APP_NAME} - ${appConfig.APP_DESCRIPTION}`,
  // title: `${appConfig.APP_NAME} - AI Powered Video Creation`,
  description: appConfig.APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <ReactQueryProvider>
          <Toaster position="top-right" />
          <UserHeader />
          <Suspense fallback={<div className="w-dvw h-dvh flex items-center justify-center bg-denary text-greys1 text-2xl font-medium">Loading...</div>}>
            {children}
          </Suspense>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
