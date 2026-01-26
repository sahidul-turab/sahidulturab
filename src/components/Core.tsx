"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html, Text } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SkillCategory } from "./Scene";
import { workData as mockWork } from "@/data/workExperience";

gsap.registerPlugin(ScrollTrigger);

const SHARD_COUNT = 30;


const skills = [
    { name: "Python", category: "technical" as const, info: "Utilized for automation and complex data modeling." },
    { name: "SQL", category: "technical" as const, info: "Utilized SQL for data-informed decisions." },
    { name: "Operations", category: "operational" as const, info: "Expertise in workflow optimization and strategic planning." },
    { name: "Project Management", category: "operational" as const, info: "Led large-scale teams to achieve peak efficiency." },
    { name: "Power BI", category: "data" as const, info: "Visualized operational metrics for real-time tracking." },
];

const starSkills = [
    // Data & Analysis
    { name: "SQL", category: "data", color: "#ffd700", level: 90, info: "Utilized for data-informed decision making and program enhancements at Shikho." },
    { name: "Power BI", category: "data", color: "#f2c811", level: 85, info: "Utilized for data-informed decision making and program enhancements at Shikho." },
    { name: "Python", category: "data", color: "#3776ab", level: 80 },

    // Operational Tools
    { name: "MS Office", category: "tools", color: "#d83b01", level: 95 },
    { name: "Google Workspace", category: "tools", color: "#4285f4", level: 95 },
    { name: "WordPress", category: "tools", color: "#21759b", level: 75 },

    // Strategic Interests
    { name: "Management", category: "strategy", color: "#00ffcc", level: 90 },
    { name: "Optimization", category: "strategy", color: "#00ffcc", level: 90 },
    { name: "Supply Chain", category: "strategy", color: "#00ffcc", level: 80 }
];

const noiseGLSL = `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy) );
    vec3 x0 =   v - i + dot(i, C.xxx) ;
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min( g.xyz, l.zxy );
    vec3 i2 = max( g.xyz, l.zxy );
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute( permute( permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_ );
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4( x.xy, y.xy );
    vec4 b1 = vec4( x.zw, y.zw );
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
    vec3 p0 = vec3(a0.xy,h.x);
    vec3 p1 = vec3(a0.zw,h.y);
    vec3 p2 = vec3(a1.xy,h.z);
    vec3 p3 = vec3(a1.zw,h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
  }
`;

const playShimmer = () => {
    try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(2000, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.5);
        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.5);
    } catch (e) { }
};

const Fragment = ({ index, data, onClick, isSelected }: { index: number, data: any, onClick: () => void, isSelected: boolean }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const work = mockWork[index % mockWork.length];

    useFrame((state) => {
        if (meshRef.current && hovered && !isSelected) {
            meshRef.current.rotation.x += 0.02;
            meshRef.current.rotation.y += 0.02;
        }
        if (meshRef.current && isSelected) {
            meshRef.current.rotation.y += 0.08;
        }
    });

    return (
        <mesh
            ref={meshRef}
            rotation={data.rotation}
            onPointerOver={() => { setHovered(true); data.onHover?.(true); }}
            onPointerOut={() => { setHovered(false); data.onHover?.(false); }}
            onClick={onClick}
        >
            <icosahedronGeometry args={[1, 0]} />
            <meshPhysicalMaterial
                color={data.color || (isSelected ? "#00ffcc" : (hovered ? "#00ffcc" : "#ffffff"))}
                metalness={0.05}
                roughness={0.02}
                transmission={1.0}
                thickness={3.0}
                ior={1.6}
                transparent
                opacity={(hovered || isSelected || data.active) ? 1 : 0.6}
                clearcoat={1}
                clearcoatRoughness={0}
            />
            {hovered && !isSelected && (
                <Html distanceFactor={10}>
                    <div style={{
                        background: "rgba(0,0,0,0.85)",
                        padding: "15px 20px",
                        borderRadius: "12px",
                        border: `1px solid ${data.color || "#00ffcc"}`,
                        color: "white",
                        pointerEvents: "none",
                        whiteSpace: "nowrap",
                        transform: "translate(-50%, -130%)",
                        backdropFilter: "blur(20px)",
                        boxShadow: `0 0 20px ${data.color}44`
                    }}>
                        <strong style={{ display: "block", color: data.color || "#00ffcc", fontSize: "0.9rem", marginBottom: "8px" }}>{data.skill}</strong>
                        <div style={{ width: "120px", height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "2px", overflow: "hidden" }}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${data.level}%` }}
                                style={{ height: "100%", background: data.color || "#00ffcc" }}
                            />
                        </div>
                        {data.info && (
                            <p style={{ fontSize: "0.6rem", marginTop: "10px", opacity: 0.7, maxWidth: "150px", whiteSpace: "normal", lineHeight: 1.3 }}>
                                {data.info}
                            </p>
                        )}
                    </div>
                </Html>
            )}
        </mesh>
    );
};

export const Core = ({ mouse, faceData, activeSkill, setActiveSkill }: { mouse: THREE.Vector2, faceData: { x: number, y: number }, activeSkill: SkillCategory, setActiveSkill: (skill: SkillCategory) => void }) => {
    const groupRef = useRef<THREE.Group>(null);
    const coreRef = useRef<THREE.Mesh>(null);
    const techRef = useRef<THREE.Mesh>(null);
    const operRef = useRef<THREE.Mesh>(null);
    const dataRef = useRef<THREE.Mesh>(null);
    const shardsRef = useRef<(THREE.Group | null)[]>([]);
    const mscTextRef = useRef<THREE.Group>(null);
    const { camera } = useThree();
    const [activeProject, setActiveProject] = useState<number | null>(null);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
    }), []);

    const shardData = useMemo(() => {
        return Array.from({ length: SHARD_COUNT }).map((_, i) => {
            const isSkill = i < starSkills.length;
            const skill = isSkill ? starSkills[i] : null;

            // Distribute skill nodes in 3 distinct zones
            let xOff = 0;
            if (isSkill) {
                if (skill?.category === 'data') xOff = -4;
                else if (skill?.category === 'strategy') xOff = 4;
            }

            return {
                explodePos: new THREE.Vector3((Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5),
                starPos: new THREE.Vector3(
                    xOff + (Math.random() - 0.5) * 2,
                    (Math.random() - 0.5) * 4,
                    (Math.random() - 0.5) * 2
                ),
                rotation: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
                scale: isSkill ? 0.4 : 0.2 + Math.random() * 0.25,
                color: skill?.color || null,
                skill: skill?.name || null,
                level: (skill as any)?.level || 0,
                info: (skill as any)?.info || null,
                category: skill?.category || 'default'
            };
        });
    }, []);

    const getGlowColor = () => {
        switch (activeSkill) {
            case "technical": return "#3776ab"; // Python Blueish
            case "operational": return "#00ffcc"; // Accent
            case "data": return "#ffd700"; // SQL Gold
            default: return "#ffffff";
        }
    };

    const glowColor = getGlowColor();

    useFrame((state) => {
        uniforms.uTime.value = state.clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.001;
            groupRef.current.rotation.y += (faceData.x * 0.2 - (groupRef.current.rotation.y - state.clock.getElapsedTime() * 0.001)) * 0.1;
            groupRef.current.rotation.x += (faceData.y * 0.2 - groupRef.current.rotation.x) * 0.1;
        }

        const contactTrigger = ScrollTrigger.getById("contact-trigger");
        const progress = contactTrigger?.progress ?? 0;
        if (progress > 0.05) {
            shardsRef.current.forEach((shard) => {
                if (!shard) return;
                const targetX = mouse.x * 4;
                const targetY = mouse.y * 4;
                shard.position.x += (targetX - shard.position.x) * 0.1;
                shard.position.y += (targetY - shard.position.y) * 0.1;
                shard.position.z += (0 - shard.position.z) * 0.1;
                shard.rotation.z += 0.05;
                if (progress > 0.8) shard.scale.setScalar(shard.scale.x * 0.9);
            });
        }
    });

    const handleShardClick = (index: number) => {
        playShimmer();
        if (activeProject === index) {
            gsap.to(camera.position, { z: 7, x: 0, y: 0, duration: 1.5, ease: "power3.inOut" });
            setActiveProject(null);
        } else {
            const shard = shardsRef.current[index];
            if (shard) {
                playShimmer();
                const targetPos = new THREE.Vector3().setFromMatrixPosition(shard.matrixWorld);
                gsap.to(camera.position, {
                    x: targetPos.x,
                    y: targetPos.y,
                    z: targetPos.z + 1.2,
                    duration: 1.2,
                    ease: "expo.inOut",
                });
                setActiveProject(index);
            }
        }
    };

    useEffect(() => {
        const refs = {
            default: coreRef.current,
            technical: techRef.current,
            operational: operRef.current,
            data: dataRef.current
        };

        Object.keys(refs).forEach(key => {
            const mesh = refs[key as keyof typeof refs];
            if (!mesh) return;

            if (activeSkill === key) {
                gsap.to(mesh.scale, { x: 1, y: 1, z: 1, duration: 0.8, ease: "expo.out" });
                gsap.to(mesh.position, { y: 0, duration: 0.8, ease: "expo.out" });
            } else {
                gsap.to(mesh.scale, { x: 0, y: 0, z: 0, duration: 0.8, ease: "expo.in" });
                gsap.to(mesh.position, { y: -2, duration: 0.8, ease: "expo.in" });
            }
        });
    }, [activeSkill]);

    useEffect(() => {
        const core = coreRef.current;
        if (!core) return;

        gsap.to([core.scale, techRef.current?.scale, operRef.current?.scale, dataRef.current?.scale], {
            x: 0, y: 0, z: 0,
            scrollTrigger: { trigger: "#experience", start: "top center", end: "bottom bottom", scrub: true }
        });

        shardsRef.current.forEach((shard, i) => {
            if (!shard) return;
            const data = shardData[i];
            gsap.set(shard.scale, { x: 0, y: 0, z: 0 });
            gsap.set(shard.position, { x: 0, y: 0, z: 0 });

            gsap.to(shard.position, {
                x: data.explodePos.x, y: data.explodePos.y, z: data.explodePos.z,
                scrollTrigger: { trigger: "#experience", start: "top bottom", end: "bottom bottom", scrub: true }
            });

            gsap.to(shard.scale, {
                x: data.scale, y: data.scale, z: data.scale,
                scrollTrigger: { trigger: "#experience", start: "top bottom", end: "bottom bottom", scrub: true }
            });

            gsap.to(shard.position, {
                x: data.starPos.x, y: data.starPos.y, z: data.starPos.z,
                scrollTrigger: { trigger: "#skills", start: "top bottom", end: "bottom bottom", scrub: true }
            });

            gsap.to(".skill-label-" + i, {
                opacity: 1,
                scrollTrigger: {
                    trigger: "#skills",
                    start: "top center",
                    end: "bottom center",
                    scrub: true,
                }
            });

            ScrollTrigger.create({ id: "contact-trigger", trigger: "#contact", start: "top bottom", end: "bottom bottom", scrub: true });
        });

        return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
    }, [shardData]);

    const onBeforeCompile = (shader: any) => {
        shader.uniforms.uTime = uniforms.uTime;
        shader.vertexShader = noiseGLSL + shader.vertexShader.replace(`#include <begin_vertex>`, `
      #include <begin_vertex>
      float noise = snoise(transformed * 1.5 + uTime * 0.4);
      transformed += normal * noise * 0.2;
    `);
    };

    const currentWork = activeProject !== null ? mockWork[activeProject % mockWork.length] : null;

    return (
        <group ref={groupRef}>
            <mesh ref={coreRef} scale={[1, 1, 1]}>
                <sphereGeometry args={[1.5, 128, 128]} />
                <meshPhysicalMaterial
                    color={glowColor}
                    metalness={0.1}
                    roughness={0.05}
                    transmission={1.0}
                    thickness={2.0}
                    ior={1.5}
                    transparent
                    onBeforeCompile={onBeforeCompile}
                    emissive={activeSkill !== "default" ? glowColor : "#000000"}
                    emissiveIntensity={activeSkill !== "default" ? 0.5 : 0}
                />
            </mesh>

            <mesh ref={techRef} scale={[0, 0, 0]} position={[0, -2, 0]}>
                <boxGeometry args={[2, 2, 2]} />
                <meshPhysicalMaterial color="#ffffff" metalness={0.9} roughness={0.1} transmission={0.9} thickness={3.0} ior={1.7} transparent />
            </mesh>

            <mesh ref={operRef} scale={[0, 0, 0]} position={[0, -2, 0]}>
                <torusKnotGeometry args={[1, 0.4, 128, 32]} />
                <meshPhysicalMaterial color="#ffffff" metalness={0.1} roughness={0.05} transmission={1.0} thickness={2.0} ior={1.5} transparent />
            </mesh>

            <mesh ref={dataRef} scale={[0, 0, 0]} position={[0, -2, 0]}>
                <icosahedronGeometry args={[1.5, 0]} />
                <meshPhysicalMaterial color="#00ffcc" metalness={0.2} roughness={0.1} transmission={1.0} thickness={1.5} ior={1.4} transparent />
            </mesh>

            {shardData.map((data: any, i) => {
                const isSkillShard = i < starSkills.length;

                return (
                    <group key={i} ref={(el) => { shardsRef.current[i] = el; }}>
                        <Fragment
                            index={i}
                            data={{
                                ...data,
                                onHover: (isHovered: boolean) => {
                                    if (isSkillShard && isHovered) {
                                        setActiveSkill(data.category === 'data' ? 'data' : (data.category === 'strategy' ? 'operational' : 'technical'));
                                    } else if (isSkillShard && !isHovered) {
                                        setActiveSkill("default");
                                    }
                                }
                            }}
                            isSelected={activeProject === i}
                            onClick={() => handleShardClick(i)}
                        />
                        {isSkillShard && (
                            <Html distanceFactor={10} position={[0, 0, 0]}>
                                <div style={{
                                    opacity: 0,
                                    color: data.color || "#00ffcc",
                                    fontSize: "12px",
                                    letterSpacing: "3px",
                                    textTransform: "uppercase",
                                    pointerEvents: "none",
                                    marginTop: "40px",
                                    transform: "translateX(-50%)",
                                    fontFamily: "var(--font-syne)",
                                    fontWeight: 800,
                                    textShadow: `0 0 10px ${data.color || "#00ffcc"}`
                                }}
                                    className={`skill-label skill-label-${i}`}>
                                    {data.skill}
                                </div>
                            </Html>
                        )}
                    </group>
                );
            })}

            {activeProject !== null && currentWork && (
                <Html distanceFactor={10} position={[0, 0, 0]}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="project-reveal"
                        style={{
                            background: "rgba(255, 255, 255, 0.03)",
                            padding: "50px",
                            borderRadius: "24px",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            color: "white",
                            width: "500px",
                            backdropFilter: "blur(40px)",
                            transform: "translate(-50%, -50%)",
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px"
                        }}
                    >
                        <div>
                            <h2 style={{
                                color: "white",
                                fontSize: "2.5rem",
                                marginBottom: "5px",
                                lineHeight: "1.1",
                                fontFamily: "var(--font-syne)",
                                fontWeight: 800
                            }}>
                                {currentWork.company}
                            </h2>
                            <h4 style={{
                                color: "var(--accent)",
                                opacity: 0.8,
                                fontSize: "0.9rem",
                                letterSpacing: "2px",
                                textTransform: "uppercase"
                            }}>
                                {currentWork.role}
                            </h4>
                        </div>

                        <div style={{
                            height: "1px",
                            background: "linear-gradient(to right, var(--accent), transparent)",
                            width: "100%"
                        }} />

                        <div>
                            <h5 style={{
                                color: "rgba(255,255,255,0.5)",
                                textTransform: "uppercase",
                                letterSpacing: "2px",
                                fontSize: "0.7rem",
                                marginBottom: "15px"
                            }}>
                                Strategic Impact
                            </h5>
                            <p style={{
                                lineHeight: 1.6,
                                fontSize: "1.2rem",
                                color: "white",
                                fontWeight: 300
                            }}>
                                {currentWork.description}
                            </p>
                        </div>

                        <button
                            onClick={() => handleShardClick(activeProject)}
                            style={{
                                marginTop: "20px",
                                width: "fit-content",
                                padding: "12px 30px",
                                background: "white",
                                border: "none",
                                color: "black",
                                cursor: "pointer",
                                borderRadius: "4px",
                                fontWeight: "bold",
                                textTransform: "uppercase",
                                letterSpacing: "2px",
                                fontSize: "0.7rem",
                                transition: "all 0.3s ease"
                            }}
                        >
                            CLOSE ARTIFACT
                        </button>
                    </motion.div>
                </Html>
            )}
        </group>
    );
};
