import React from 'react';
import { motion } from 'framer-motion';
import { Progress } from './ui/progress';



const VideoGenerationAnimation = ({ progress = 0 }: { progress: number }) => {
    const getLabel = (progress: number) => {
        if (progress < 10) return 'Analyzing script';
        if (progress < 80) return 'Generating assets';
        if (progress < 100) return 'Almost there...';
        return 'Video is being generated...';
    }



    return (
        <div className="relative w-full h-full  rounded-lg overflow-hidden flex items-center justify-center">


            {/* Central animation container */}
            <div className="relative z-10 flex flex-col items-center gap-8">
                {/* Film strip animation */}
                <div className="relative w-64 h-40">
                    {/* Film frames */}
                    <div className="absolute inset-0 flex items-center justify-center gap-2">
                        {[0, 1, 2, 3, 4].map((index) => (
                            <motion.div
                                key={index}
                                className="w-10 h-32 bg-gradient-to-b from-green-500/20 to-green-600/20 border border-green-500/50 rounded-sm relative overflow-hidden"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                    opacity: [0, 1, 1, 0],
                                    y: [20, 0, 0, -20],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: index * 0.2,
                                    ease: "easeInOut"
                                }}
                            >
                                {/* Film perforations */}
                                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-green-500/30 rounded-full" />
                                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-green-500/30 rounded-full" />

                                {/* Scanning line effect */}
                                <motion.div
                                    className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-green-400 to-transparent"
                                    animate={{
                                        top: ["0%", "100%"]
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: index * 0.2,
                                        ease: "linear"
                                    }}
                                />
                            </motion.div>
                        ))}
                    </div>


                </div>

                {/* Progress bar */}
                <div className="flex flex-col items-center gap-3 w-full">

                    <Progress value={progress} className="w-[90%] max-w-[200px] bg-greys1/20" indicatorClassName="bg-senary" />

                    <motion.p
                        className="text-xs text-gray-400 mt-2 text-center"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >

                        {getLabel(progress)}
                    </motion.p>

                </div>

                {/* Particle effects */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-green-500/30 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -30, 0],
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0]
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </div>


            </div>

        </div>
    )
}

export default VideoGenerationAnimation