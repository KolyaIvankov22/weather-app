import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CursorProps, Mouse } from "../interface/Interface";

export default function Cursor({ isActive }: CursorProps) {
  const mouse = useRef<Mouse>({ x: 0, y: 0 });
  const delayedMouse = useRef<Mouse>({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);
  const circle = useRef<HTMLDivElement>(null);
  const size = isActive ? 400 : 30;

  const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

  const manageMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;

    mouse.current = {
      x: clientX,
      y: clientY,
    };
  };

  const animate = () => {
    const { x, y } = delayedMouse.current;

    delayedMouse.current = {
      x: lerp(x, mouse.current.x, 0.075),
      y: lerp(y, mouse.current.y, 0.075),
    };

    moveCircle(delayedMouse.current.x, delayedMouse.current.y);

    rafId.current = window.requestAnimationFrame(animate);
  };

  const moveCircle = (x: number, y: number) => {
    if (circle.current) {
      gsap.set(circle.current, { x, y, xPercent: -50, yPercent: -50 });
    }
  };

  useEffect(() => {
    animate();
    window.addEventListener("mousemove", manageMouseMove);
    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
      if (rafId.current) {
        window.cancelAnimationFrame(rafId.current);
      }
    };
  });

  return (
    <div className="relative h-screen">
      <div
        style={{
          backgroundColor: "#ec4e39",
          width: size,
          height: size,
          filter: `blur(${isActive ? 30 : 0}px)`,
          transition: `height 0.3s ease-out, width 0.3s ease-out, filter 0.3s ease-out`,
        }}
        className="fixed top-0 left-0 rounded-full pointer-events-none mix-blend-difference"
        ref={circle}
      />
    </div>
  );
}
