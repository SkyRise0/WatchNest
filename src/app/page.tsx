"use client";
import { redirect } from "next/navigation";
import Navigation from "./components/Navigation";

export default function Home() {

  return (
    <div className="text-slate-200">
      <Navigation />
    </div>
  );
}