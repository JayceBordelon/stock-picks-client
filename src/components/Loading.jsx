import React, { useState, useEffect } from 'react';
import "../styles/animation.css";

export default function Loading({ message }) {
  const [loadingText, setLoadingText] = useState(message);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoadingText(prev => {
        // Cycle through the loading text states
        switch (prev) {
          case message:
            return message + ".";
          case message + ".":
            return message + "..";
          case message + "..":
            return message + "...";
          case message + "...":
          default:
            return message;
        }
      });
    }, 500); // Change the text every 500 milliseconds

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-white text-black" style={{ zIndex: 100 }}>
      <img src="https://openclipart.org/download/321033/bullversusbear.svg" alt="Loading" className="w-1/2 max-w-xs mb-4 animate-jolt" />
      <p className="text-2xl sm:text-5xl font-bold">{loadingText}</p>
    </div>
  );
}
