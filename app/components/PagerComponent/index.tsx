"use client";

import React from "react";
import SysIcon from "@components/SysIcon";
import styles from "./pager.module.css";

interface Props {
  total: number;
  pageSize: number;
  current: number;
  onChange: (page: number) => void;
}

const PagerComponent = (props: Props) => {
  const { total, pageSize, current, onChange } = props;
  const totalPage = Math.ceil(total / pageSize);

  const clickPage = (type) => {
    if (type === "prev" && current > 1) {
      onChange(current - 1);
    }
    if (type === "next" && current < totalPage) {
      onChange(current + 1);
    }
  };

  return (
    <div className={styles.gaper}>
      <div
        className={`${styles.prev_btn} ${
          current === 1 ? styles.btn_disabled : ""
        }`}
        onClick={() => clickPage("prev")}
      >
        <SysIcon className={styles.icon} type="icon-jiantou_liebiaoxiangzuo" />
      </div>
      <div className={styles.show}>
        <span className={styles.text}>{current}</span>/
        <span className={styles.text}>{totalPage}</span>
      </div>
      <div
        className={`${styles.next_btn} ${
          current >= totalPage ? styles.btn_disabled : ""
        }`}
        onClick={() => clickPage("next")}
      >
        <SysIcon className={styles.icon} type="icon-jiantou_liebiaoxiangyou" />
      </div>
    </div>
  );
};

export default PagerComponent;
