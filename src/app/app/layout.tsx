import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextAuth]/route";
import { redirect } from "next/navigation";

export default async function AppLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {


    const session = await getServerSession(authOptions);

    if (!session) {
        return redirect ("/");
    }

    return (
        <div>
            <div>
                {children}
            </div>
        </div>
    );
  }