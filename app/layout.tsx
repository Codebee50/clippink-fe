import type { Metadata } from "next";
import "./globals.css";
import { appConfig } from "@/constants";
import { ReactQueryProvider } from "./ReactQueryProvider";
import { Toaster } from "@/components/ui/sonner";


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
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
