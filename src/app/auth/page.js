"use client";

import { useState } from "react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-200 p-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-green-400 mb-4">
          {isLogin ? "Login to CodeProctor" : "Sign Up for CodeProctor"}
        </h1>
        <div className="space-y-4">
          {!isLogin && (
            <input
              placeholder="Username"
              className="bg-gray-700 border border-gray-600 text-gray-300 p-2 rounded w-full"
            />
          )}
          <input
            placeholder="Email"
            className="bg-gray-700 border border-gray-600 text-gray-300 p-2 rounded w-full"
          />
          <input
            placeholder="Password"
            type="password"
            className="bg-gray-700 border border-gray-600 text-gray-300 p-2 rounded w-full"
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white w-full p-2 rounded">
            {isLogin ? "Login" : "Sign Up"}
          </button>
          <p className="text-sm text-gray-400 text-center">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <span
              className="text-blue-400 cursor-pointer hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign up" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
