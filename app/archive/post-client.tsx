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

export default function Archive({styles}) {
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

  return (
    <div className={styles.archive}>
      <div className={styles.archive_content}>
        {data?.map((v) => {
          return (
            <div className={styles.archive_item} key={v?.year}>
              <div className={styles.year}>{v?.year}</div>
              {v?.children?.map((item) => (
                <Link
                  href={`/blog-details/${item.id}`}
                  className={styles.class_item}
                  key={item.id}
                >
                  <div className={styles.class_item_time}>{item?.date_str}</div>
                  <div className={styles.class_item_name}>{item?.title}</div>
                </Link>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
