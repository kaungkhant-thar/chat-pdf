"use client";
import React from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const HeroPill = () => {
  return (
    <motion.a
      href="#"
      className="flex w-auto space-x-2 bg-primary/20 items-center px-2 py-2 ring-1 ring-accent whitespace-pre rounded-full"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="w-fit rounded-full bg-accent px-2 py-0.5 text-center text-xs font-medium text-primary sm:text-sm">
        📣 Announcement
      </div>
      <p className="text-xs font-medium text-primary sm:text-sm">
        Introducing ChatPDF
      </p>
      <ArrowRight className="w-4 h-4" />
    </motion.a>
  );
};

const HeroTitles = () => {
  return (
    <div className="flex w-full max-w-2xl flex-col space-y-4 overflow-hidden pt-8">
      <motion.h1
        className="text-center text-4xl font-medium leading-tight text-foreground sm:text-5xl md:text-6xl"
        initial={{ filter: "blur(10px)", opacity: 0 }}
        animate={{ filter: "blur(0px)", opacity: 1 }}
        transition={{
          duration: 1,
          staggerChildren: 0.2,
        }}
      >
        {["Chat", "any", "PDFs", "with", "AI"].map((word, index) => (
          <motion.span
            key={index}
            className="inline-block px-1 md:px-2 text-balance font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: index * 0.2,
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.h1>
      <motion.p
        className="text-center text-lg font-light leading-relaxed text-foreground/80 sm:text-xl md:text-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
      >
        ChatPDF is a free, open-source web app that allows you to chat with any
        PDF document using AI. It&apos;s built with Next.js, TypeScript, and
        OpenAI.
      </motion.p>
    </div>
  );
};

const HeroCTA = () => {
  return (
    <motion.div
      className="flex justify-center pt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
    >
      <Button asChild>
        <Link href="/documents">Get Started</Link>
      </Button>
    </motion.div>
  );
};
const Hero = () => {
  return (
    <section id="hero" className="mx-auto container">
      <div className="relative flex flex-col  items-center justify-start px-2 pt-32 sm:px-6 sm:pt-24 md:pt-32 lg:px-8">
        <HeroPill />
        <HeroTitles />
        <HeroCTA />
      </div>
    </section>
  );
};

export default Hero;
