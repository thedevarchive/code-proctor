"use client";

import { useState } from "react";
import Link from "next/link";
import LoginHeader from "@/components/headers/LoginHeader";
import CourseCard from "@/components/CourseCard"; 

export default function LearningTracker() {
  const [courses, setCourses] = useState([
    { id: 1, name: "React Course", progress: 50 },
    { id: 2, name: "MongoDB Guide", progress: 30 },
  ]);
  const [newCourse, setNewCourse] = useState("");

  const addCourse = () => {
    if (newItem.trim()) {
      setCourses([
        ...courses,
        { id: Date.now(), name: newItem, progress: 0 },
      ]);
      setNewCourse("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
      <LoginHeader />

      <div className="text-2xl font-bold text-gray-400 mb-6">Dashboard</div>

      <div className="space-y-4">
        {courses.map((course) => (
          <Link href={`/courses/${course.id}`}>
            <CourseCard
              key={course.id}
              courseName={course.name}
              progress={course.progress}
              courseId={course.id}
            />
          </Link>
        ))}
        <div className="flex gap-2 mt-4">
          <input
            type="text"
            value={newCourse}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add new learning goal..."
            className="bg-gray-700 text-gray-300 p-2 rounded-md border-none w-full"
          />
          <button
            onClick={addCourse}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

