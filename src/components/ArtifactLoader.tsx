"use client";

import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const ArtifactLoader = () => {
    const { progress } = useProgress();
    const [show, setShow] = useState(true);

    useEffect(() => {
        if (progress === 100) {
            const timer = setTimeout(() => setShow(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [progress]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    exit={{ opacity: 0 }}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "#050505",
                        zIndex: 9999,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "none"
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                        style={{
                            width: 100,
                            height: 100,
                            border: "1px solid var(--accent)",
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            boxShadow: "0 0 30px rgba(0, 255, 204, 0.2)"
                        }}
                    >
                        <span style={{ fontSize: "0.8rem", letterSpacing: "2px", color: "var(--accent)" }}>
                            {Math.round(progress)}%
                        </span>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        style={{ marginTop: "2rem", fontSize: "0.6rem", letterSpacing: "0.5em", textTransform: "uppercase" }}
                    >
                        Initializing Digital Artifact...
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
