import { useRef, useEffect } from "react";
import { words } from "./data";
import { introAnimation, collapseWords, progressAnimation } from "./animation";
import { LoaderProps } from "../interface/Interface";
import "./style.css";

export default function Loader({ timeline }: LoaderProps) {
  const loader = useRef(null);
  const progressRef = useRef(null);
  const progressNumberRef = useRef(null);
  const wordsGroupRef = useRef(null);

  useEffect(() => {
    timeline &&
      timeline
        .add(introAnimation(wordsGroupRef))
        .add(progressAnimation(progressRef, progressNumberRef), 0)
        .add(collapseWords(loader), "-=1");
  }, [timeline]);

  return (
    <div className="loader__wrapper">
      <div className="loader__progressWrapper">
        <div className="loader__progress" ref={progressRef}></div>
        <span className="loader__progressNumber" ref={progressNumberRef}>
          0
        </span>
      </div>
      <div className="loader" ref={loader}>
        <div className="loader__words">
          <div className="loader__overlay"></div>
          <div className="loader__wordsGroup" ref={wordsGroupRef}>
            {words.map((word, index) => {
              return (
                <span key={index} className="loader__word">
                  {word}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
