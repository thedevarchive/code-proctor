"use client"; 

import { useParams } from "next/navigation";
import LoginHeader from "@/components/headers/LoginHeader";
import CourseCard from "@/components/CourseCard"; 

const courses = [
  { id: "1", name: "React Basics", progress: 50, description: "Learn React fundamentals", modules: ["JSX", "Components", "Props", "Hooks"] },
  { id: "2", name: "MongoDB Guide", progress: 30, description: "Deep dive into MongoDB", modules: ["CRUD", "Data Modelling", "Indexing"] }
];

const CourseDetails = () => {
  const params = useParams();
  const courseId = params.id;

  const course = courses.find((c) => c.id === courseId);

  if (!course) return <p>Course not found</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
      <LoginHeader /> 
      <CourseCard
              key={course.id}
              courseName={course.name}
              progress={course.progress}
              courseId={course.id}
            />
      <p>{course.description}</p>
      <h2>Modules:</h2>
      <ul>
        {course.modules.map((module, index) => (
          <li key={index}>{module}</li>
        ))}
      </ul>
    </div>
  );
};

export default CourseDetails;
