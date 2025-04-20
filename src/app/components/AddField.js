"use client"; 

import { useState } from "react";

export default function AddField({ placeholder, onAdd }) {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim() === "") return; // Prevent adding empty items
    onAdd(inputValue); // Send new item to parent
    setInputValue(""); // Clear input field
  };

  //Display input field for courses and modules
  return (
    <div className="flex gap-2 mt-4">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className="bg-gray-700 text-gray-300 p-2 rounded-md border-none w-full"
      />
      <button
        onClick={handleAdd}
        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
      >
        Add
      </button>
    </div>
  );
}
