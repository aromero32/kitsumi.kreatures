"use client"
import { useEffect, useRef, useState } from "react";
import { clamp } from "./utils";
import Photo from "./components/photo";

function App() {
  const trackRef = useRef(null);
  const [mouseDownAt, setMouseDownAt] = useState(0);
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const [prevPercentage, setPrevPercentage] = useState(0);

  function handleMouseDown(evt) {
    setMouseDownAt(evt.clientX);
  }

  function handleMouseMove(evt) {
    if (mouseDownAt === 0) return;

    const mouseDelta = parseFloat(String(mouseDownAt)) - evt.clientX;
    const maxDelta = window.innerWidth / 2;

    const percentage = (mouseDelta / maxDelta) * -100;
    let nextPercentage = parseFloat(String(prevPercentage)) + percentage;

    nextPercentage = clamp(nextPercentage, -100, 0);
    setCurrentPercentage(nextPercentage);

    if (trackRef.current) {
      trackRef.current.animate(
        { transform: `translate(${nextPercentage}%, -50%)` },
        { duration: 1200, fill: "forwards" }
      );

      for (const image of trackRef.current.children) {
        image.animate(
          {
            objectPosition: `${nextPercentage + 100}% 50%`,
          },
          { duration: 1200, fill: "forwards" }
        );
      }
    }
  }

  function handleMouseUp() {
    setMouseDownAt(0);
    setPrevPercentage(currentPercentage);
  }

  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, [handleMouseDown]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseUp]);

  return (
    <div id="image-track" ref={trackRef} draggable={false}>
      <img
        className="image"
        src="/images/profile_pic.jpeg"
        draggable={false}
      />
      <img
        className="image"
        src="/images/spooderman.jpeg"
        draggable={false}
      />
      <img
        className="image"
        src="/images/moon_woman.jpeg"
        draggable={false}
      />
      <img
        className="image"
        src="/images/sce_logo.jpeg"
        draggable={false}
      />
    </div>
  );
}

export default App;
