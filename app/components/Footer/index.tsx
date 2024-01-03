"use client"
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { LayoutContext } from "@store/layoutStore";
import TravellingDark from "@public/images/travelling-dark.png";
import TravellingLight from "@public/images/travelling-light.png";
import style from "./footer.module.css";

const Footer = () => {
  const { theme } = useContext(LayoutContext);
  return (
    <footer className={style.footer}>
      <div className={style.other_websites}>
        <div className={style.title}>站内索引</div>
        <Link
          className={style.link}
          target="_blank"
          href="/sitemap"
          passHref
          legacyBehavior
        >
          <a className={`${style.link} ${style.link_click}`} rel="noopener">
            站点地图
          </a>
        </Link>
        <Link
          className={style.link}
          target="_blank"
          href="/rss"
          passHref
          legacyBehavior
        >
          <a className={`${style.link} ${style.link_click}`} rel="noopener">
            RSS订阅
          </a>
        </Link>
        <Link
          className={style.link}
          href="/friendly-links"
          passHref
          legacyBehavior
        >
          <a className={`${style.link} ${style.link_click}`} rel="noopener">
            友情链接
          </a>
        </Link>
      </div>
      <div className={style.contact}>
        <div className={style.title}>外部链接</div>
        <Link
          className={style.link}
          href="https://www.foreverblog.cn/go.html"
          passHref
          legacyBehavior
          aria-label="foreverblog-wormhole"
        >
          <a
            className={`${style.link} ${style.link_click}`}
            rel="nofollow noopener noreferrer"
            target="_blank"
          >
            <Image
              width={200}
              height={16}
              style={{ width: "auto", height: "16px" }}
              src={
                theme === 1
                  ? "https://img.foreverblog.cn/wormhole_1_tp.gif"
                  : "https://img.foreverblog.cn/wormhole_3_tp.gif"
              }
              alt=""
            />
          </a>
        </Link>
        <Link
          className={style.link}
          href="https://www.travellings.cn/go.html"
          passHref
          legacyBehavior
          aria-label="travellings"
        >
          <a
            className={`${style.link} ${style.link_click}`}
            rel="nofollow noopener noreferrer"
            target="_blank"
          >
            <Image
              className={style.link_img}
              width={200}
              alt=""
              src={theme === 1 ? TravellingLight : TravellingDark}
              priority={true}
            />
          </a>
        </Link>
        <Link
          className={style.link}
          href="https://www.foreverblog.cn/"
          passHref
          legacyBehavior
          aria-label="foreverblog"
        >
          <a
            className={`${style.link} ${style.link_click}`}
            rel="nofollow noopener noreferrer"
            target="_blank"
          >
            <Image
              width={200}
              height={14}
              style={{ width: "auto", height: "14px" }}
              src="https://img.foreverblog.cn/logo_en_default.png"
              alt=""
            />
          </a>
        </Link>
      </div>
      <div className={style.contact}>
        <div className={style.title}>联系我</div>
        <div className={style.link}>qq: 1818784856</div>
        <div className={style.link}>微信: wp0403-</div>
        <Link
          className={style.link}
          href="mailto:webwp0403@163.com?subject=邮件标题&body=邮件内容"
          passHref
          legacyBehavior
        >
          <a
            className={`${style.link} ${style.link_click}`}
            rel="nofollow noopener noreferrer"
            target="_blank"
          >
            邮箱: webwp0403@163.com
          </a>
        </Link>
      </div>
      <div className={style.copyright}>
        <div className={style.user}>© {new Date().getFullYear()} Shimmer🌈</div>
        <div className={style.legalText}>
          <Link
            className={style.link}
            href="/copyright-notice"
            passHref
            legacyBehavior
          >
            <a className={`${style.link} ${style.link_click}`} rel="noopener">
              版权声明
            </a>
          </Link>
          <Link
            className={style.link}
            href="/disclaimers"
            passHref
            legacyBehavior
          >
            <a className={`${style.link} ${style.link_click}`} rel="noopener">
              免责声明
            </a>
          </Link>
          <Link
            className={style.link}
            href="https://beian.miit.gov.cn"
            passHref
            legacyBehavior
          >
            <a
              className={`${style.link} ${style.link_click}`}
              rel="nofollow noopener noreferrer"
              target="_blank"
            >
              京ICP备2022004838号-1
            </a>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
