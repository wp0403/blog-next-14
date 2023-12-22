"use client";

import Link from "next/link";
import { useEffect } from "react";
import { addLayoutNavStyle, removeLayoutNavStyle } from "@utils/elementUtils";
import styles from "@styles/error404.module.css";

export default function Custom500({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    addLayoutNavStyle();

    return () => {
      removeLayoutNavStyle();
    };
  }, []);

  return (
    <div className={styles.error_404}>
      <div className={styles.content}>
        <div className={styles.title}>500</div>
        <div className={styles.cn}>
          很抱歉，服务器发生了预期之外的错误，请联系管理员修复。
        </div>
        <div className={styles.en}>
          Sorry, the server encountered an unexpected error. Please contact the
          administrator to fix it.
        </div>
      </div>
      <div className={styles.btn}>
        <div className={styles.btn_item} onClick={reset}>
          刷新
        </div>
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
