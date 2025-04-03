"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import LoginHeader from "@/components/headers/LoginHeader";
import CourseCard from "@/components/CourseCard";
import AddField from "@/components/AddField";

const CourseDetails = () => {
  const params = useParams();
  const courseId = params.id;

  //TODO change this to modules when implementing back end 
  const[courses, setCourses] = useState([
    { id: "1", name: "React Basics", progress: 50, description: "Learn React fundamentals", modules: ["JSX", "Components", "Props", "Hooks"] },
    { id: "2", name: "MongoDB Guide", progress: 30, description: "Deep dive into MongoDB", modules: ["CRUD", "Data Modelling", "Indexing"] }
  ]); 

  const course = courses.find((c) => c.id === courseId);

  if (!course) return <p>Course not found</p>;

  const router = useRouter(); // Initialize useRouter

  const [completedModules, setCompletedModules] = useState(
    new Array(course.modules.length).fill(false)
  );

  const toggleCompletion = (index) => {
    const updatedCompletion = [...completedModules];
    updatedCompletion[index] = !updatedCompletion[index];
    setCompletedModules(updatedCompletion);
  };

  //add a course to the list 
  //newCourse is implicitly declared as its value was passed from the component
  const addModule = (newModule) => {
    setCourses((prevCourses) =>
      prevCourses.map((c) =>
        c.id === course.id
          ? { ...course, modules: [...course.modules, newModule] }
          : course
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
      <LoginHeader />
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-4 text-blue-500 hover:underline"
      >
        ← Back to Dashboard
      </button>

      <CourseCard
        key={course.id}
        courseName={course.name}
        progress={course.progress}
        courseId={course.id}
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-green-400 mb-4">About this Course</h2>
        <p className="text-gray-300 mb-6">{course.description}</p>

        <h2 className="text-xl font-bold text-green-400 mb-4">Modules:</h2>
        <ul className="space-y-2">
          {course.modules.map((module, index) => (
            <li key={index} className="bg-gray-800 p-3 rounded-lg shadow-md">
              <input
                type="checkbox"
                className="mr-3 w-5 h-5 accent-green-400 cursor-pointer"
                checked={completedModules[index]}
                onChange={() => toggleCompletion(index)}
              />
              <span>{module}</span>
            </li>
          ))}
        </ul>

        {/* Add Course Field */}
        <AddField placeholder="Add a new module..." onAdd={addModule} />
      </div>
    </div>
  );
};

export default CourseDetails;
