import Cursor from "./components/cursor/Cursor";
import WeatherPage from "./components/page/weatherPage";
import Loader from "./components/loader/Loader";

import gsap from "gsap";

import { useState, useEffect, useLayoutEffect } from "react";

export default function App() {
  const [cursorPosition, setCursorPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [loaderFinished, setLoaderFinished] = useState<boolean>(false);
  const [timeline, setTimeline] = useState<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setLoaderFinished(true),
    });
    setTimeline(tl);

    return () => {
      tl.kill();
      return undefined;
    };
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <main>
      <Cursor cursorPosition={cursorPosition} />
      {loaderFinished ? <WeatherPage /> : <Loader timeline={timeline} />}
    </main>
  );
}
