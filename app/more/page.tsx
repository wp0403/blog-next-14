"use client"
import Link from "next/link";
import React, { useEffect } from "react";
import {
  addNavItemStyle,
  bindHandleScroll,
  removeNavItemStyle,
  removeScroll,
} from "@utils/elementUtils";
import { moreList } from "@/utils/dict";
import style from "./more.module.css";

const More = () => {
  useEffect(() => {
    addNavItemStyle();
    bindHandleScroll();

    return () => {
      removeNavItemStyle();
      removeScroll();
    };
  }, []);

  const randerItem = (v) => {
    return (
      <div key={v.id} className={style.item}>
        <div className={style.item_title}>{v.title}</div>
        <div className={style.item_desc}>{v.desc}</div>
        <div className={style.item_footer}>
          <Link
            className={style.item_btn}
            href={v.url}
            target={v.target || "_self"}
          >
            Come Here
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className={style.more}>
      <div className={style.content}>{moreList?.map((v) => randerItem(v))}</div>
    </div>
  );
};

export default More;
