"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Scene, SkillCategory } from "@/components/Scene";
import { useState, useEffect } from "react";
import { ExternalLink, Calendar, GraduationCap, Quote, Smartphone, Linkedin, MapPin, Award } from "lucide-react";
import { workData as mockWork } from "@/data/workExperience";

const skillsList = [
    { name: "Python", category: "technical" as const, info: "Utilized for automation and complex data modeling." },
    { name: "SQL", category: "technical" as const, info: "Expertise in managing and querying data-informed decisions." },
    { name: "Operations", category: "operational" as const, info: "Expertise in workflow optimization and strategic planning." },
    { name: "Project Management", category: "operational" as const, info: "Led large-scale teams to achieve peak efficiency." },
    { name: "Power BI", category: "data" as const, info: "Visualized operational metrics for real-time tracking." },
];

const educationData = [
    { degree: "MSc in Computer Science & Engineering", school: "United International University", date: "Feb 2024 - Present", location: "Madani Avenue, Dhaka" },
    { degree: "BSc in Textile Engineering (Fabric)", school: "Bangladesh University of Textiles", date: "Graduation Year: 2022", info: "CGPA: 3.24", location: "Tejgaon, Dhaka" },
    { degree: "Higher Secondary Certificate (HSC)", school: "Notre Dame College", date: "Graduation Year: 2016", info: "GPA: 5.00", location: "Motijheel, Dhaka" },
    { degree: "Secondary School Certificate (SSC)", school: "Shaheed Police Smrity School & College", date: "Graduation Year: 2014", info: "GPA: 5.00", location: "Mirpur, Dhaka" },
];

const interests = ["Management & Operations", "Process Optimization", "Supply Chain", "Gaming", "Sports", "Travelling"];

const SideNav = () => {
    const sections = ['home', 'about', 'experience', 'skills', 'academic', 'contact'];
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) setActiveSection(entry.target.id);
            });
        }, { threshold: 0.5 });
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    return (
        <div style={{ position: 'fixed', left: '2rem', top: '50%', transform: 'translateY(-50%)', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {sections.map(id => (
                <a
                    key={id}
                    href={`#${id}`}
                    style={{
                        width: '10px', height: '10px', borderRadius: '50%',
                        background: activeSection === id ? 'var(--accent)' : 'rgba(255,255,255,0.2)',
                        transition: 'all 0.3s ease', cursor: 'none'
                    }}
                />
            ))}
        </div>
    );
};

export default function Home() {
    const [activeSkill, setActiveSkill] = useState<SkillCategory>("default");

    return (
        <main>
            <SideNav />
            <Scene activeSkill={activeSkill} setActiveSkill={setActiveSkill} />

            {/* Home Section */}
            <section id="home">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    style={{ textAlign: "center", pointerEvents: "none", padding: "0 2rem" }}
                >
                    <p style={{ letterSpacing: "0.8em", fontSize: "0.7rem", color: "var(--accent)", marginBottom: "2rem", textTransform: "uppercase" }}>
                        Operations Leader // MSc in CSE candidate
                    </p>
                    <h1 style={{
                        fontSize: "clamp(3rem, 12vw, 10rem)",
                        lineHeight: 0.8,
                        fontWeight: 900,
                        color: "white",
                        opacity: 0.03,
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "100%",
                        whiteSpace: "nowrap",
                        fontFamily: "var(--font-syne)"
                    }}>
                        STRATEGIZE
                    </h1>
                    <h2 style={{ fontSize: "clamp(1.5rem, 6vw, 4.5rem)", fontWeight: 200, letterSpacing: "-0.02em", fontFamily: "var(--font-syne)" }}>
                        MD SAHIDUL ISLAM TURAB
                    </h2>
                    <div style={{ display: "flex", gap: "2rem", justifyContent: "center", marginTop: "2rem", opacity: 0.6, fontSize: "0.8rem", pointerEvents: "auto" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}><MapPin size={14} /> Mirpur, Dhaka</span>
                        <a href="tel:+8801946921337" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "inherit", textDecoration: "none" }}><Smartphone size={14} /> +8801946921337</a>
                        <a href="https://www.linkedin.com/in/sahidulturab/" target="_blank" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "inherit", textDecoration: "none" }}><Linkedin size={14} /> LinkedIn</a>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 1 }}
                        style={{
                            position: "absolute",
                            bottom: "-20vh",
                            left: "50%",
                            transform: "translateX(-50%)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "1rem"
                        }}
                    >
                        <span style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.4 }}>Scroll to explore my journey</span>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, var(--accent), transparent)" }}
                        />
                    </motion.div>
                </motion.div>
            </section>

            {/* Profile Section */}
            <section id="about">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    style={{ maxWidth: "800px", textAlign: "left", padding: "0 2rem" }}
                >
                    <h2 style={{ fontSize: "0.8rem", letterSpacing: "0.5em", color: "var(--accent)", marginBottom: "2rem" }}>PROFILE</h2>
                    <p style={{
                        fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
                        lineHeight: 1.4,
                        fontWeight: 300,
                        color: "white",
                        borderLeft: "2px solid var(--accent)",
                        paddingLeft: "2rem"
                    }}>
                        "Bridging <span style={{ color: "var(--accent)" }}>Textile Engineering</span> with an <span style={{ color: "var(--accent)" }}>MSc in Computer Science</span>.
                        I am an Operations Leader specializing in optimizing workflows and leading cross-functional teams to achieve peak efficiency."
                    </p>
                </motion.div>
            </section>

            {/* Experience Section (Career Path) */}
            <section id="experience" style={{ minHeight: "350vh", alignItems: "flex-end", paddingRight: "10vw" }}>
                <div style={{ maxWidth: "600px", width: "100%", position: "relative" }}>
                    <h2 style={{ fontSize: "0.8rem", letterSpacing: "0.5em", color: "var(--accent)", marginBottom: "4rem", textAlign: "right" }}>CAREER PATH</h2>

                    <div style={{ display: "flex", flexDirection: "column", gap: "25vh" }}>
                        {mockWork.map((work, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ margin: "-10%" }}
                                transition={{ duration: 0.8 }}
                                style={{
                                    background: "rgba(255, 255, 255, 0.03)",
                                    padding: "2.5rem",
                                    borderRadius: "16px",
                                    border: "1px solid rgba(255, 255, 255, 0.1)",
                                    backdropFilter: "blur(20px)",
                                    textAlign: "left"
                                }}
                            >
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                                    <div>
                                        <h3 style={{ fontSize: "1.5rem", color: "white", marginBottom: "0.2rem" }}>{work.company}</h3>
                                        <p style={{ fontSize: "0.8rem", color: "var(--accent)", opacity: 0.8 }}>{work.location} // {work.role}</p>
                                    </div>
                                    {work.achievement && (
                                        <span style={{
                                            background: "rgba(255, 215, 0, 0.1)",
                                            color: "#ffd700",
                                            padding: "4px 12px",
                                            borderRadius: "20px",
                                            fontSize: "0.6rem",
                                            fontWeight: "bold",
                                            border: "1px solid #ffd700",
                                            textTransform: "uppercase",
                                            letterSpacing: "1px",
                                            whiteSpace: "nowrap"
                                        }}>
                                            Key Achievement
                                        </span>
                                    )}
                                </div>

                                <p style={{ fontSize: "1rem", color: "white", marginBottom: "1.5rem", lineHeight: 1.5, opacity: 0.9 }}>{work.description}</p>

                                {work.achievement && (
                                    <p style={{ color: "#ffd700", fontWeight: "bold", fontSize: "0.9rem", marginBottom: "1rem" }}>★ {work.achievement}</p>
                                )}

                                <ul style={{ listStyle: "none", padding: 0 }}>
                                    {work.bullets?.map((bullet, idx) => (
                                        <li key={idx} style={{
                                            fontSize: "0.85rem",
                                            color: "rgba(255,255,255,0.7)",
                                            marginBottom: "0.5rem",
                                            paddingLeft: "1.2rem",
                                            position: "relative"
                                        }}>
                                            <span style={{ position: "absolute", left: 0, color: "var(--accent)" }}>•</span>
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Skills Section (Intelligence Dashboard) */}
            <section id="skills">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    style={{ width: "100%", maxWidth: "1200px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", padding: "0 2rem" }}
                >
                    <h2 style={{ fontSize: "0.8rem", letterSpacing: "0.5em", color: "var(--accent)", marginBottom: "1rem" }}>INTELLIGENCE DASHBOARD</h2>
                    <h3 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "3rem", fontFamily: "var(--font-syne)" }}>TECHNICAL OVERVIEW</h3>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", width: "100%" }}>
                        <div style={{ background: "rgba(255,255,255,0.02)", padding: "2rem", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)" }}>
                            <h4 style={{ color: "#ffd700", fontSize: "0.8rem", marginBottom: "1.5rem", letterSpacing: "2px" }}>DATA & ANALYSIS</h4>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center" }}>
                                {["SQL", "Power BI", "Python"].map(s => <span key={s} style={{ fontSize: "0.7rem", padding: "5px 12px", border: "1px solid rgba(255,215,0,0.3)", borderRadius: "20px", color: "#ffd700" }}>{s}</span>)}
                            </div>
                        </div>
                        <div style={{ background: "rgba(255,255,255,0.02)", padding: "2rem", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)" }}>
                            <h4 style={{ color: "#4285f4", fontSize: "0.8rem", marginBottom: "1.5rem", letterSpacing: "2px" }}>OPERATIONAL TOOLS</h4>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center" }}>
                                {["MS Office", "Google Workspace", "WordPress"].map(s => <span key={s} style={{ fontSize: "0.7rem", padding: "5px 12px", border: "1px solid rgba(66,133,244,0.3)", borderRadius: "20px", color: "#4285f4" }}>{s}</span>)}
                            </div>
                        </div>
                        <div style={{ background: "rgba(255,255,255,0.02)", padding: "2rem", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)" }}>
                            <h4 style={{ color: "#00ffcc", fontSize: "0.8rem", marginBottom: "1.5rem", letterSpacing: "2px" }}>STRATEGIC STRATEGY</h4>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", justifyContent: "center" }}>
                                {["Management", "Optimization", "Supply Chain"].map(s => <span key={s} style={{ fontSize: "0.7rem", padding: "5px 12px", border: "1px solid rgba(0,255,204,0.3)", borderRadius: "20px", color: "#00ffcc" }}>{s}</span>)}
                            </div>
                        </div>
                    </div>

                    <p style={{ marginTop: "4rem", opacity: 0.4, fontSize: "0.7rem", letterSpacing: "2px" }}>INTERACTIVE 3D NODES ACTIVE ABOVE // HOVER TO ANALYZE PROFICIENCY</p>
                </motion.div>
            </section>

            {/* Education & Leadership (Dual Path) */}
            <section id="academic" style={{ minHeight: "150vh" }}>
                <div style={{ maxWidth: "1200px", width: "100%", padding: "0 2rem" }}>
                    <h2 style={{ fontSize: "0.8rem", letterSpacing: "0.5em", color: "var(--accent)", marginBottom: "4rem", textAlign: "center" }}>ACADEMIC FOUNDATION</h2>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "3rem" }}>
                        {/* MSc Path */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            style={{
                                background: "rgba(255, 255, 255, 0.03)",
                                padding: "3rem",
                                borderRadius: "24px",
                                border: "1px solid rgba(0, 255, 204, 0.2)",
                                backdropFilter: "blur(30px)",
                                position: "relative",
                                overflow: "hidden"
                            }}
                        >
                            <div style={{ position: "absolute", top: 0, right: 0, width: "100px", height: "100px", background: "radial-gradient(circle at center, rgba(0, 255, 204, 0.1), transparent 70%)" }} />
                            <GraduationCap size={40} style={{ color: "var(--accent)", marginBottom: "2rem" }} />
                            <h3 style={{ fontSize: "1.8rem", marginBottom: "0.5rem", fontFamily: "var(--font-syne)" }}>MSc in Computer Science & Engineering</h3>
                            <p style={{ color: "var(--accent)", fontSize: "1rem", marginBottom: "1rem" }}>United International University</p>
                            <p style={{ opacity: 0.5, fontSize: "0.8rem", marginBottom: "2rem" }}>Feb 2024 - Present | Madani Avenue, Dhaka</p>

                            <div className="course-trigger" style={{ position: "relative" }}>
                                <button style={{
                                    background: "rgba(255,255,255,0.05)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    color: "white",
                                    padding: "10px 20px",
                                    borderRadius: "30px",
                                    fontSize: "0.7rem",
                                    letterSpacing: "1px",
                                    textTransform: "uppercase"
                                }}>
                                    View Tech Stack
                                </button>
                                <div className="course-list" style={{
                                    position: "absolute", top: "100%", left: 0, width: "100%",
                                    background: "black", border: "1px solid var(--accent)",
                                    padding: "1rem", borderRadius: "12px", marginTop: "1rem",
                                    opacity: 0, pointerEvents: "none", transition: "all 0.3s ease",
                                    zIndex: 10
                                }}>
                                    <p style={{ fontSize: "0.7rem", color: "var(--accent)", marginBottom: "0.5rem" }}>CORE SUBJECTS:</p>
                                    <ul style={{ listStyle: "none", padding: 0, fontSize: "0.8rem", color: "white", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                                        <li>• Advanced Python</li>
                                        <li>• Data Structures</li>
                                        <li>• Algorithms</li>
                                        <li>• Database Systems</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>

                        {/* BSc Path */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            style={{
                                background: "rgba(255, 255, 255, 0.03)",
                                padding: "3rem",
                                borderRadius: "24px",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                backdropFilter: "blur(30px)",
                                position: "relative"
                            }}
                        >
                            <Award size={40} style={{ color: "white", marginBottom: "2rem", opacity: 0.5 }} />
                            <h3 style={{ fontSize: "1.8rem", marginBottom: "0.5rem", fontFamily: "var(--font-syne)" }}>BSc in Textile Engineering</h3>
                            <p style={{ color: "white", opacity: 0.6, fontSize: "1rem", marginBottom: "0.5rem" }}>Bangladesh University of Textiles (BUTEX)</p>
                            <p style={{ color: "var(--accent)", fontWeight: "bold", fontSize: "1.1rem" }}>CGPA: 3.24</p>
                            <p style={{ opacity: 0.5, fontSize: "0.8rem", marginBottom: "2rem" }}>Class of 2022 | Fabric Engineering</p>
                            <button style={{
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                color: "white",
                                padding: "10px 20px",
                                borderRadius: "30px",
                                fontSize: "0.7rem",
                                letterSpacing: "1px",
                                textTransform: "uppercase"
                            }}>
                                View Core Skills
                            </button>
                        </motion.div>
                    </div>

                    {/* School Foundation */}
                    <div style={{ marginTop: "4rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
                        <div style={{ borderLeft: "1px solid rgba(255,255,255,0.1)", paddingLeft: "1.5rem" }}>
                            <h4 style={{ fontSize: "0.9rem", color: "white" }}>Notre Dame College</h4>
                            <p style={{ fontSize: "0.8rem", color: "var(--accent)" }}>HSC | GPA: 5.00</p>
                            <p style={{ fontSize: "0.7rem", opacity: 0.4 }}>Class of 2016 // Science</p>
                        </div>
                        <div style={{ borderLeft: "1px solid rgba(255,255,255,0.1)", paddingLeft: "1.5rem" }}>
                            <h4 style={{ fontSize: "0.9rem", color: "white" }}>Shaheed Police Smrity School</h4>
                            <p style={{ fontSize: "0.8rem", color: "var(--accent)" }}>SSC | GPA: 5.00</p>
                            <p style={{ fontSize: "0.7rem", opacity: 0.4 }}>Class of 2014 // Science</p>
                        </div>
                    </div>
                </div>
                <style jsx>{`
                    .course-trigger:hover .course-list {
                        opacity: 1;
                        pointer-events: all;
                        transform: translateY(-5px);
                    }
                `}</style>
            </section>

            {/* Contact Section */}
            <section id="contact">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    style={{ maxWidth: "600px", textAlign: "center", padding: "0 2rem" }}
                >
                    <h2 style={{ fontSize: "0.8rem", letterSpacing: "0.5em", color: "var(--accent)", marginBottom: "1rem" }}>CONTACT</h2>
                    <h3 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "1.5rem" }}>THE SINGULARITY</h3>
                    <p style={{ opacity: 0.6, fontSize: "1.1rem", lineHeight: 1.6, marginBottom: "3rem" }}>
                        Ready to optimize your next project or discuss the intersection of operations and technology.
                    </p>
                    <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
                        <a
                            href="mailto:sahidulturab81@gmail.com"
                            style={{
                                padding: "1.2rem 2.5rem",
                                border: "1px solid var(--accent)",
                                color: "white",
                                textDecoration: "none",
                                letterSpacing: "0.3em",
                                fontSize: "0.75rem",
                                textTransform: "uppercase",
                                transition: "all 0.3s ease",
                                background: "rgba(0, 255, 204, 0.05)"
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "black"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0, 255, 204, 0.05)"; e.currentTarget.style.color = "white"; }}
                        >
                            SEND MESSAGE
                        </a>
                        <a
                            href="https://calendly.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                padding: "1.2rem 2.5rem",
                                border: "1px solid rgba(255,255,255,0.2)",
                                color: "white",
                                textDecoration: "none",
                                letterSpacing: "0.3em",
                                fontSize: "0.75rem",
                                textTransform: "uppercase",
                                transition: "all 0.3s ease",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.8rem"
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
                        >
                            <Calendar size={14} /> BOOK A CALL
                        </a>
                    </div>
                </motion.div>
            </section>

            <footer style={{ padding: "4rem 2rem", fontSize: "0.6rem", letterSpacing: "0.2em", opacity: 0.3, textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                © 2026 MD SAHIDUL ISLAM TURAB // OPERATIONS STRATEGIST // DESIGNED AS A DIGITAL ARTIFACT
            </footer>
        </main>
    );
}
