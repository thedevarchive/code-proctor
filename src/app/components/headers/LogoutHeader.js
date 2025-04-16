"use client";

//import Link from "next/link"; //might use later for other pages 
import { useRouter } from "next/navigation";

const Logout = () => {
    const router = useRouter(); // Initialize useRouter

    const signIn = () => {
        // Add your sign-out logic here (like clearing user session or token)
        console.log("Navigating to auth…");

        // Navigate to the auth page
        router.push("/auth"); // Redirect to /auth page
    };

    return (
        <div className="flex justify-between items-center mb-4">
            <div className="text-3xl font-bold text-green-400">CodeProctor</div>
            <button
                onClick={signIn}
                className="bg-green-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
                Sign In
            </button>
        </div>
    );
};

export default LoginHeader; 
