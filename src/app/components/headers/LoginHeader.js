"use client";

//import Link from "next/link"; //might use later for other pages 
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

    return (
        <div className="flex justify-between items-center mb-4">
            <div className="text-3xl font-bold text-green-400">CodeProctor</div>
            <button
                onClick={signOut}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
                Sign Out
            </button>
        </div>
    );
};

export default LoginHeader; 
