"use client";
import React, { useEffect } from "react";
import {
  addNavItemStyle,
  bindHandleScroll,
  removeNavItemStyle,
  removeScroll,
} from "@utils/elementUtils";
import { newsApiType } from "@utils/httpClient/apis/news";
import NewsItem from "./newsItem";
import styles from "./news.module.css";

const PostClient = () => {
  useEffect(() => {
    addNavItemStyle();
    bindHandleScroll();

    return () => {
      removeNavItemStyle();
      removeScroll();
    };
  }, []);

  return (
    <div className={styles.news}>
      <div className={styles.news_content}>
        {Object.keys(newsApiType).map((item) => (
          <NewsItem key={item} apikey={item as any} />
        ))}
      </div>
    </div>
  );
};

export default PostClient;
