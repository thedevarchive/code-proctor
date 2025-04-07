"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { RiPencilFill, RiDeleteBin6Fill, RiSave2Fill } from "react-icons/ri";
import { ImCross } from "react-icons/im";

import LoginHeader from "@/components/headers/LoginHeader";
import CourseCard from "@/components/CourseCard";
import AddField from "@/components/AddField";


const CourseDetails = () => {
  const router = useRouter();
  const params = useParams();

  const courseId = params.id;
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(0); 
  const [modules, setModules] = useState([]);
  const [editingCourse, setEditingCourse] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedModule, setEditedModule] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
      .then((res) => {
        if(res.status === 403) {
          localStorage.setItem("token", "");
          localStorage.setItem("isLoggedIn", JSON.stringify(false));
          router.push("/auth"); 
          return; 
        }
        return res.json(); 
      })
      .then((data) => setCourse(data.course))
      .catch((err) => console.error(err));
  }, [courseId, router]);

  // Set modules when course is fetched
  useEffect(() => {
    if (course && course.modules) {
      setProgress(course.progress); 
      setModules(course.modules);
    }
  }, [course]);

  const handleAddModule = (newModule) => {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/courses/${courseId}/modules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorisation: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: newModule,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProgress(data.progress); 
        setModules(data.modules); 
      })
      .catch((err) => console.error(err));
  };

  const handleEditCourse = () => {
    setEditingCourse(true);
    setEditedTitle(course.title);
    setEditedDescription(course.description);
  };

  const handleCancelCourse = () => {
    setEditingCourse(false);
    setEditedTitle("");
    setEditedDescription("");
  }

  const handleSaveCourse = () => {
    const token = localStorage.getItem("token");

    fetch(`${API_URL}/courses/${courseId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorisation: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: editedTitle,
        description: editedDescription,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProgress(data.progress);
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
        authorisation: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        router.back(); // Redirect to dashboard after delete
      })
      .catch((err) => console.error(err));
  };

  const handleEditModule = (index, currentName) => {
    setEditingIndex(index);
    setEditedModule(currentName);
  };

  const handleCancelModule = () => {
    setEditingIndex(null);
    setEditedModule("");
  };

  const toggleCompletion = (index) => {
    const updatedModules = [...modules];
    updatedModules[index].isFinished = !updatedModules[index].isFinished;
    setModules(updatedModules);

    const token = localStorage.getItem("token");

    // Update the completion status on the server
    fetch(`${API_URL}/courses/${courseId}/modules/${modules[index]._id}/finished`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorisation: `Bearer ${token}`,
      }
    })
      .then((res) => res.json())
      .then((data) => setProgress(data.progress))
      .catch((err) => console.error("Error updating completion status", err));
  };

  const handleSaveModule = (index) => {
    const token = localStorage.getItem("token");
    const updatedModule = { ...modules[index], title: editedModule };

    // Update on server
    fetch(`${API_URL}/courses/${courseId}/modules/${modules[index]._id}/title`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorisation: `Bearer ${token}`,
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

  const handleDeleteModule = (index) => {
    const token = localStorage.getItem("token");
    const updatedModule = modules.filter((_, i) => i !== index);

    // Update on server
    fetch(`${API_URL}/courses/${courseId}/modules/${modules[index]._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorisation: `Bearer ${token}`,
      }
    })
      .then(res => res.json())
      .then((data) => {
        const updatedModules = [...modules];
        updatedModules[index] = data.updatedModule || updatedModule; // Prefer backend response if available

        setProgress(data.progress); 
        setModules(data.modules);
        setEditingIndex(null);
        setEditedModule("");
      })
      .catch(err => console.error("Error updating module title", err));
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
              onClick={handleCancelCourse}
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
              progress={progress}
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
              className="bg-violet-600 text-white p-2 rounded mr-4"
            >
              Edit Course
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
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
                {
                  editingIndex === index ? (
                    <input
                      type="text"
                      value={editedModule}
                      onChange={(e) => setEditedModule(e.target.value)}
                      className="bg-gray-700 text-gray-100 p-1 rounded w-full"
                    />

                  ) : (
                    <span>{module.title}</span>
                  )
                }
              </div>
              <div className="flex space-x-2">
                {
                  editingIndex === index ? (
                    <>
                      <button
                        onClick={() => handleSaveModule(index, module.title)}
                        className="text-blue-400 hover:text-blue-300"
                      >
                        <RiSave2Fill size={20} />
                      </button>
                      <button
                        onClick={() => handleCancelModule()}
                        className="text-red-500 hover:text-red-400"
                      >
                        <ImCross size={19} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEditModule(index, module.title)}
                        className="text-violet-400 hover:text-violet-300"
                      >
                        <RiPencilFill size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteModule(index)}
                        className="text-red-500 hover:text-red-400"
                      >
                        <RiDeleteBin6Fill size={20} />
                      </button>
                    </>
                  )
                }
              </div>
            </li>
          ))}
        </ul>

        <AddField placeholder="Add a new module..." onAdd={handleAddModule} />

        {/* Modal asking if user wants to delete course
            Courses cannot be restored after deletion so user must make sure they want to drop the course */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm text-center">
              <p className="text-white text-lg mb-4">Are you sure you want to delete this course?</p>
              <div className="flex justify-between">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="text-gray-300 border border-gray-500 px-4 py-2 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteCourse}
                  className="text-white bg-red-600 px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default CourseDetails;
