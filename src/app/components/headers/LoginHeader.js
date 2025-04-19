"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginHeader = () => {
    const router = useRouter(); // Initialize useRouter

    const signOut = () => {
        localStorage.setItem("token", "");
        localStorage.setItem("isLoggedIn", JSON.stringify(false));
        console.log("Signed out!");

        // Navigate to the auth page
        router.push("/auth"); // Redirect to /auth page
    };

    //show header with sign out button
    return (
        <div className="flex justify-between items-center mb-4">
            <div className="text-3xl font-bold text-green-400"><Link href="/dashboard">CodeProctor</Link></div>
            <button
                onClick={signOut}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer"
            >
                Sign Out
            </button>
        </div>
    );
};

export default LoginHeader; 
