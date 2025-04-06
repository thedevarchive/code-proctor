"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import LoginHeader from "@/components/headers/LoginHeader";
import CourseCard from "@/components/CourseCard";
import AddField from "@/components/AddField";

const CourseDetails = () => {
  const router = useRouter();
  const params = useParams();

  const courseId = params.id;
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);

  const API_URL = "http://localhost:1111";

  useEffect(() => {
    const token = localStorage.getItem("token");

    // If no token is found, redirect to the auth page
    if (!token) {
      router.push("/auth"); // Redirect to your login/signup page
      return; // Exit early if no token, don't fetch course
    }

    if (!courseId) return; // Ensure courseId is available before fetching

    fetch(`${API_URL}/courses/${courseId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorisation: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setCourse(data.course))
      .catch(err => console.error(err));
  }, [courseId, router]);

  // Set modules when course is fetched
  useEffect(() => {
    if (course && course.modules) {
      setModules(course.modules);
    }
  }, [course]);

  if (!course) return <p>Course not found</p>;

  const addModule = (newModule) => {
    const updatedModules = [...modules, newModule];
    setModules(updatedModules);
  };

  const handleEdit = (index, currentName) => {
    setEditingIndex(index);
    setEditedModule(currentName);
  };

  const handleSaveEdit = (index) => {
    const updatedModules = [...modules];
    updatedModules[index] = editedModule;
    setModules(updatedModules);
    setEditingIndex(null);
    setEditedModule("");
  };

  const handleDelete = (index) => {
    const updatedModules = modules.filter((_, i) => i !== index);
    setModules(updatedModules);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
      <LoginHeader />

      <button
        onClick={() => router.back()}
        className="mb-4 text-blue-500 hover:underline"
      >
        ← Back to Dashboard
      </button>

      <CourseCard
        key={course.id}
        courseName={course.title}
        progress={course.progress}
        courseId={course.id}
      />

      <div className="p-6">
        <h2 className="text-2xl font-bold text-green-400 mb-4">About this Course</h2>
        <p className="text-gray-300 mb-6">{course.description}</p>

        <h2 className="text-xl font-bold text-green-400 mb-4">Modules:</h2>
        <ul className="space-y-2">
          {modules.map((module, index) => (
            <li key={index} className="flex items-center justify-between bg-gray-800 p-3 rounded-lg shadow-md">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-3 w-5 h-5 accent-green-400 cursor-pointer"
                  checked={module.completed}
                  onChange={() => toggleCompletion(index)}
                />
                <span>{module}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(index, module)}
                  className="text-yellow-400 hover:text-yellow-300"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500 hover:text-red-400"
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>

        <AddField placeholder="Add a new module..." onAdd={addModule} />
      </div>
    </div>
  );
};

export default CourseDetails;
