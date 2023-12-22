"use client";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import getDataApi from "@utils/request";
import style from "./classifyPrevOrNext.module.css";

type Props = {
  id: number | string;
};

const ClassifyPrevOrNext = (props: Props) => {
  const { id } = props;

  const [data, setData] = useState<any[]>([]);

  const getData = useCallback(async () => {
    const posts = await getDataApi({
      type: "blog_NextOrPrev",
      params: { id: id },
    });
    setData(posts.data);
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <div className={style.prev_next}>
      <Link
        className={style.prev}
        href={data[0]?.obj.id ? `/blog-details/${data[0]?.obj.id}` : ""}
        onClick={(e) => (data[0]?.obj.id ? "" : e.preventDefault())}
      >
        <div className={style.prev_title}>上一篇</div>
        <div
          className={`${style.prev_content} ${
            !data[0]?.obj.id && style.disabled
          }`}
        >
          {data[0]?.obj.id ? data[0]?.obj.title : "没有了"}
        </div>
      </Link>
      <Link
        className={style.next}
        href={data[1]?.obj.id ? `/blog-details/${data[1]?.obj.id}` : ""}
        onClick={(e) => (data[1]?.obj.id ? "" : e.preventDefault())}
      >
        <div className={style.next_title}>下一篇</div>
        <div
          className={`${style.next_content} ${
            !data[1]?.obj.id && style.disabled
          }`}
        >
          {data[1]?.obj.id ? data[1]?.obj.title : "没有了"}
        </div>
      </Link>
    </div>
  );
};

export default ClassifyPrevOrNext;
