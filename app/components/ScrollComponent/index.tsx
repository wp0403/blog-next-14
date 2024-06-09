import React, { useRef, useEffect, useState } from "react";
import styles from "./index.module.css";

type ListItem = string | number | boolean | object | null | undefined;

interface ScrollListProps<T> {
  className?: string;
  items: T[];
  renderItem: (v: ListItem, index: number, current: number) => React.ReactNode;
}

type Props = {
  className?: string;
  data: ListItem[];
  renderItem: (v: ListItem, index: number, current: number) => React.ReactNode;
};

const ScrollList = <T extends ListItem>({
  className,
  items,
  renderItem,
}: ScrollListProps<T>) => {
  const containerRef = useRef<any>(null);
  const scrollTimeoutRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const startYRef = useRef(0);
  const endYRef = useRef(0);
  const deltaThreshold = 80; // 滚动距离阈值

  const scrollToIndex = (index) => {
    if (containerRef.current) {
      const itemHeight = containerRef.current.children[0].clientHeight;
      containerRef.current.scrollTo({
        top: index * itemHeight,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      if (event.deltaY > 0) {
        scrollToIndex(Math.min(currentIndex + 1, items.length - 1));
      } else {
        scrollToIndex(Math.max(currentIndex - 1, 0));
      }
    }, 100);
  };

  const handleTouchStart = (event) => {
    startYRef.current = event.touches[0].clientY;
  };

  const handleTouchMove = (event) => {
    endYRef.current = event.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const deltaY = startYRef.current - endYRef.current;
    if (deltaY > deltaThreshold) {
      scrollToIndex(Math.min(currentIndex + 1, items.length - 1));
    } else if (deltaY < -deltaThreshold) {
      scrollToIndex(Math.max(currentIndex - 1, 0));
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel);
      container.addEventListener("touchstart", handleTouchStart);
      container.addEventListener("touchmove", handleTouchMove);
      container.addEventListener("touchend", handleTouchEnd);

      return () => {
        container.removeEventListener("wheel", handleWheel);
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [currentIndex, items.length]);

  return (
    <div
      className={`${styles["scroll-container"]} ${className}`}
      ref={containerRef}
    >
      {items.map((item, index) => (
        <div key={index} className={styles["scroll-item"]}>
          {renderItem(item, index, currentIndex)}
        </div>
      ))}
    </div>
  );
};

const ScrollComponent = (props: Props) => {
  const { data, renderItem, className } = props;
  return (
    <ScrollList items={data} renderItem={renderItem} className={className} />
  );
};

export default ScrollComponent;
