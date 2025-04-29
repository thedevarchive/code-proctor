"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoginHeader from "@/components/headers/LoginHeader";
import CourseCard from "@/components/CourseCard";

import { SiBookstack } from "react-icons/si";

export default function LearningTracker() {
  const router = useRouter(); // Initialize useRouter

  const [courses, setCourses] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newCourseType, setNewCourseType] = useState("");

  const [loading, setLoading] = useState(true);

  const API_URL = "http://localhost:1111";

  useEffect(() => {
    // Check if the user is logged in by checking the token in localStorage
    const token = localStorage.getItem("token");

    // If no token is found, redirect to the auth page
    if (!token) {
      router.push("/auth"); // Redirect to your login/signup page
    }

    //otherwise, get courses user is taking
    fetch(`${API_URL}/users/userinfo`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorisation: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (res.status === 403) {
          localStorage.setItem("token", "");
          localStorage.setItem("isLoggedIn", JSON.stringify(false));
          router.push("/auth");
          return;
        }
        return res.json();
      })
      .then(data => {
        setCourses(data.courses);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [router]);

  //add a course to the list 
  //newCourse is implicitly declared as its value was passed from the component
  const addCourse = (title, courseType) => {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/courses/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorisation: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: title,
        courseType: courseType
      })
    })
      .then(res => res.json())
      .then(data => setCourses(data.courses))
      .catch(err => console.error(err));

  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-400"></div>
      </div>
    );
  }

  //show user list of courses they are taking 
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
      <LoginHeader />

      <div className="text-2xl font-bold text-gray-400 mb-6">Dashboard</div>

      {
        courses.length > 0 ? (
          <div className="space-y-4">
            {courses.map((course) => (
              <Link key={course._id} href={`/courses/${course._id}`}>
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
      <div className="flex flex-col md:flex-row items-center gap-4 mt-6 mb-6 w-full flex-1">
        {/* user can add new course here */}
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Add a new course..."
          className="bg-gray-700 text-gray-300 p-2 rounded-md border-none w-full"
        />
        <select
          id="courseType"
          value={newCourseType}
          onChange={(e) => setNewCourseType(e.target.value)}
          className="bg-gray-700 text-gray-200 p-2 rounded w-30"
        >
          <option value="">Select type</option>
          <option value="Lecture">Lecture</option>
          <option value="Book">Backend</option>
          <option value="Tutorial">Tutorial</option>
          <option value="Practical">Practical</option>
          <option value="Certification">Certification</option>
          <option value="Maths">Maths</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Other">Other</option>
        </select>
        <button
          onClick={() => addCourse(newTitle, newCourseType)}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
        >
          Add
        </button>
      </div>
    </div>
  );
}

