"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoginHeader from "@/components/headers/LoginHeader";
import CourseCard from "@/components/CourseCard";
import AddField from "@/components/AddField";

import { SiBookstack } from "react-icons/si";

export default function LearningTracker() {
  const router = useRouter(); // Initialize useRouter

  const [courses, setCourses] = useState([]);

  const API_URL = "http://localhost:1111"; 

  useEffect(() => {
    // Check if the user is logged in by checking the token in localStorage
    const token = localStorage.getItem("token");

    // If no token is found, redirect to the auth page
    if (!token) {
      router.push("/auth"); // Redirect to your login/signup page
    }

    fetch(`${API_URL}/users/userinfo/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorisation: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setCourses(data.courses))
      .catch(err => console.error(err));
  }, [router]);

  //add a course to the list 
  //newCourse is implicitly declared as its value was passed from the component
  const addCourse = (newCourse) => {
    // if (newCourse.trim()) {
    //   setCourses([...courses, { id: courses.length + 1, name: newCourse, progress: 0, modules: [] }]);
    // }
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/courses/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorisation: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: newCourse
      })
    })
      .then(res => res.json())
      .then(data => setCourses(data.courses))
      .catch(err => console.error(err));

  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
      <LoginHeader />

      <div className="text-2xl font-bold text-gray-400 mb-6">Dashboard</div>

      {
        courses.length > 0 ? (
          <div className="space-y-4">
            {courses.map((course) => (
              <Link key={course._id} href={`/courses/${course.id}`}>
                <CourseCard
                  courseName={course.title}
                  progress={course.progress}
                  courseId={course._id}
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mt-8 mx-auto w-max">
              <SiBookstack className="text-green-400 text-center ml-16 mb-4" size={150} />
              <p>No courses yet. Start learning code now!</p>
            </div>
          </div>
        )
      }

      {/* Add Course Field */}
      <AddField placeholder="Add a new course..." onAdd={addCourse} />
    </div>
  );
}

