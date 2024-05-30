"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  addNavItemStyle,
  bindHandleScroll,
  removeNavItemStyle,
  removeScroll,
} from "@utils/elementUtils";
import getData from "@/utils/httpClient/request";
import withLoading from "@components/WithLoading";
import useChangeLoading from "@components/WithLoading/useChangeLoading";
import style from "./archive.module.css";

const Archive = (props) => {
  const [data, setDate] = useState<any[]>([]);

  const init = async () => {
    const { data } = await getData({ type: "all_blog_archive_list" });

    setDate(data);
  };

  useEffect(() => {
    addNavItemStyle();
    bindHandleScroll();
    init();

    return () => {
      removeNavItemStyle();
      removeScroll();
    };
  }, []);

  useChangeLoading({ ...props, name: "archive" });

  return (
    <div className={`${style.archive} ${props.loading && "all-page-loading"}`}>
      <div className={style.archive_content}>
        {data?.map((v) => {
          return (
            <div className={style.archive_item} key={v?.year}>
              <div className={style.year}>{v?.year}</div>
              {v?.children?.map((item) => (
                <Link
                  href={`/blog-details/${item.id}`}
                  className={style.class_item}
                  key={item.id}
                >
                  <div className={style.class_item_time}>{item?.date_str}</div>
                  <div className={style.class_item_name}>{item?.title}</div>
                </Link>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default withLoading(Archive);
