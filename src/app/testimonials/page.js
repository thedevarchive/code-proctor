"use client";

import React from 'react';
import LogoutHeader from '../components/headers/LogoutHeader';
import { Footer } from '@/components/Footer';

export default function Testimonials() {
    const testimonials = [
        {
            name: "Jamie Coder",
            title: "Full-Stack Dev Student",
            quote: "CodeProctor is what happens when Codecademy and Trello fall in love and create the ultimate learning tracker. It keeps my coding journey structured without overwhelming me. Finally, a tool that helps me stay on track without making me feel like I’m managing a corporate project! 10/10 would recommend.",
        },
    ];

    return (
        <div className="flex flex-col justify-center bg-gray-900 text-green-400">
            <LogoutHeader />
            <div className="max-w-5xl mx-auto min-h-screen">
                <h1 className="text-4xl font-bold text-center mb-12">What Coders Are Saying</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((t, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700"
                        >
                            <p className="italic text-lg mb-4">“{t.quote}”</p>
                            <div className="mt-4">
                                <p className="font-semibold">{t.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{t.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}