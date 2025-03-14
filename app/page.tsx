"use client";

import { useEffect, useRef } from "react";
import { bindHandleScroll, removeScroll } from "@utils/elementUtils";
import { scrollTo } from "@utils/element";
import Hero from "@components/Hero";
import ProjectSection from "@components/ProjectSection";
import TimelineSection from "@components/TimelineSection";
import styles from "@styles/home.module.css";

export default function Home() {
  const aboutDom = useRef<HTMLDivElement>(null);

  const goAbout = () => {
    const aboutTop = aboutDom.current?.offsetTop || 0;
    scrollTo(aboutTop, {
      getContainer: () => document.body || window,
    });
  };

  useEffect(() => {
    bindHandleScroll();
    return () => {
      removeScroll();
    };
  }, []);

  return (
    <div className={styles.home}>
      <Hero onScrollToAbout={goAbout} />
      <ProjectSection forwardedRef={aboutDom} />
      <TimelineSection />
    </div>
  );
}
