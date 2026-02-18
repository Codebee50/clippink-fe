"use client";

import { useState, useEffect, useRef } from "react";

/* ───────────────────────────────────────────────────────
   Sparkle SVG used in the "Finish & Export" card
   ─────────────────────────────────────────────────────── */
const SparkleIcon = ({ className = "" }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
    >
        <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
    </svg>
);

/* ───────────────────────────────────────────────────────
   Small decorative "+" marks scattered on the section
   ─────────────────────────────────────────────────────── */
const CrossMark = ({
    className = "",
    style,
}: {
    className?: string;
    style?: React.CSSProperties;
}) => (
    <span
        className={`absolute text-greys4/40 text-xs select-none pointer-events-none ${className}`}
        style={style}
    >
        +
    </span>
);

/* ───────────────────────────────────────────────────────
   Small decorative dots
   ─────────────────────────────────────────────────────── */
const Dot = ({
    className = "",
    style,
}: {
    className?: string;
    style?: React.CSSProperties;
}) => (
    <span
        className={`absolute w-[3px] h-[3px] rounded-full bg-greys4/30 select-none pointer-events-none ${className}`}
        style={style}
    />
);

/* ───────────────────────────────────────────────────────
   Background image thumbnails for the "Select Background"
   ─────────────────────────────────────────────────────── */
const BackgroundThumbnail = ({ gradient }: { gradient: string }) => (
    <div
        className="w-[52px] h-[52px] rounded-lg flex-shrink-0"
        style={{ background: gradient }}
    />
);

/* ───────────────────────────────────────────────────────
   Tag / chip component used for story tones
   ─────────────────────────────────────────────────────── */
const ToneTag = ({ label }: { label: string }) => (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-senary/20 border border-senary/30 text-senary text-xs font-medium">
        {label}
        <svg
            className="w-3 h-3 opacity-60"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
        >
            <path d="M3 9L9 3M9 3H4M9 3V8" />
        </svg>
    </span>
);

/* ───────────────────────────────────────────────────────
   Sound tag with play icon
   ─────────────────────────────────────────────────────── */
const SoundTag = ({ label }: { label: string }) => (
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-cardborder text-greys2 text-xs font-medium">
        {label}
        <svg className="w-3 h-3 opacity-50" viewBox="0 0 12 12" fill="currentColor">
            <circle cx="6" cy="6" r="5.5" fill="none" stroke="currentColor" strokeWidth="1" />
            <path d="M5 4L8.5 6L5 8V4Z" />
        </svg>
    </span>
);

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function HowItWorks() {
    const sectionRef = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setIsVisible(true);
            },
            { threshold: 0.15 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full overflow-hidden pb-24 px-4 sm:px-6 lg:px-8"
            style={{ backgroundColor: "#08090a" }}
        >
            {/* ── Decorative scattered marks ── */}
            <Dot style={{ top: "8%", left: "12%" }} />
            <Dot style={{ top: "6%", left: "50%" }} />
            <Dot style={{ top: "5%", right: "18%" }} />
            <Dot style={{ top: "12%", right: "30%" }} />
            <Dot style={{ top: "10%", left: "30%" }} />
            <CrossMark style={{ top: "38%", left: "5%" }} />
            <CrossMark style={{ top: "36%", right: "6%" }} />
            <CrossMark style={{ bottom: "52%", left: "26%" }} />
            <CrossMark style={{ bottom: "52%", right: "11%" }} />

            {/* ── Subtle radial glow behind the heading ── */}
            {/* <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at center, rgba(34,197,94,0.04) 0%, transparent 70%)",
                }}
            /> */}

            <div className="relative z-10 section-con padding-x">
                {/* ── Badge ── */}
                {/* <div
                    className={`flex justify-center mb-8 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                >
                    <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-cardborder bg-cardbg/60 text-greys2 text-sm font-medium backdrop-blur-sm">
                        <span className="w-4 h-px bg-senary" />
                        How it works
                        <span className="w-4 h-px bg-senary" />
                    </span>
                </div> */}

                {/* ── Heading ── */}
                <div
                    className={`sm:mb-5 mb-3 transition-all  duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                >
                    <p className="text-senary max-sm:text-sm">Designed for flexibility</p>
                    <h2 className="sm:text-5xl text-3xl font-alegreya  mt-1 ">
                        Make it your own
                    </h2>
                </div>

                {/* ── Subheading ── */}
                <div
                    className={`mb-16 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        }`}
                >
                    <p className="text-greys2 text-base sm:text-lg max-w-xl  leading-relaxed max-sm:text-sm">
                        Produce endless short videos instantly. Automatically generate
                        captions, effects, backgrounds, and music.
                    </p>
                </div>

                {/* ── Cards Grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* ━━━━━━━━━━━━━━━━ Card 1: Write & Outline ━━━━━━━━━━━━━━━━ */}
                    <div
                        className={`group relative rounded-2xl border border-cardborder bg-cardbg p-6 flex flex-col transition-all duration-700 delay-300 ${isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                            }`}
                    >
                        {/* Card inner content area */}
                        <div className="flex-1 space-y-5 mb-8">
                            {/* Story Topic */}
                            <div>
                                <label className="block text-greys2  text-sm  mb-2">
                                    Enter Your Story Topic
                                </label>
                                <div className="rounded-lg border border-cardborder bg-greys5/60 px-4 py-2.5">
                                    <span className="text-greys4 text-sm">
                                        Write a story about Spanish lullaby!
                                    </span>
                                </div>
                            </div>

                            {/* Story Tone */}
                            <div>
                                <label className="block text-greys2 text-sm mb-2">
                                    Select Story Tone
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    <ToneTag label="Funny" />
                                    <ToneTag label="Fairy" />
                                    <ToneTag label="Lullaby" />
                                </div>
                            </div>

                            {/* Max Words */}
                            <div>
                                <label className="block text-greys2 text-sm mb-2">
                                    Max Words
                                </label>
                                <div className="rounded-lg border border-cardborder bg-greys5/60 px-4 py-2.5">
                                    <span className="text-greys4 text-sm">500 words</span>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-auto pt-4 border-t border-cardborder/50">
                            <h3 className="text-greys2 font-medium text-base mb-1">
                                1. Write &amp; Outline
                            </h3>
                            <p className="text-greys4 text-sm leading-relaxed">
                                Kick off by crafting a script with a prompt from available
                                template suggestions.
                            </p>
                        </div>
                    </div>

                    {/* ━━━━━━━━━━━━━━━━ Card 2: Customise & Style ━━━━━━━━━━━━━━━━ */}
                    <div
                        className={`group relative rounded-2xl border border-cardborder bg-cardbg p-6 flex flex-col transition-all duration-700 delay-[400ms] ${isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                            }`}
                    >
                        <div className="flex-1 space-y-5 mb-8">
                            {/* Video Orientation */}
                            <div>
                                <label className="block text-greys2 text-sm mb-2">
                                    Video Orientation
                                </label>
                                <div className="rounded-lg border border-cardborder bg-greys5/60 px-4 py-2.5 flex items-center justify-between">
                                    <span className="text-greys4 text-sm text-nowrap truncate">
                                        16:9 Landscape (Youtube Recommended)
                                    </span>
                                    <svg
                                        className="w-4 h-4 text-greys4"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </div>
                            </div>

                            {/* Select Background */}
                            <div>
                                <label className="block text-greys2 text-sm mb-2">
                                    Select Background
                                </label>
                                <div className="flex gap-2">
                                    <BackgroundThumbnail gradient="linear-gradient(135deg, #1a0533 0%, #0d1b2a 50%, #e67e22 100%)" />
                                    <BackgroundThumbnail gradient="linear-gradient(135deg, #0d1b2a 0%, #1a3a4a 50%, #e67e22 100%)" />
                                    <BackgroundThumbnail gradient="linear-gradient(135deg, #2d1b4e 0%, #1a0533 50%, #c0392b 100%)" />
                                    <BackgroundThumbnail gradient="linear-gradient(135deg, #0d1b2a 0%, #1a2a3a 50%, #8e44ad 100%)" />
                                </div>
                            </div>

                            {/* Select Background Sound */}
                            <div>
                                <label className="block text-greys2 text-sm mb-2">
                                    Select Background Sound
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    <SoundTag label="Beach Mermaid" />
                                    <SoundTag label="Deep Ocean" />
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-auto pt-4 border-t border-cardborder/50">
                            <h3 className="text-greys2 font-medium text-base mb-1">
                                2. Customise &amp; Style
                            </h3>
                            <p className="text-greys4 text-sm leading-relaxed">
                                Select orientation and pick a background scene and music from
                                free templates.
                            </p>
                        </div>
                    </div>

                    {/* ━━━━━━━━━━━━━━━━ Card 3: Finish & Export ━━━━━━━━━━━━━━━━ */}
                    <div
                        className={`group relative rounded-2xl border border-cardborder bg-cardbg p-6 flex flex-col transition-all duration-700 delay-500 ${isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                            }`}
                    >
                        {/* Visual: Sparkle with circular progress */}
                        <div className="flex-1 flex items-center justify-center mb-8">
                            <div className="relative w-44 h-44">
                                {/* Outer rotating ring */}
                                <svg
                                    className="absolute inset-0 w-full h-full animate-spin"
                                    style={{ animationDuration: "12s" }}
                                    viewBox="0 0 180 180"
                                >
                                    <defs>
                                        <linearGradient
                                            id="ring-gradient"
                                            x1="0%"
                                            y1="0%"
                                            x2="100%"
                                            y2="100%"
                                        >
                                            <stop offset="0%" stopColor="#1db954" />
                                            <stop offset="50%" stopColor="#1db954" stopOpacity="0.28" />
                                            <stop offset="100%" stopColor="transparent" />
                                        </linearGradient>
                                    </defs>
                                    <circle
                                        cx="90"
                                        cy="90"
                                        r="82"
                                        fill="none"
                                        stroke="url(#ring-gradient)"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeDasharray="320 200"
                                    />
                                </svg>

                                {/* Inner subtle ring */}
                                <svg
                                    className="absolute inset-0 w-full h-full"
                                    viewBox="0 0 180 180"
                                >
                                    <circle
                                        cx="90"
                                        cy="90"
                                        r="70"
                                        fill="none"
                                        stroke="#1db954"
                                        strokeWidth="1"
                                    />
                                </svg>

                                {/* Center glow */}
                                <div
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <div
                                        className="w-20 h-20 rounded-full flex items-center justify-center"
                                        style={{
                                            background:
                                                "radial-gradient(circle, rgba(34,197,94,0.22) 0%, rgba(34,197,94,0.07) 60%, transparent 100%)",
                                        }}
                                    >
                                        <SparkleIcon className="w-10 h-10 text-senary" />
                                    </div>
                                </div>

                                {/* Small dot on the ring */}
                                <div
                                    className="absolute w-2.5 h-2.5 rounded-full bg-senary shadow-[0_0_8px_rgba(168,85,247,0.6)]"
                                    style={{ top: "8%", right: "22%" }}
                                />
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-auto pt-4 border-t border-cardborder/50">
                            <h3 className="text-greys2 font-medium text-base mb-1">
                                3. Finish &amp; Export
                            </h3>
                            <p className="text-greys4 text-sm leading-relaxed">
                                Select the export format and download the generated videos,
                                script, or narration.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}