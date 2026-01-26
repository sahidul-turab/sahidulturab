"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail, ExternalLink } from "lucide-react";
import { useRef } from "react";

const playClink = () => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(1200, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.3);
};

const Orb = ({ icon: Icon, label, href, download }: { icon: any, label: string, href: string, download?: string }) => {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            download={download}
            whileHover={{ scale: 1.2, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            onClick={playClink}
            className="action-orb"
            title={label}
        >
            <Icon size={20} />
            <span className="orb-label">{label}</span>
        </motion.a>
    );
};

export const FloatingUI = () => {
    return (
        <div className="floating-ui-container">
            <Orb icon={ExternalLink} label="Download CV" href="/Resume - Md Sahidul Islam Turab.pdf" download="Resume - Md Sahidul Islam Turab.pdf" />
            <Orb icon={Linkedin} label="LinkedIn" href="https://www.linkedin.com/in/sahidulturab/" />
            <Orb icon={Mail} label="Email" href="mailto:sahidulturab81@gmail.com" />
        </div>
    );
};
