"use client"
import { signIn, useSession} from "next-auth/react";
import { redirect } from "next/navigation";

export default function Login () {

    const { data: session } = useSession();

    if (session) {
        return redirect ("/app/profile/account");
    }

    return (

        <div className="flex justify-center items-center pt-4">
            <section className="flex flex-col justify-center items-center w-1/2">

                <h2 className="text-xl font-semibold">Sign in</h2>

                <button className="p-2 rounded-full bg-sky-950 text-white w-1/2 mt-4 text-md hover:bg-sky-900" onClick={() => signIn("github")}>
                <div className="flex justify-center items-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" className="w-8"/>
                    <p className="pl-2">Sign in with Github</p>
                </div>
                </button>
                <button className="p-2 rounded-full bg-sky-950 text-white w-1/2 mt-4 text-md hover:bg-sky-900" onClick={() => signIn("google")}>
                <div className="flex justify-center items-center">
                    <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" className="w-8"/>
                    <p className="pl-2">Sign in with Google</p>
                </div>
                </button>

            </section>
        </div>
    );
}