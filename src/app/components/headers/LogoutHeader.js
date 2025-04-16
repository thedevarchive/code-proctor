"use client";

//import Link from "next/link"; //might use later for other pages 
import { useRouter } from "next/navigation";

const LogoutHeader = () => {
    const router = useRouter(); // Initialize useRouter

    const signIn = () => {
        console.log("Navigating to auth…");

        // Navigate to the auth page
        router.push("/auth"); 
    };

    return (
        <div className="flex justify-between mx-2 my-4 gap-8">
            <div className="text-3xl font-bold text-green-400">CodeProctor</div>
            <div className="flex gap-8 mt-2 font-bold">
                <div>About</div>
                <div>Testimonials</div>
            </div>
            <button
                onClick={signIn}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md cursor-pointer"
            >
                Sign In
            </button>
        </div>
    );
};

export default LogoutHeader; 
