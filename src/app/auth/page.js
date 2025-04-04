"use client";

import { useState } from "react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const API_URL = "http://localhost:1111";

  function handleSignup() {
    const url = `${API_URL}/users/signup`;

    return fetch(url, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: username, email: email, password: password })
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          //setIsLogin(true); //change to login when sign up is successful
        }
      })
      .catch((error) => {
        //log error and tell user that they cannot connect to server 
        console.log('There has been a problem with your fetch operation: \n\t' + error);
      });
  }

  function handleLogin() {
    //TODO: implement this 
  }

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
              onChange={(e) => setUsername(e.target.value)}
            />
          )}
          <input
            placeholder="Email"
            className="bg-gray-700 border border-gray-600 text-gray-300 p-2 rounded w-full"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            className="bg-gray-700 border border-gray-600 text-gray-300 p-2 rounded w-full"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white w-full p-2 rounded"
            onClick={isLogin ? handleLogin : handleSignup}>
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
