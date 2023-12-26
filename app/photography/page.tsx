"use client";
import { useGetState, useDebounceEffect, useMount } from "ahooks";
import { Image, Pagination, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";
import usePageSize from "@utils/CustomHooks/usePageSize";
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
import style from "./Photography.module.css";

const Photography = () => {
  const dom = useRef<any>(null);

  // 列表
  const [data, setData] = useState<any[]>([]);
  // 当前页
  const [page, setPage, getPage] = useGetState<number>(1);
  // 每页条数
  const [page_size, setPageSize] = useState<number>(10);
  const [loading, setLoading] = useGetState<boolean>(true);
  const [total, setTotal] = useState<number>(0);

  const content = useRef<any>(null);

  const getData = async () => {
    const posts = await getDataApi({
      type: "photography_List",
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

  const { pageWidth } = usePageSize({
    id: "photography_content",
  });

  const randerItem = (v) => (
    <div className={style.photography_item} key={v.id}>
      <div className={style.header}>
        <div className={style.header_top}>
          <div className={style.title}>{v.title}</div>
          {v.place && <div className={style.place}>{v.place}</div>}
          <div className={style.time}>
            ({formatDate(v.create_time, "yyyy-MM-dd HH:ss")})
          </div>
          <div className={style.username}>
            上传人：<span>{v.userInfo?.name}</span>
          </div>
        </div>
        {v.desc && <div className={style.desc}>{v.desc}</div>}
      </div>
      <div className={style.content}>
        <Image.PreviewGroup>
          {v?.imgs?.map((v1) => (
            <LazyCom
              key={v1.id}
              domKey={v1.id}
              imgSrc={v1.url}
              width={pageWidth / 3}
            />
          ))}
        </Image.PreviewGroup>
      </div>
    </div>
  );

  return (
    <div className={style.photography} ref={content}>
      <div
        className={style.photography_content}
        id="photography_content"
        ref={dom}
      >
        <Spin spinning={loading}>
          {data && Boolean(data?.length) && data?.map((v) => randerItem(v))}
          {(!data || !data?.length) && (
            <div className={style.loading_box}>暂无数据</div>
          )}
        </Spin>
      </div>
      {Boolean(total > 10) && (
        <div className={style.pagination}>
          <Pagination
            hideOnSinglePage
            showLessItems
            showSizeChanger={false}
            current={page}
            pageSize={page_size}
            total={total}
            onChange={(v) => {
              setLoading(true);
              setPage(v);
              routeChangeComplete();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Photography;
