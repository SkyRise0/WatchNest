import { signIn, useSession } from "next-auth/react";

export default function Profile () {

    const { data: session } = useSession();

    return(
        <div>
            {!session ? (
                <section className="flex flex-col ml-4 mt-14">
                    <h2 className="text-5xl font-bold py-8">Happening Now</h2>
                    <p className="text-3xl font-semibold py-4">Sign up today.</p>

                    <button className="p-2 rounded-full bg-sky-400 text-white w-5/12 mt-4 text-md hover:bg-sky-500" onClick={() => signIn("github")}>
                    <div className="flex justify-center items-center">
                        <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" className="w-8"/>
                        <p className="pl-2">Sign in with Github</p>
                    </div>
                    </button>
                    <button className="p-2 rounded-full bg-sky-400 text-white w-5/12 mt-4 text-md hover:bg-sky-500" onClick={() => signIn("google")}>
                    <div className="flex justify-center items-center">
                        <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" className="w-8"/>
                        <p className="pl-2">Sign in with Google</p>
                    </div>
                    </button>

                </section>
            ) : (
                <div>
                    Profile things
                </div>
            )}
        </div>
    );
}