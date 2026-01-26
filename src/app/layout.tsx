import type { Metadata } from "next";
import { Outfit, Syne } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";
import { FloatingUI } from "@/components/FloatingUI";
import { ArtifactLoader } from "@/components/ArtifactLoader";

const outfit = Outfit({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-outfit",
});

const syne = Syne({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-syne",
});

export const metadata: Metadata = {
    title: "Sahidul Turab | Operations Leader & MSc in CSE",
    description: "Portfolio of MD Sahidul Islam Turab, an Operations professional at Shikho specializing in process optimization and technical management",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${outfit.variable} ${syne.variable}`}>
            <body>
                <div className="grid-overlay" aria-hidden="true" />
                <ArtifactLoader />
                <CustomCursor />
                <FloatingUI />
                {children}
            </body>
        </html>
    );
}
