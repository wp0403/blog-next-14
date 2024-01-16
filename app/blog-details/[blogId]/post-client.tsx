"use client";
import { useEffect } from "react";
import SysIcon from "@components/SysIcon";
import {
  formatDate,
  hasUnicode,
  unicodeToEmoji,
  shareWebPage,
} from "@utils/dataUtils";
import {
  addNavItemStyle,
  bindHandleScroll,
  removeNavItemStyle,
  removeScroll,
} from "@utils/elementUtils";
import Permit from "@components/Permit";
import ClassifyPrevOrNext from "@components/ClassifyPrevOrNext";
import Comment from "@components/Comment";
import useMdxComponent from "@components/MdxComponent";
// import style from "../blogDetail.module.css";

export default function BlogDetails({ data, source, styles }) {
  const { markdownHtml, tocDom } = useMdxComponent(source);

  useEffect(() => {
    addNavItemStyle();
    bindHandleScroll();

    return () => {
      removeNavItemStyle();
      removeScroll();
    };
  }, []);

  const clickOperate = (type) => {
    switch (type) {
      case "forward":
        shareWebPage({
          url: `https://wp-boke.work/blog-details/${data.id}`,
          title: data.title,
          text: data.desc,
        });
        return;
    }
  };

  return (
    <div className={styles.blog_detail}>
      <div className={styles.blog_detail_box}>
        <div className={styles.left_content}>
          <div className={styles.operate_box}>
            <SysIcon className={styles.operate_item} type="icon-good" />
            <SysIcon className={styles.operate_item} type="icon-favorite" />
            <SysIcon
              className={styles.operate_item}
              type="icon-forward"
              onClick={() => clickOperate("forward")}
            />
            <SysIcon className={styles.operate_item} type="icon-link" />
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.list_item_title}>{data.title}</div>
            <div className={styles.list_item_info}>
              <div className={styles.list_item_type}>
                <SysIcon className={styles.icon} type="icon-biaoqian2" />
                <span>{data.classify}</span>
                <span className={styles.blog_item_class_border}>|</span>
                <span>{data.classify_sub}</span>
              </div>
              <div className={styles.list_item_time}>
                <SysIcon className={styles.icon} type="icon-shijian" />
                发布于{formatDate(data.time_str, "yyyy-MM-dd")} 最近修改
                {formatDate(data.last_edit_time, "yyyy-MM-dd")}
              </div>
              <div className={styles.list_item_type}>
                <SysIcon className={styles.icon} type="icon-yanjing-kai" />
                <span>{data.views}</span>
              </div>
              <div className={styles.list_item_type}>
                <SysIcon className={styles.icon} type="icon-guanzhu" />
                <span>{data.likes}</span>
              </div>
              <div className={styles.list_item_type}>
                <SysIcon className={styles.icon} type="icon-geren1" />
                {hasUnicode(data?.userInfo?.name)
                  ? unicodeToEmoji(data?.userInfo?.name)
                  : data?.userInfo?.name}
              </div>
            </div>
          </div>
          <div className={styles.blog_content}>
            {data.storage_type === "1" && markdownHtml}
            {data.storage_type === "2" && (
              <div
                dangerouslySetInnerHTML={{
                  __html: data?.content ? data.content : "暂无",
                }}
              />
            )}
            {data.storage_type === "3" && data.content}
          </div>
        </div>
        <div className={styles.right_content}>
          <div className={styles.blog_toc_box}>
            <div className={styles.blog_toc_title}>目录</div>
            <div className={styles.blog_toc}>{tocDom}</div>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <Permit id={data.id} user={data?.userInfo?.name} />
        <ClassifyPrevOrNext id={data.id} />
      </div>
      <div className={styles.comment}>
        <Comment />
      </div>
    </div>
  );
}
