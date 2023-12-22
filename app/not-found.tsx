"use client";
import Link from "next/link";
import { useEffect } from "react";
import { addLayoutNavStyle, removeLayoutNavStyle } from "@utils/elementUtils";
import styles from "@styles/error404.module.css";

export default function Custom404() {
  useEffect(() => {
    addLayoutNavStyle();

    return () => {
      removeLayoutNavStyle();
    };
  }, []);

  return (
    <div className={styles.error_404}>
      <div className={styles.content}>
        <div className={styles.title}>404</div>
        <div className={styles.cn}>
          很抱歉，您访问的页面资源不存在。请您确认网址无误后重试。
        </div>
        <div className={styles.en}>
          Sorry, the page resource you visited does not exist. Please confirm
          that the URL is correct and try again.
        </div>
      </div>
      <div className={styles.btn}>
        <Link className={styles.btn_item} href="/">
          回到首页
        </Link>
        <Link
          className={styles.btn_item}
          href="mailto:webwp0403@163.com?subject=邮件标题&amp;body=邮件内容"
          target="_blank"
        >
          联系我
        </Link>
      </div>
    </div>
  );
}
