"use client";
import { useGetState, useDebounceEffect, useMount, useSize } from "ahooks";
import Image from "next/image";
import { Image as AntImage, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import getDataApi from "@/utils/httpClient/request";
import { formatDate } from "@utils/dataUtils";
import {
  addNavItemStyle,
  bindHandleScroll,
  removeNavItemStyle,
  removeScroll,
  routeChangeComplete,
} from "@utils/elementUtils";
import LazyCom from "@components/LazyCom";
import PagerComponent from "@components/PagerComponent";
import withLoading from "@components/WithLoading";
import useChangeLoading from "@components/WithLoading/useChangeLoading";
import bgImg from "@public/images/bg_long_001.jpg";
import styles from "./lightShadowTraces.module.css";

const LightShadowTraces = (props) => {
  const dom = useRef<any>(null);
  const content = useRef<any>(null);
  // 列表
  const [data, setData] = useState<any[]>([]);
  // 当前页
  const [page, setPage, getPage] = useGetState<number>(1);
  // 每页条数
  const [page_size, setPageSize] = useState<number>(8);
  const [loading, setLoading] = useGetState<boolean>(true);
  const [total, setTotal] = useState<number>(0);

  const getData = async () => {
    setLoading(true);
    const posts = await getDataApi({
      type: "all_photography_List",
      params: { page: getPage(), page_size: page_size },
    });
    setData(posts.data);
    getPage() === 1 && setTotal(posts.meta.total);
    setLoading(false);
  };

  useMount(() => {
    getData();
  });

  // 获取列表数据
  useDebounceEffect(
    () => {
      getData();
    },
    [page],
    {
      wait: 800,
    }
  );

  useEffect(() => {
    addNavItemStyle();
    bindHandleScroll();

    return () => {
      removeNavItemStyle();
      removeScroll();
    };
  }, []);

  useChangeLoading({ ...props, name: "photography" });
  return (
    <div className={styles.gallery}>
      <header className={styles.header}>
        <Image
          className={styles.header_bg}
          src={bgImg}
          alt="光影足迹"
          width={1000}
          height={450}
        />
      </header>
      <div className={styles.tags}></div>
      <div className={styles.content}>
        <div className={styles.container}></div>
        <div className={styles.sidebar}></div>
      </div>
      <footer className={styles.footer}></footer>
    </div>
  );
};

export default withLoading(LightShadowTraces);
