import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const colorClasses = {
  "teal-400": "bg-teal-400",
  "gray-400": "bg-gray-400",
  "yellow-500": "bg-yellow-500",
  "red-500": "bg-red-500",
  "pink-500": "bg-pink-500",
};

const HomeBtn = ({ color }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(false);

    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 800);

    return () => clearTimeout(timeout); // Clear timeout on unmount
  }, [color]);

  return (
    <div>
      <Link to={"/signup"}>
        <button
          className={`${colorClasses[color] || "bg-gray-400"} ${
            isVisible ? "opacity-100" : "opacity-50"
          } transition-all duration-1000 text-white text-lg px-16 py-4 mt-8 rounded-md shadow-md shadow-slate-1000 font-semibold`}
        >
          Sign Up
        </button>
      </Link>
    </div>
  );
};

export default HomeBtn;
