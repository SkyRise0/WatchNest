"use client"

import watchNest from "@/app/images/watchnest-logo.webp"
import { api } from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function Navigation () {

    const [input, setInput] = useState("");

    const handleSearch = () => {
      if (input.trim()) {
        return redirect("/app/search/" + input)
      }
    };

    return (
        <nav className="grid grid-cols-4 gap-2 p-4 w-full bg-sky-950 items-center text-white fi">
            <Link href="/" className="pl-4">
                <h2 className="text-semibold">WatchNest</h2>
            </Link>
            <div className="w-full col-span-2 text-black flex gap-4">
                <input placeholder="Search for Movies ..." className="w-full outline-none p-2" value={input} onChange={(e) => setInput(e.target.value)}/>
                <button onClick={handleSearch}
                className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition duration-200 ease-in-out focus:outline-none">
                    Search
                </button>
            </div>
            <Link href="/app/profile/login" className="text-right pr-4">
                Profile
            </Link>
        </nav>
    );
}