import Image from "next/image";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { scrollTo } from "@utils/element";
import SysIcon from "@components/SysIcon";
import bgImgLight from "@public/images/bg00005.jpeg";
import styles from "@styles/home.module.css";

interface HeroProps {
  onScrollToAbout: () => void;
}

export default function Hero({ onScrollToAbout }: HeroProps) {
  const typeTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const typed = new Typed(typeTarget.current!, {
      strings: [
        "年少时，春风得意马蹄疾，不信人间有别离。",
        "收余恨、免娇嗔、且自新、改性情、休恋逝水、苦海回身、早悟兰因。",
      ],
      typeSpeed: 60,
      backSpeed: 40,
      loop: true,
      loopCount: Infinity,
      autoInsertCss: false,
      backDelay: 2000,
      showCursor: false,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <>
      <div className={styles.bg_card}>
        <Image
          className={styles.bg_card_img}
          width={2000}
          height={1000}
          src={bgImgLight}
          alt="blog-bg"
          priority={true}
          sizes="100vw"
        />
      </div>
      <div className={styles.bg_mask} id="bg_mask" />
      <div className={styles.bg_content}>
        <div className={styles.title}>世人万千，再难遇我</div>
        <div className={styles.description_box}>
          <div className={styles.description} ref={typeTarget} />
        </div>
        <div className={styles.jiantou}>
          <SysIcon
            className={styles.jiantou_icon}
            type="icon-a-jiantou-xia"
            onClick={onScrollToAbout}
            role="button"
            aria-label="滚动到关于部分"
            tabIndex={0}
          />
        </div>
      </div>
    </>
  );
} 