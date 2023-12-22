"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  addNavItemStyle,
  bindHandleScroll,
  removeNavItemStyle,
  removeScroll,
} from "@utils/elementUtils";
import getData from "@utils/request";
import style from "./archive.module.css";

export default function Archive() {
  const [data, setDate] = useState<any[]>([]);

  const init = async () => {
    const { data } = await getData({ type: "archive_list" });

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

  return (
    <div className={style.archive}>
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
}
