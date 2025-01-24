"use client"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { signOut } from "next-auth/react";

export default function Profile () {

    const currentUser = useQuery({
        queryKey: ["user"],
        queryFn: api.getCurrentUser
    })

    console.log(currentUser.data)

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            {currentUser.isSuccess ? (
                <div className="text-center">
                    <img src={currentUser.data?.image} alt="Profile Picture" 
                    className="w-24 h-24 mx-auto rounded-full shadow-md"/>

                    <h1 className="mt-4 text-2xl font-bold text-gray-700">
                        {currentUser.data?.name}
                    </h1>

                    <p className="mt-2 text-gray-500">
                        {currentUser.data?.email}
                    </p>

                    <button onClick={() => signOut()} className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition">
                        Sign Out
                    </button>
                </div>
            ) : null}
            </div>
        </div>
    );
}