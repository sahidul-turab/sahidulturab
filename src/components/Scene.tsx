"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float, ContactShadows } from "@react-three/drei";
import { Suspense, useState, useEffect, useRef } from "react";
import { Core } from "./Core";
import * as THREE from "three";
import { useFaceTracking } from "@/hooks/useFaceTracking";

export type SkillCategory = "default" | "technical" | "operational" | "data";

export const Scene = ({ activeSkill, setActiveSkill }: { activeSkill: SkillCategory, setActiveSkill: (skill: SkillCategory) => void }) => {
    const [mouse, setMouse] = useState(new THREE.Vector2(0, 0));
    const faceData = useFaceTracking();

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMouse(new THREE.Vector2(
                (e.clientX / window.innerWidth) * 2 - 1,
                -(e.clientY / window.innerHeight) * 2 + 1
            ));
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="canvas-container">
            <Canvas
                shadows
                camera={{ position: [0, 0, 7], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                    <pointLight position={[-10, -10, -10]} intensity={1} />
                    <pointLight position={[mouse.x * 10, mouse.y * 10, 5]} intensity={2} color="#00ffcc" />

                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                        <Core mouse={mouse} faceData={faceData} activeSkill={activeSkill} setActiveSkill={setActiveSkill} />
                    </Float>

                    <Environment preset="city" />
                    <ContactShadows
                        position={[0, -3.5, 0]}
                        opacity={0.4}
                        scale={15}
                        blur={2.5}
                        far={4.5}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
};
