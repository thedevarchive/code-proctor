"use client"; 

import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-green-400">
      {/* Quote at the top */}
      <div className="text-center mb-8">
        <p className="italic text-sm">"The journey of a thousand lines of code begins with a single 'Hello World'."</p>
      </div>

      <hr className="border border-white mb-8 w-full" />

      {/* Header */}
      <h1 className="text-5xl font-bold text-center mb-4">Welcome to CodeProctor</h1>

      {/* Subheader */}
      <h2 className="text-xl font-light text-center mb-8">A Developer’s Playground where Code meets Precision</h2>

      {/* Body Section 1 */}
      <section className="mb-16 text-center">
        <h3 className="text-2xl font-semibold mb-4">For the Serious Coder</h3>
        <p className="text-lg">We help you manage your workflow with tools that boost your productivity. Whether you’re debugging, building, or designing, we've got your back.</p>
      </section>

      {/* Body Section 2 */}
      <section className="mb-16 text-center">
        <h3 className="text-2xl font-semibold mb-4">Features</h3>
        <ul className="list-none space-y-4 text-lg">
          <li>Track your progress as you learn various coding languages and concepts.</li>
          <li>Visualize your progress and accomplishments with detailed dashboards and stats.</li>
          <li>Stay motivated by setting and achieving learning milestones.</li>
        </ul>
      </section>

      {/* Final Text and Button */}
      <div className="mb-16 text-center">
        <p className="text-lg">What are you waiting for? Start learning how to code today.</p>
        <button className="mt-6 px-6 py-3 bg-green-500 text-white text-xl rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
          Sign Me Up
        </button>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-center text-sm w-full">
        <p>Made with Heaps of Coffee, ChatGPT, and most importantly, Learning and MERNing</p>
      </footer>
    </div>
  );
}
