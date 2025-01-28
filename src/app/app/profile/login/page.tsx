"use client"
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Login() {

    const { data: session } = useSession();

    if (session) {
        return redirect("/app/profile/account");
    }

    return (
        <div className="flex justify-center items-center pt-4 h-screen bg-gradient-to-b from-gray-800 to-gray-900">
            <section className="flex flex-col justify-center items-center w-full md:w-1/3 p-6 bg-gray-900 rounded-lg shadow-lg space-y-6">
                
                <h2 className="text-2xl font-semibold text-white">Sign in</h2>

                <button className="flex justify-center items-center p-3 rounded-full bg-sky-600 text-white w-3/4 hover:bg-sky-500 transition-all"
                onClick={() => signIn("github")}>
                    <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" className="w-8" />
                    <p className="pl-4">Sign in with Github</p>
                </button>

                <button className="flex justify-center items-center p-3 rounded-full bg-sky-600 text-white w-3/4 hover:bg-sky-500 transition-all"
                onClick={() => signIn("google")}>
                    <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" className="w-8" />
                    <p className="pl-4">Sign in with Google</p>
                </button>
            </section>
        </div>
    );
}
