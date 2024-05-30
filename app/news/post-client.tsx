"use client";
import React, { useEffect } from "react";
import {
  addNavItemStyle,
  bindHandleScroll,
  removeNavItemStyle,
  removeScroll,
} from "@utils/elementUtils";
import { newsApiType } from "@utils/httpClient/apis/news";
import withLoading from "@components/WithLoading";
import useChangeLoading from "@components/WithLoading/useChangeLoading";
import NewsItem from "./newsItem";
import styles from "./news.module.css";

const PostClient = (props) => {
  useEffect(() => {
    addNavItemStyle();
    bindHandleScroll();

    return () => {
      removeNavItemStyle();
      removeScroll();
    };
  }, []);

  useChangeLoading({ ...props, name: "news" });

  return (
    <div className={`${styles.news} ${props.loading && "all-page-loading"}`}>
      <div className={styles.news_content}>
        {Object.keys(newsApiType).map((item) => (
          <NewsItem key={item} apikey={item as any} />
        ))}
      </div>
    </div>
  );
};

export default withLoading(PostClient);
