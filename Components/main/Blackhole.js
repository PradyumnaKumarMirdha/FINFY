'use client'
import React, { useState, useEffect } from "react";

const Blackhole = () => {
  const [showBlackhole, setShowBlackhole] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowBlackhole(true);
    }, 10); // Set the delay time in milliseconds (e.g., 3000 for 3 seconds)

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex flex-col h-full w-full">
      {showBlackhole && (
        <video
          autoPlay
          muted
          loop
          className="rotate-180 absolute top-[-420px] md:top-[-428px] lg:top-[-450px] xl:top-[-430px] 2xl:top-[-42.7vh] left-0 h-full w-full z-0 object-cover"
        >
          <source src="/blackhole.webm" type="video/webm" />
        </video>
      )}
    </div>
  );
};

export default Blackhole;
