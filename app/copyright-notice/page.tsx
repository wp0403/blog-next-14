"use client"
import Link from "next/link";
import React, { useEffect } from "react";
import {
  addNavItemStyle,
  bindHandleScroll,
  removeNavItemStyle,
  removeScroll,
} from "@/utils/elementUtils";
import style from "./copyrightNotice.module.css";

const CopyrightNotice = () => {
  useEffect(() => {
    addNavItemStyle();
    bindHandleScroll();

    return () => {
      removeNavItemStyle();
      removeScroll();
    };
  }, []);
  return (
    <div className={style.copyright_notice}>
      <div className={style.title}>版权声明</div>
      <div className={style.content}>
        <div className={style.p}>
          1、本博客（域名为wp-boke.work）的所有内容（包括但不限于文字、图片、音频、视频等），除特别注明外，其余均由shimmer创作或原创，版权归shimmer个人所有。
        </div>
        <div className={style.p}>
          2、未经本人授权，任何人或机构不得复制、转载、摘编或以任何其他形式使用本站内容。如需转载，请在摘要或正文部分注明出处。
        </div>
        <div className={style.p}>
          3、本博客允许授权使用部分文案，需注明原作者及网址，如用于商业用途，需与原作者确认。任何未授权使用内容的行为都将被视为侵权行为，shimmer保留追究法律责任的权利。
        </div>
        <div className={style.p}>
          4、本站不承担用户因使用本站所提供的服务而产生的任何直接、间接或者连带的责任和赔偿。
        </div>
        <div className={style.p}>
          5、本声明的解释权及修改权归shimmer所有，并保留随时更新网站内容和服务的权利，在不做事先通知的情况下，修改本声明产生效力。
        </div>
        <div className={style.footer}>
          如对本博客版权声明有任何疑问或建议，请联系shimmer的
          <Link
            className={`${style.link} ${style.link_click}`}
            href="mailto:webwp0403@163.com?subject=邮件标题&body=邮件内容"
            target="_blank"
            rel="nofollow"
          >
            电子邮箱
          </Link>
          或通过本博客页面上的相关联系方式进行联系。
        </div>
      </div>
    </div>
  );
};

export default CopyrightNotice;
