"use client";
import { useEffect, useState } from "react";
import { useGetState } from "ahooks";
import {
  addNavItemStyle,
  bindHandleScroll,
  removeNavItemStyle,
  removeScroll,
} from "@utils/elementUtils";
import getDataApi from "@/utils/httpClient/request";
import VideoPlay from "@components/VideoPlay";
import ScrollComponent from "@components/ScrollComponent";
import withLoading from "@components/WithLoading";
import useChangeLoading from "@components/WithLoading/useChangeLoading";
import style from "./video.module.css";

type DateItem = {
  [key: string]: boolean | number | string | any;
};

const VideoList = (props) => {
  // 视频列表
  const [data, setData] = useState<DateItem[]>([]);
  // 当前页
  const [page, setPage, getPage] = useGetState<number>(1);
  // 每页条数
  const [page_size, setPageSize] = useState<number>(20);
  const [loading, setLoading] = useGetState<boolean>(false);

  const getDate = async () => {
    setLoading(true);
    const { code, data } = await getDataApi({
      type: "apiRender_video_List",
      params: { page: getPage(), page_size: page_size },
    });
    if (code === 200) {
      setData((a) => [...a, ...data.data]);
    }
    setLoading(false);
  };

  // 获取列表数据
  useEffect(() => {
    getDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    addNavItemStyle();
    bindHandleScroll();

    return () => {
      removeNavItemStyle();
      removeScroll();
    };
  }, []);

  useChangeLoading({ ...props, name: "video_play" });

  return (
    <div
      className={`${style.video_list} ${props.loading && "all-page-loading"}`}
    >
      <ScrollComponent
        className={style.content}
        data={data}
        renderItem={(item: any, index, currentIndex) => (
          <div className={style.item}>
            {Array.isArray(item["video_files"]) &&
              Boolean(item["video_files"].length) && (
                <VideoPlay
                  className={style.video_item}
                  url={item["video_files"][0]?.link}
                  keyId={index}
                  current={currentIndex}
                  isShow={(cur, ind) =>
                    (ind >= cur && ind < cur + 2) ||
                    (ind <= cur && ind > cur - 2)
                  }
                />
              )}
          </div>
        )}
      />
    </div>
  );
};

export default withLoading(VideoList);
