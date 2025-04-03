"use client";

import { useState } from "react";
import Link from "next/link";
import LoginHeader from "@/components/headers/LoginHeader";
import CourseCard from "@/components/CourseCard";
import AddField from "@/components/AddField";

export default function LearningTracker() {
  const [courses, setCourses] = useState([
    { id: 1, name: "React Course", progress: 50 },
    { id: 2, name: "MongoDB Guide", progress: 30 },
  ]);

  //add a course to the list 
  //newCourse is implicitly declared as its value was passed from the component
  const addCourse = (newCourse) => {
    if (newCourse.trim()) {
      setCourses([...courses, { id: courses.length + 1, name: newCourse, progress: 0, modules: [] }]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
      <LoginHeader />

      <div className="text-2xl font-bold text-gray-400 mb-6">Dashboard</div>

      <div className="space-y-4">
        {courses.map((course) => (
          <Link key={course.id} href={`/courses/${course.id}`}>
            <CourseCard
              courseName={course.name}
              progress={course.progress}
              courseId={course.id}
            />
          </Link>
        ))}
        {/* Add Course Field */}
        <AddField placeholder="Add a new course..." onAdd={addCourse} />
      </div>
    </div>
  );
}

