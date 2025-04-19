"use client";

import Link from "next/link"; 
import { useRouter, usePathname } from "next/navigation";

const LogoutHeader = () => {
    const router = useRouter(); // Initialize useRouter
    const pathname = usePathname(); //get current path to highlight page user is currently on (only on about and testimonials page)

    const signIn = () => {
        console.log("Navigating to auth…");

        // Navigate to the auth page
        router.push("/auth");
    };

    //show header with sign in button
    return (
        <div className="flex justify-between mx-4 my-4 gap-8">
            <div className="text-3xl font-bold text-green-400"><Link href="/">CodeProctor</Link></div>
            <div className="flex gap-16 mt-2 font-bold text-xl mr-12">
                <Link href="/about"
                    className={pathname === "/about" ? "text-white" : "text-green-400"}>
                    About
                </Link>
                <Link href="/testimonials"
                    className={pathname === "/testimonials" ? "text-white" : "text-green-400"}>
                    Testimonials
                </Link>
            </div>
            <button
                onClick={signIn}
                className="bg-green-500 hover:bg-green-600 text-white text-lg font-bold px-4 py-2 rounded-md cursor-pointer"
            >
                Sign In
            </button>
        </div>
    );
};

export default LogoutHeader; 
