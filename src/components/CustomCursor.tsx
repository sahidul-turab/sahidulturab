"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (cursorRef.current) {
                gsap.to(cursorRef.current, {
                    x: e.clientX,
                    y: e.clientY,
                    duration: 0.1,
                    ease: "power2.out",
                });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <>
            <div
                ref={cursorRef}
                style={{
                    position: "fixed",
                    top: -10,
                    left: -10,
                    width: 20,
                    height: 20,
                    backgroundColor: "var(--accent)",
                    borderRadius: "50%",
                    pointerEvents: "none",
                    zIndex: 9999,
                    mixBlendMode: "difference",
                }}
            />
            <style jsx global>{`
        body {
          cursor: none;
        }
        a, button, [role="button"] {
          cursor: none;
        }
      `}</style>
        </>
    );
};
