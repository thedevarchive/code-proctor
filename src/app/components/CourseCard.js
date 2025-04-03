

export default function CourseCard({ courseName, progress, courseId }) {
  return (
    <div key={courseId} className="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
      <h2 className="text-xl font-semibold">{courseName}</h2>
      <div className="h-3 bg-gray-700 mt-2">
        <div
          className="h-full bg-green-400"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="mt-1">Progress: {progress}%</p>
    </div>
  );
}
