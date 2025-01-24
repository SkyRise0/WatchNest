import { redirect } from "next/navigation";
import Navigation from "../components/Navigation";

export default async function AppLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    return (
        <div className="h-screen">
            <Navigation />
            <div className="">  
                {children}
            </div>
        </div>
    );
  }