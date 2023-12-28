"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Spin } from "antd";
import getDataApi from "@utils/httpClient/request";
import SysIcon from "@components/SysIcon";
import { newsApiType } from "@utils/httpClient/apis/news";
import styles from "./news.module.css";

function isPC() {
  return window.innerWidth >= 1000; // 假设宽度大于等于 1024 像素为 PC
}

const NewsItem = (props: { apikey: keyof typeof newsApiType }) => {
  const { apikey } = props;

  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const { data } = await getDataApi({ type: apikey });
      setList(data || []);
      setLoading(false);
      console.log(data);
    };
    getData();
  }, [apikey]);

  return (
    <div className={styles.news_type_box}>
      <div className={styles.news_type_title}>{newsApiType[apikey]}</div>
      <Spin
        wrapperClassName={styles.news_type_box_content}
        spinning={loading}
        delay={0}
        size="large"
      >
        {list?.map((item) => (
          <div className={styles.news_item} key={item.id || `id${item.title}`}>
            <Link
              className={styles.news_item_link}
              href={isPC() ? item.url : item.mobileUrl || item.url}
            >
              {item.title}
            </Link>
            {item.hot && (
              <div className={styles.news_item_hot}>
                <SysIcon className={styles.icon} type="icon-w_hot" />
                {item.hot}
              </div>
            )}
          </div>
        ))}
      </Spin>
    </div>
  );
};

export default NewsItem;
