import WeatherPage from "./components/page/weatherPage";
import Loader from "./components/loader/Loader";

import gsap from "gsap";

import { useState, useLayoutEffect } from "react";

export default function App() {
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

  return (
    <main className="font-custom">
      {loaderFinished ? <WeatherPage /> : <Loader timeline={timeline} />}
    </main>
  );
}
