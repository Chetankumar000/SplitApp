import React, { useEffect, useState } from "react";

const colorClasses = {
  "teal-400": "text-teal-400",
  "gray-400": "text-gray-400",
  "yellow-500": "text-yellow-500",
  "red-500": "text-red-500",
  "pink-500": "text-pink-500",
};

const Statement = ({ text, color }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [text]);

  return (
    <div>
      <span
        className={`mt-10 font-bold text-5xl ${colorClasses[color]} ${
          isVisible ? "opacity-100" : "opacity-0"
        } transition-all duration-1000`}
      >
        {text}
      </span>
    </div>
  );
};

export default Statement;
