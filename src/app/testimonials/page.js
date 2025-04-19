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
        {
            name: "Devin Alnight",
            title: "Junior Backend Developer",
            quote: "As a developer, I often find myself coding late into the night, and CodeProctor has been my perfect companion. With its easy-to-use interface and structured learning, I can track my progress and stay motivated, even when the hours slip away. Thanks to CodeProctor, I’m coding all night, every night!",
        },
        {
            name: "B. Lachlan Chain",
            title: "Self-Taught Blockchain Dev",
            quote: "Fair dinkum, CodeProctor’s a real game-changer, mate! It's like a bonza pair of coding boots—gets you through all the heavy lifting without breaking a sweat. I’ve been hammering away at my learning modules like a roo in a trampoline park, and now I’m ticking off progress faster than you can say ‘debug'. Whether it's modules or code blocks, this app keeps me on track, day and night. It’s all straight-up learning, one line of code at a time!",
        },
        {
            name: "Past You",
            title: "Developer in the Making",
            quote: "I don't know if I can do the coding thing, but I'll give this a go.",
        },
        {
            name: "Lex Deverson",
            title: "Junior Frontend Tinkerer",
            quote: "I rate this 5 out of 5 coffees. That's how much it fuels my coding!",
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