"use client";

import React from 'react';
import LogoutHeader from '../components/headers/LogoutHeader';
import { Footer } from '@/components/Footer';

export default function About() {
    return (
        <div className="flex flex-col justify-center bg-gray-900 text-green-400">
            <LogoutHeader />
            {/* Quote at the top */}
            <div className="p-8">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4 text-center">About CodeProctor</h1>
                    <p className="text-lg mb-6">
                        CodeProctor is your digital mentor on the journey to becoming a better developer. Whether you're debugging your first loop or deploying your tenth full-stack app, CodeProctor is built to keep you on track.
                    </p>

                    <h2 className="text-2xl font-semibold mb-4 text-center">🎯 Our Mission</h2>
                    <p className="mb-6">
                        We aim to empower coders of all levels with practical tools that streamline their learning and development workflow. With a focus on clarity, consistency, and motivation, we help you stay sharp and focused.
                    </p>

                    <h2 className="text-2xl font-semibold mb-4 text-center">🛠️ What CodeProctor Offers</h2>
                    <ul className="list-disc list-inside mb-6 space-y-2">
                        <li>Track your coding progress across multiple languages and concepts</li>
                        <li>A visual dashboard to see how far you’ve come</li>
                        <li>Custom milestones to keep you motivated and goal-driven</li>
                        <li>A sleek, distraction-free interface made by and for professional and prospective developers</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mb-4 text-center">☕ Built With Passion</h2>
                    <p className="mb-6">
                        CodeProctor is a project brewed with heaps of coffee, endless lines of code and a real passion for learning. Whether you're building side projects, prepping for interviews or just leveling up — we're here for the grind.
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
}
