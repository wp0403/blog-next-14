"use client";
import Link from "next/link";
import React, { useContext, useEffect } from "react";
import {
  addNavItemStyle,
  bindHandleScroll,
  removeNavItemStyle,
  removeScroll,
} from "@/utils/elementUtils";
import { getRandomColor } from "@utils/dataUtils";
import { LayoutContext } from "@/store/layoutStore";
import Comment from "@components/Comment";
import withLoading from "@components/WithLoading";
import useChangeLoading from "@components/WithLoading/useChangeLoading";
import style from "./friendlyLinks.module.css";

const FriendlyLinks = (props) => {
  const { theme } = useContext(LayoutContext);

  useEffect(() => {
    addNavItemStyle();
    bindHandleScroll();

    return () => {
      removeNavItemStyle();
      removeScroll();
    };
  }, []);

  useChangeLoading({ ...props, name: "friendly_links" });

  return (
    <div
      className={`${style.friendly_links} ${
        props.loading && "all-page-loading"
      }`}
    >
      <h1 className={style.title}>友情链接</h1>
      <div className={style.demo}>
        <div className={style.demo_item}>网站名：shimmer</div>
        <div className={style.demo_item}>
          站点头像：https://wp-boke.work/images/logo.png
        </div>
        <div className={style.demo_item}>网站链接：https://wp-boke.work</div>
        <div className={style.demo_item}>
          网站描述：欲买桂花同载酒，终不似，少年游。
        </div>
        <div className={style.demo_item}>联系邮箱：webwp0403@163.com</div>
      </div>
      <div className={style.desc}>不定期清理失效网站，拒绝无效互链。</div>
      <div className={style.content}>
        {props?.data?.map((v) => (
          <Link
            key={v.id}
            className={style.blog_item}
            style={{
              backgroundColor:
                theme === 2 ? getRandomColor(36, 220) : getRandomColor(30, 30),
            }}
            href={v.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className={style.blog_item_logo} src={v.logo} alt={v.title} />
            <div className={style.blog_item_content}>
              <div className={style.blog_item_title}>{v.title}</div>
              <div className={style.blog_item_desc}>{v.desc}</div>
            </div>
          </Link>
        ))}
      </div>
      <div className={style.comment}>
        <Comment />
      </div>
    </div>
  );
};

export default withLoading(FriendlyLinks);
