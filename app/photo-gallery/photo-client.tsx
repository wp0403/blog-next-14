"use client";
import { useGetState, useDebounceEffect, useMount, useSize } from "ahooks";
import { Spin, message, Image as AntImage } from "antd";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import getDataApi from "@/utils/httpClient/request";
import { formatDate } from "@utils/dataUtils";
import {
  addNavItemStyle,
  bindHandleScroll,
  removeNavItemStyle,
  removeScroll,
  routeChangeComplete,
} from "@utils/elementUtils";
import PagerComponent from "@components/PagerComponent";
import withLoading from "@components/WithLoading";
import useChangeLoading from "@components/WithLoading/useChangeLoading";
import style from "./styles.module.css";

// 加载失败的占位图（使用base64编码的简单图片）
const FALLBACK_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f5f5f5'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='14' fill='%23999' text-anchor='middle' dy='.3em'%3E加载失败%3C/text%3E%3C/svg%3E";

// 加载中的占位图（使用base64编码的渐变图片）
const LOADING_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0' stop-color='%23f6f7f8'/%3E%3Cstop offset='50%25' stop-color='%23edeef1'/%3E%3Cstop offset='100%25' stop-color='%23f6f7f8'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23g)'/%3E%3C/svg%3E";

interface PhotoItem {
  id: string;
  title: string;
  desc?: string;
  place?: string;
  create_time: string;
  imgs: Array<{ id: string; url: string }>;
  userInfo?: {
    name: string;
  };
}

const PhotoGalleryClient = (props: { loading?: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<PhotoItem[]>([]);
  const [page, setPage, getPage] = useGetState<number>(1);
  const [pageSize] = useState<number>(6);
  const [loading, setLoading] = useGetState<boolean>(true);
  const [total, setTotal] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState<{ [key: string]: number }>({});

  const getData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getDataApi({
        type: "all_photography_List",
        params: { page: getPage(), page_size: pageSize },
      });
      setData(response.data);
      getPage() === 1 && setTotal(response.meta.total);
    } catch (error: any) {
      setError(error.message);
      message.error("加载数据失败，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  useMount(() => {
    getData();
  });

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

  useChangeLoading({ ...props, name: "photo-gallery" });

  const size = useSize(containerRef);

  const handleImageError = (imageId: string) => {
    const currentRetryCount = retryCount[imageId] || 0;
    if (currentRetryCount < 3) {
      setRetryCount(prev => ({
        ...prev,
        [imageId]: currentRetryCount + 1
      }));
      // 强制重新加载图片
      const img = document.querySelector(`img[data-image-id="${imageId}"]`) as HTMLImageElement;
      if (img) {
        img.src = img.src;
      }
    } else {
      // 超过重试次数后，显示失败占位图
      const img = document.querySelector(`img[data-image-id="${imageId}"]`) as HTMLImageElement;
      if (img) {
        img.src = FALLBACK_IMAGE;
      }
    }
  };

  const renderItem = (item: PhotoItem) => {
    const coverImage = item.imgs[0]?.url;
    if (!coverImage) return null;

    return (
      <div key={item.id} className={style.gallery_item}>
        <div className={style.image_container}>
          <AntImage.PreviewGroup
            items={item.imgs.map(img => ({
              src: img.url,
              alt: item.title
            }))}
          >
            <div className={style.next_image_wrapper}>
              <Image
                src={coverImage}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className={style.cover_image}
                priority={page === 1}
                quality={75}
                loading={page === 1 ? "eager" : "lazy"}
                blurDataURL={LOADING_PLACEHOLDER}
                placeholder="blur"
                data-image-id={item.imgs[0].id}
                onError={() => handleImageError(item.imgs[0].id)}
              />
            </div>
          </AntImage.PreviewGroup>
          <div className={style.image_overlay}>
            <span className={style.image_count}>{item.imgs.length} 张照片</span>
          </div>
        </div>
        <div className={style.item_info}>
          <h3 className={style.title}>{item.title}</h3>
          <div className={style.meta}>
            {item.place && <span className={style.place}>{item.place}</span>}
            <span className={style.time}>
              {formatDate(item.create_time, "yyyy-MM-dd")}
            </span>
          </div>
          {item.desc && <p className={style.desc}>{item.desc}</p>}
        </div>
      </div>
    );
  };

  if (error) {
    return (
      <div className={style.error_container}>
        <div className={style.error_message}>{error}</div>
        <button onClick={getData} className={style.retry_button}>
          重试
        </button>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <div className={style.content} ref={containerRef}>
        <Spin spinning={loading}>
          <div className={style.grid_container}>
            {data.map(renderItem)}
          </div>
          {!data.length && !loading && (
            <div className={style.empty_message}>暂无数据</div>
          )}
        </Spin>
      </div>
      {Boolean(total) && (
        <div className={style.pagination}>
          <PagerComponent
            total={total}
            current={page}
            pageSize={pageSize}
            onChange={(v) => {
              setPage(v);
              routeChangeComplete();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default withLoading(PhotoGalleryClient); 