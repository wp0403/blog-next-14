"use client";
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
          className={`${style.link} ${style.link_click}`}
          href="/sitemap"
          target="_blank"
        >
          站点地图
        </Link>
        <Link
          className={`${style.link} ${style.link_click}`}
          href="/rss"
          target="_blank"
        >
          RSS订阅
        </Link>
        <Link
          className={`${style.link} ${style.link_click}`}
          href="/friendly-links"
        >
          友情链接
        </Link>
      </div>
      <div className={style.contact}>
        <div className={style.title}>外部链接</div>
        <Link
          className={`${style.link} ${style.link_click}`}
          href="https://www.foreverblog.cn/go.html"
          aria-label="foreverblog-wormhole"
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
            alt="十年之约-虫洞"
            unoptimized
          />
        </Link>
        <Link
          className={`${style.link} ${style.link_click}`}
          href="https://www.travellings.cn/go.html"
          aria-label="travellings"
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          <Image
            className={style.link_img}
            width={200}
            alt="开往"
            src={theme === 1 ? TravellingLight : TravellingDark}
            priority={true}
          />
        </Link>
        <Link
          className={`${style.link} ${style.link_click}`}
          href="https://www.foreverblog.cn/"
          aria-label="foreverblog"
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          <Image
            width={200}
            height={14}
            style={{ width: "auto", height: "14px" }}
            src="https://img.foreverblog.cn/logo_en_default.png"
            alt="十年之约"
          />
        </Link>
      </div>
      <div className={style.contact}>
        <div className={style.title}>联系我</div>
        <div className={style.link}>qq: 1818784856</div>
        <div className={style.link}>微信: wp0403-</div>
        <Link
          className={`${style.link} ${style.link_click}`}
          href="mailto:webwp0403@163.com?subject=邮件标题&body=邮件内容"
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          邮箱: webwp0403@163.com
        </Link>
      </div>
      <div className={style.copyright}>
        <div className={style.user}>
          © {new Date().getFullYear()} Shimmer🌈 |
          <Link
            className={style.github_link}
            href={"https://github.com/wp0403/blog-next-14"}
            target="_blank"
          >
            <Image
              width={12}
              height={12}
              alt="github"
              src={
                theme === 1
                  ? "https://github.githubassets.com/favicons/favicon-dark.svg"
                  : "https://github.githubassets.com/favicons/favicon.svg"
              }
            />
          </Link>
        </div>
        <div className={style.legalText}>
          <Link
            className={`${style.link} ${style.link_click}`}
            href="/copyright-notice"
          >
            版权声明
          </Link>
          <Link
            className={`${style.link} ${style.link_click}`}
            href="/disclaimers"
          >
            免责声明
          </Link>
          <Link
            className={`${style.link} ${style.link_click}`}
            href="https://beian.miit.gov.cn"
            rel="nofollow noopener noreferrer"
            target="_blank"
          >
            京ICP备2022004838号-1
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
