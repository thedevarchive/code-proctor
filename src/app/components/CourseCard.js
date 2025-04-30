//Shows the courses that the user is taking and the progress they've made in it
export default function CourseCard({ courseName, courseType, progress, courseId }) {
  //Give the badge a bg colour based on the course type
  const courseTypeColours = {
    Lecture: "bg-purple-600",
    Book: "bg-indigo-600",
    Tutorial: "bg-red-700",
    Practical: "bg-blue-600",
    Certification: "bg-yellow-600",
    Maths: "bg-green-400",
    Hybrid: "bg-gradient-to-r from-red-700 to-purple-600", // 🌈 Gradient
    Other: "bg-gray-600", 
    Default: "bg-gray-900" //fallback option just in case
  };

  return (
    <div key={courseId} className="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-semibold inline-flex gap-3">
        {courseName}
        <span className={`text-xs px-2 py-1.5 rounded-full text-white ${courseTypeColours[courseType] || courseTypeColours.Default}`}>
          {courseType}
        </span>
      </h2>

      <div className="h-3 bg-gray-700 mt-4">
        <div
          className="h-full bg-green-400"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="mt-1">Progress: {progress}%</p>
    </div>
  );
}
