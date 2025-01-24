import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SessionProvider from "@/app/components/sessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import QueryProvider from "./components/QueryProvider";

export const metadata: Metadata = {
  title: "WatchNest",
  description: "Rate your favorite movies and TV shows",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  let session;

  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    console.error("Error fetching session:", error);
    session = null;
  }

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <QueryProvider>
            {children}
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}