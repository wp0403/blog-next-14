"use client"
import Link from "next/link";
import React, { useEffect } from "react";
import {
  addNavItemStyle,
  bindHandleScroll,
  removeNavItemStyle,
  removeScroll,
} from "@/utils/elementUtils";
import style from "./disclaimers.module.css";
 
const Disclaimers = () => {
  useEffect(() => {
    addNavItemStyle();
    bindHandleScroll();

    return () => {
      removeNavItemStyle();
      removeScroll();
    };
  }, []);
  return (
    <div className={style.disclaimers}>
      <div className={style.title}>免责声明</div>
      <div className={style.content}>
        <div className={style.content_title}>
          欢迎访问我的个人博客，本站提供的所有信息均在善意和合理的基础上发布和使用，但本人无法保证信息的准确性、完整性和实时性。
        </div>
        <div className={style.p}>
          <div className={style.desc_title}>信息准确性和完整性</div>
          本人尽力确保本站提供的所有信息、内容和资料的准确性、完整性和实时性，但本人无法保证其完全正确、完整和即时更新。本人不能保证所有信息和内容的精确性、可靠性和适用性，因此任何使用本站提供的信息造成的后果和损失由用户自行承担。
        </div>
        <div className={style.p}>
          <div className={style.desc_title}>知识产权</div>
          本人发布的所有信息、内容和资料，包括文字、图片、图形、标识、标志、图表和编程代码等，均受到相关的知识产权法律的保护。未经本人的明确授权，任何人不得使用、复制、传播、更改或销售本人的信息和内容。
        </div>
        <div className={style.p}>
          <div className={style.desc_title}>免责条款</div>
          本人不对因本站内容和服务的误导性或不准确性而导致的任何直接、间接、偶然、特殊或结果性损失负责，并且对于本站上其他网站的链接或外部资源的内容、广告、产品或其他资料不负任何责任。
        </div>
        <div className={style.p}>
          <div className={style.desc_title}>合法性</div>
          本人承诺所有内容都是合法的，并未侵犯他人的知识产权或其他合法权利。对于任何侵权行为或侵犯隐私和安全的行为，本人不负责并保留追究法律责任的权利。
        </div>
        <div className={style.p}>
          <div className={style.desc_title}>变更和更新</div>
          本人保留对本免责声明进行随时变更、更新和修改的权利。本人建议您在访问和使用本人的博客时定期查看本免责声明并了解最新更新。
        </div>
        <div className={style.footer}>
          如对本博客免责声明有任何疑问或建议，请联系shimmer的
          <Link
            href="mailto:webwp0403@163.com?subject=邮件标题&body=邮件内容"
            target="_blank"
            passHref
            legacyBehavior
          >
            <a className={`${style.link} ${style.link_click}`} rel="nofollow">
              电子邮箱
            </a>
          </Link>
          或通过本博客页面上的相关联系方式进行联系。
        </div>
      </div>
    </div>
  );
};

export default Disclaimers;
