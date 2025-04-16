"use client";

import React from 'react';
import LogoutHeader from './components/headers/LogoutHeader';

export default function Home() {
    return (
        <div className="flex flex-col justify-center bg-gray-900 text-green-400">
            <LogoutHeader /> 
            {/* Quote at the top */}
            <div className='flex items-center justify-center bg-[url(http://3.bp.blogspot.com/-0c89sOKM9vM/VAQ-VzXjT5I/AAAAAAAAPQE/6Ksz7Osrh98/s1600/26.%2BSchlegeis%2BLake%2C%2BTyrol%2C%2BAustria%2B-%2B29%2BWonderful%2BPaths.jpg)] bg-no-repeat bg-cover bg-center  w-full h-50'>
                <div className="text-center mb-8 bg-gray-900/80 p-2 mt-6">
                    <p className="italic text-lg">"The journey of a thousand lines of code begins with a single '<strong className='font-bold'>Hello World</strong>'."</p>
                </div>
            </div>

            <div className='pt-15 pl-8 text-left bg-[url(https://files.benramsey.com/ws/blog/2017-07-13-phptestfest/banner-1500x630.jpg)] bg-no-repeat bg-cover bg-center w-full h-75'>
                <div className='bg-gray-900/60'>
                    <h1 className="text-5xl font-bold mb-4">Welcome to CodeProctor</h1>
                    <h2 className="text-xl font-light mb-8"><em>A Developer’s Playground where <strong className='font-bold'>Code</strong> meets <strong className='font-bold'>Precision</strong></em></h2>
                    <br />
                    <p className="text-lg">We help you manage your workflow with tools that boost your productivity. Whether you’re debugging, building or designing, we've got your back.</p>
                </div>
            </div>

            <div className="flex items-center justify-center mb-16 text-center bg-[url(https://live.staticflickr.com/8491/8359194720_71b6171a5e_b.jpg)] bg-no-repeat bg-cover bg-center w-full h-60">
                <div className="text-center mb-8 bg-gray-900/80 p-2 mt-6">
                    <h3 className="text-2xl font-semibold mb-4">Features</h3>
                    <ul className="list-none space-y-4 text-lg">
                        <li>Track your progress as you learn various coding languages and concepts.</li>
                        <li>Visualise your progress and accomplishments with detailed dashboards and stats.</li>
                        <li>Stay motivated by setting and achieving learning milestones.</li>
                    </ul>
                </div>
            </div>

            {/* Final Text and Button */}
            <div className="mb-16 text-center">
                <p className="text-lg">What are you waiting for? <strong className='font-bold'>Start learning how to code today.</strong></p>
                <button className="mt-6 px-6 py-3 bg-green-500 text-white text-xl rounded-full font-bold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                    Sign Me Up
                </button>
            </div>

            {/* Footer */}
            <footer className="text-center text-sm w-full p-4">
                <p className='text-xl'>☕️ · 🤖 · 📚</p>
                <p>Made with Heaps of Coffee, ChatGPT, and most importantly, Learning and MERNing</p>
            </footer>
        </div>
    );
}
