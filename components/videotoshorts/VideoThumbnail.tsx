"use client"

import React from 'react'
import { useState, useRef, useEffect } from "react";

function formatDuration(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function VideoThumbnail({
    src,
    seekTo = 1,
    onClick,
    isPlaying,
    duration,
    score,
}: {
    src: string;
    seekTo?: number;
    onClick: () => void;
    isPlaying: boolean;
    duration: number;
    score: number;
}) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [thumbReady, setThumbReady] = useState(false);
    const [hovered, setHovered] = useState(false);

    // Generate thumbnail by seeking to the desired frame
    useEffect(() => {
        const video = videoRef.current;
        if (!video || isPlaying) return;

        const handleSeeked = () => setThumbReady(true);
        const handleLoaded = () => {
            video.currentTime = Math.min(seekTo, video.duration * 0.2);
        };

        video.addEventListener("loadedmetadata", handleLoaded);
        video.addEventListener("seeked", handleSeeked);
        return () => {
            video.removeEventListener("loadedmetadata", handleLoaded);
            video.removeEventListener("seeked", handleSeeked);
        };
    }, [src, seekTo, isPlaying]);

    // Pause when isPlaying becomes false
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        if (!isPlaying) {
            video.pause();
        }
        // NOTE: We do NOT call video.play() here.
        // On iOS Safari, play() must be called synchronously within a user
        // gesture (tap/click). Calling it inside useEffect (async) breaks
        // the gesture requirement and silently fails.
    }, [isPlaying]);

    const handleClick = () => {
        const video = videoRef.current;
        if (!video) return;

        // Notify parent to toggle isPlaying state
        onClick();

        // Call play() directly here, synchronously inside the click handler.
        // This satisfies iOS Safari's "user gesture" requirement.
        if (!isPlaying) {
            video.currentTime = 0;
            video.play().catch(() => {
                // Autoplay policy or other error — fail silently
            });
        } else {
            video.pause();
        }
    };

    const scoreColor =
        score >= 85 ? "text-senary border-senary/25 bg-dot-orange"
            : score >= 70 ? "text-yellow-400 border-yellow-400/25"
                : "text-green-500 border-green-500/25";

    const dotColor =
        score >= 85 ? "bg-senary"
            : score >= 70 ? "bg-yellow-400"
                : "bg-green-500";

    return (
        <div
            onClick={handleClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative w-full cursor-pointer overflow-hidden bg-greys3 rounded-md"
            style={{ aspectRatio: "9/16" }}
        >
            {/* Video element — always render with playsInline + webkit-playsinline for iOS */}
            <video
                ref={videoRef}
                src={src}
                preload="metadata"
                muted
                playsInline
                // @ts-ignore — webkit-playsinline is not in React's type defs but
                // is required by older iOS Safari to prevent fullscreen takeover
                webkit-playsinline="true"
                controls={isPlaying}
                className={[
                    "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
                    thumbReady || isPlaying ? "opacity-100" : "opacity-0",
                ].join(" ")}
            />

            {/* Loading skeleton */}
            {!thumbReady && !isPlaying && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#111120] to-[#1a1a2e] flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-senary/30 border-t-senary animate-spin" />
                </div>
            )}

            {/* Overlay — hidden when playing */}
            {!isPlaying && (
                <>
                    {/* Gradient vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                    {/* Top row: score badge + duration */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex justify-between items-center">
                        <div className={`bg-black/70 backdrop-blur-sm border rounded-md px-2 py-0.5 flex items-center gap-1.5 ${scoreColor}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
                            <span className="text-[11px] font-bold tracking-wide">
                                {score}
                            </span>
                        </div>
                        <div className="bg-black/70 backdrop-blur-sm rounded-md px-2 py-0.5 text-[11px] font-semibold text-white">
                            {formatDuration(duration)}
                        </div>
                    </div>

                    {/* Center play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div
                            className={[
                                "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200",
                                hovered
                                    ? "bg-senary scale-105"
                                    : "bg-senary/85 scale-100",
                            ].join(" ")}
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M4 2.5L13.5 8L4 13.5V2.5Z" fill="white" />
                            </svg>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default VideoThumbnail;