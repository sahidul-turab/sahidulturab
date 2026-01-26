"use client";

import { useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export const useFaceTracking = () => {
    const [faceData, setFaceData] = useState({ x: 0, y: 0 });
    const faceLandmarkerRef = useRef<FaceLandmarker | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const requestRef = useRef<number | null>(null);

    useEffect(() => {
        const initTracking = async () => {
            try {
                const filesetResolver = await FilesetResolver.forVisionTasks(
                    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
                );

                faceLandmarkerRef.current = await FaceLandmarker.createFromOptions(filesetResolver, {
                    baseOptions: {
                        modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
                        delegate: "GPU"
                    },
                    runningMode: "VIDEO",
                    numFaces: 1
                });

                const video = document.createElement("video");
                video.style.display = "none";
                document.body.appendChild(video);
                videoRef.current = video;

                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                video.srcObject = stream;
                video.play();

                const predict = () => {
                    if (faceLandmarkerRef.current && video.readyState >= 2) {
                        const results = faceLandmarkerRef.current.detectForVideo(video, performance.now());
                        if (results.faceLandmarks?.[0]) {
                            const landmarks = results.faceLandmarks[0];
                            // Nose tip is landmark 4
                            const nose = landmarks[4];
                            // Map 0-1 to -1 to 1, with smoothing
                            setFaceData({
                                x: (nose.x - 0.5) * 2,
                                y: (nose.y - 0.5) * 2
                            });
                        }
                    }
                    requestRef.current = requestAnimationFrame(predict);
                };
                predict();
            } catch (err) {
                console.error("Face tracking failed to initialize:", err);
            }
        };

        initTracking();

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            if (videoRef.current) {
                const stream = videoRef.current.srcObject as MediaStream;
                stream?.getTracks().forEach(track => track.stop());
                videoRef.current.remove();
            }
        };
    }, []);

    return faceData;
};
