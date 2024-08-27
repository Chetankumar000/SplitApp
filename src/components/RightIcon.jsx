import React, { useEffect, useState } from "react";

const RightIcon = ({ icon }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(icon);

  useEffect(() => {
    // Hide the icon first to transition out
    setIsVisible(false);

    const timeout = setTimeout(() => {
      // Update the icon after a short delay
      setCurrentIcon(icon);
      // Then show the new icon to transition in
      setIsVisible(true);
    }, 750); // Adjust delay for smoother transition

    return () => clearTimeout(timeout); // Cleanup timeout on component unmount
  }, [icon]);

  return (
    <div
      className={`col-span-6 m-20 ml-0 flex justify-center items-center transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="text-[30vw] leading-none">{currentIcon}</div>
    </div>
  );
};

export default RightIcon;
