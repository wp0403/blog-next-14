"use client"
import React, { useEffect } from "react";
import style from "./comment.module.css";

type Props = {};

const Comment = (props: Props) => {
  const {} = props;

  useEffect(() => {
    async function initTwikoo() {
      try {
        const twikoo = await import("twikoo");
        const _window: any = window;
        _window.twikoo = twikoo;
        _window.twikoo.init({
          // envId: "https://comment.wp-boke.work",
          // 腾讯云环境填 envId；Vercel 环境填地址（https://xxx.vercel.app）
          envId: "https://comment.shimmer.work",
          el: "#tcomment", // 容器元素
          // region: 'ap-guangzhou', // 环境地域，默认为 ap-shanghai，腾讯云环境填 ap-shanghai 或 ap-guangzhou；Vercel 环境不填
          // path: location.pathname, // 用于区分不同文章的自定义 js 路径，如果您的文章路径不是 location.pathname，需传此参数
          // lang: 'zh-CN', // 用于手动设定评论区语言，支持的语言列表 https://github.com/imaegoo/twikoo/blob/main/src/client/utils/i18n/index.js
        });
      } catch (error) {
        console.error(error);
      }
    }

    initTwikoo();
  }, []);

  return (
    <div className={style.tcomment}>
      <div className={style.border} />
      <div id="tcomment"></div>
    </div>
  );
};

export default Comment;
