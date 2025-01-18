import watchNest from "@/app/images/watchnest-logo.webp"
import Image from "next/image";
import Link from "next/link";

export default function Navigation () {
    return (
        <nav className="grid grid-cols-4 gap-2 p-4 w-full bg-sky-950 items-center">
            <Link href="/" className="pl-4">
                <h2 className="text-semibold">WatchNest</h2>
            </Link>
            <div className="w-full col-span-2 text-black">
                <input placeholder="Search for Movies, TV Shows..." className="w-full outline-none p-2"/>
            </div>
            <Link href="/app/profile" className="text-right pr-4">
                Profile
            </Link>
        </nav>
    );
}