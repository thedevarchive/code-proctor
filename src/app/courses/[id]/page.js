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
  const [editingCourse, setEditingCourse] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedModule, setEditedModule] = useState("");

  const API_URL = "http://localhost:1111";

  useEffect(() => {
    const token = localStorage.getItem("token");

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
      .then((res) => res.json())
      .then((data) => setCourse(data.course))
      .catch((err) => console.error(err));
  }, [courseId, router]);

  // Set modules when course is fetched
  useEffect(() => {
    if (course && course.modules) {
      setModules(course.modules);
    }
  }, [course]);

  const addModule = (newModule) => {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/courses/${courseId}/modules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: newModule,
      }),
    })
      .then((res) => res.json())
      .then((data) => setModules(data.modules))
      .catch((err) => console.error(err));
  };

  const handleEditCourse = () => {
    setEditingCourse(true);
    setEditedTitle(course.title);
    setEditedDescription(course.description);
  };

  const handleSaveCourse = () => {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/courses/${courseId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: editedTitle,
        description: editedDescription,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCourse(data.course);
        setEditingCourse(false);
      })
      .catch((err) => console.error(err));
  };

  const handleDeleteCourse = () => {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/courses/${courseId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        router.push("/dashboard"); // Redirect to dashboard after delete
      })
      .catch((err) => console.error(err));
  };

  const handleEdit = (index, currentName) => {
    setEditingIndex(index);
    setEditedModule(currentName);
  };

  const toggleCompletion = (index) => {
    const updatedModules = [...modules];
    updatedModules[index].isFinished = !updatedModules[index].isFinished;
    setModules(updatedModules);

    const token = localStorage.getItem("token");

    // Update the completion status on the server
    fetch(`${API_URL}/courses/${courseId}/modules/${modules[index]._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        isFinished: updatedModules[index].isFinished,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        // Optionally, handle any success responses here
      })
      .catch((err) => console.error("Error updating completion status", err));
  };

  const handleSaveEdit = (index) => {
    const token = localStorage.getItem("token");
    const updatedModule = { ...modules[index], title: editedModule };

    // Update on server
    fetch(`${API_URL}/courses/${courseId}/modules/${modules[index]._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: editedModule }),
    })
      .then(res => res.json())
      .then((data) => {
        const updatedModules = [...modules];
        updatedModules[index] = data.updatedModule || updatedModule; // Prefer backend response if available
        setModules(updatedModules);
        setEditingIndex(null);
        setEditedModule("");
      })
      .catch(err => console.error("Error updating module title", err));
  };

  const handleDelete = (index) => {
    const updatedModules = modules.filter((_, i) => i !== index);
    setModules(updatedModules);
  };

  if (!course) return <p>Course not found</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
      <LoginHeader />

      <button
        onClick={() => router.back()}
        className="mb-4 text-blue-500 hover:underline"
      >
        ← Back to Dashboard
      </button>

      <div className="p-6">
        {editingCourse ? (
          <>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="bg-gray-700 text-gray-100 p-2 rounded mb-4 w-full"
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="bg-gray-700 text-gray-100 p-2 rounded mb-4 w-full"
            />
            <button
              onClick={handleSaveCourse}
              className="bg-blue-500 text-white p-2 rounded mr-4"
            >
              Save Changes
            </button>
            <button
              onClick={handleSaveCourse}
              className="bg-red-500 text-white p-2 rounded"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <CourseCard
              key={courseId}
              courseName={course.title}
              progress={course.progress}
              courseId={courseId}
            />
            <h2 className="text-2xl font-bold text-green-400 mb-4">About this Course</h2>
            {
              course.description !== "" ? (
                <p className="text-gray-300 mb-6">{course.description}</p>
              ) : (
                <p className="text-gray-300 mb-6"><em>(No description added.)</em></p>
              )
            }
            <button
              onClick={handleEditCourse}
              className="bg-yellow-400 text-black p-2 rounded mr-4"
            >
              Edit Course
            </button>
            <button
              onClick={handleDeleteCourse}
              className="bg-red-500 text-white p-2 rounded"
            >
              Delete Course
            </button>
          </>
        )}

        <h2 className="text-xl font-bold text-green-400 mt-4 mb-4">Modules:</h2>
        <ul className="space-y-2">
          {modules.map((module, index) => (
            <li
              key={module._id}
              className="flex items-center justify-between bg-gray-800 p-3 rounded-lg shadow-md"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-3 w-5 h-5 accent-green-400 cursor-pointer"
                  checked={module.isFinished}
                  onChange={() => toggleCompletion(index)}
                />
                <span>{module.title}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(index, module.title)}
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
}

export default CourseDetails;
