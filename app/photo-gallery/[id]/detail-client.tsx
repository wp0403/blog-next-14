"use client";
import { useMount } from "ahooks";
import { Image, Spin, message } from "antd";
import React, { useState } from "react";
import getDataApi from "@/utils/httpClient/request";
import { formatDate } from "@utils/dataUtils";
import { useRouter } from "next/navigation";
import style from "./styles.module.css";

interface PhotoDetail {
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

const PhotoDetailClient = ({ id }: { id: string }) => {
  const router = useRouter();
  const [data, setData] = useState<PhotoDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getDataApi({
        type: "photography_detail",
        params: { id },
      });
      setData(response.data);
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

  const handleBack = () => {
    router.back();
  };

  if (error) {
    return (
      <div className={style.error_container}>
        <div className={style.error_message}>{error}</div>
        <div className={style.button_group}>
          <button onClick={getData} className={style.retry_button}>
            重试
          </button>
          <button onClick={handleBack} className={style.back_button}>
            返回
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <Spin spinning={loading}>
        {data && (
          <>
            <div className={style.header}>
              <button onClick={handleBack} className={style.back_button}>
                返回
              </button>
              <h1 className={style.title}>{data.title}</h1>
              <div className={style.meta}>
                {data.place && <span className={style.place}>{data.place}</span>}
                <span className={style.time}>
                  {formatDate(data.create_time, "yyyy-MM-dd HH:mm")}
                </span>
                {data.userInfo?.name && (
                  <span className={style.author}>
                    摄影师：{data.userInfo.name}
                  </span>
                )}
              </div>
              {data.desc && <p className={style.desc}>{data.desc}</p>}
            </div>
            <div className={style.gallery}>
              <Image.PreviewGroup>
                {data.imgs.map((img) => (
                  <div key={img.id} className={style.image_wrapper}>
                    <Image
                      src={img.url}
                      alt={data.title}
                      className={style.image}
                      fallback="/images/image-error.png"
                    />
                  </div>
                ))}
              </Image.PreviewGroup>
            </div>
          </>
        )}
        {!loading && !data && (
          <div className={style.empty_message}>未找到相关内容</div>
        )}
      </Spin>
    </div>
  );
};

export default PhotoDetailClient; 