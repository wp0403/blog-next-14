"use client";

/*
 * @Descripttion:知识共享许可协议
 * @version:
 * @Author: WangPeng
 * @Date: 2023-05-24 13:14:12
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-05-24 15:40:07
 */

import Link from "next/link";
import React from "react";
import style from "./permit.module.css";
import SysIcon from "@components/SysIcon";

type Props = {
  id: number | string;
  user: string;
};

const Permit = (props: Props) => {
  const { id, user } = props;
  return (
    <div className={style.permit}>
      <div className={style.copyright_owner}>
        <SysIcon className={style.icon} type="icon-geren1" />
        <div className={style.text}>版权所属：{user}</div>
      </div>
      <div className={style.article_link}>
        <SysIcon className={style.icon} type="icon-lianjie" />
        <div className={style.text}>
          本文链接：https://wp-boke.work/blog-details/{id}
        </div>
      </div>
      <div className={style.license_agreement}>
        <SysIcon className={style.icon} type="icon-jiuyexieyi" />
        <div className={style.text}>
          作品许可：本作品采用
          <Link
            href="http://creativecommons.org/licenses/by-sa/4.0/"
            target="_blank"
            passHref
            legacyBehavior
          >
            <a className={style.link} rel="license">
              知识共享署名-相同方式共享 4.0 国际许可协议
            </a>
          </Link>
          进行许可。
        </div>
      </div>
    </div>
  );
};

export default Permit;
