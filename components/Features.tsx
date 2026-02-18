"use client";

import { motion } from "framer-motion";
import { Mic, Image, Type, Clock, BarChart3, Layers } from "lucide-react";

const features = [
    {
        icon: Mic,
        title: "AI Voiceover",
        description: "Natural-sounding voices in 30+ languages. Pick a tone that fits your brand.",
    },
    {
        icon: Image,
        title: "Smart Visuals",
        description: "Relevant stock footage and images matched to every line of your script.",
    },
    {
        icon: Type,
        title: "Auto Captions",
        description: "Animated captions timed to speech. Boost retention by up to 80%.",
    },
    {
        icon: Clock,
        title: "Auto-Scheduling",
        description: "Queue weeks of content in advance. Post at optimal times automatically.",
    },
    {
        icon: BarChart3,
        title: "Analytics",
        description: "Track views, engagement, and growth across all platforms from one dashboard.",
    },
    {
        icon: Layers,
        title: "Batch Creation",
        description: "Upload multiple scripts and generate a library of videos in one go.",
    },
];

export function Features() {
    return (
        <section id="features" className="relative py-32 bg-denary">
            <div className="section-con padding-x">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-20"
                >
                    <span className="text-xs font-medium text-senary uppercase tracking-widest">Features</span>
                    <h2 className="text-2xl sm:text-4xl font-medium tracking-tight mt-3 font-alegreya">
                        Everything you need to go viral
                    </h2>
                    <p className="text-muted-foreground mt-4 max-w-lg mx-auto max-sm:text-sm">
                        Professional-quality videos without the learning curve, the editing software, or the freelancer invoices.
                    </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {features.map((feature, i) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.4, delay: i * 0.08 }}
                            className="group p-6 rounded-xl border border-cardborder/60 hover:border-cardborder bg-cardbg/30 hover:bg-cardbg/60 transition-all duration-300"
                        >
                            <feature.icon size={20} className="text-senary mb-4" />
                            <h3 className="font-semibold mb-1.5">{feature.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
