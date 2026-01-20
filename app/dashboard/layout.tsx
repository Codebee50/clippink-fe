import type { Metadata } from "next";
import { appConfig } from "@/constants";
import DashboardNav from "@/components/dashboard/DashboardNav";

export const metadata: Metadata = {
  title: `${appConfig.APP_NAME} - ${appConfig.APP_DESCRIPTION}`,
  // title: `${appConfig.APP_NAME} - AI Powered Video Creation`,
  description: appConfig.APP_DESCRIPTION,
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-denary flex flex-row h-screen w-full">
      <DashboardNav />

      <div className="flex-1 min-h-0 h-full px-6 flex flex-col gap-4 w-full shrink-0 overflow-hidden relative max-w-[1600px] mx-auto">{children}</div>
    </div>
  );
}
