import Image from "next/image";
import Link from "next/link";
import { loadingImag } from "@utils/dataImage";
import styles from "@styles/home.module.css";

interface ProjectSectionProps {
  forwardedRef: React.RefObject<HTMLDivElement | null>;
}

export default function ProjectSection({ forwardedRef }: ProjectSectionProps) {
  return (
    <div className={styles.page_box} ref={forwardedRef}>
      <div className={styles.page_title}>GROWTH ABILITY</div>
      <div className={styles.page_desc}>博客项目更多功能入口</div>
      <div className={styles.page_list}>
        <div className={styles.page_item}>
          <Image
            className={styles.page_item_bg}
            width={2000}
            height={1320}
            src="https://api-render.wp-boke.work/picture/daily-bing?is_redirect=true"
            alt="必应每日壁纸"
            placeholder="blur"
            blurDataURL={loadingImag}
            priority={true}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <Link 
            className={styles.page_item_link} 
            href="/wallpaper"
            aria-label="访问壁纸页面"
          >
            壁 纸
          </Link>
        </div>
        <div className={styles.page_item}>
          <Image
            className={styles.page_item_bg}
            width={2000}
            height={1320}
            src="https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg"
            alt="热点"
            placeholder="blur"
            blurDataURL={loadingImag}
            priority={true}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <Link 
            className={styles.page_item_link} 
            href="/news"
            aria-label="访问热点页面"
          >
            热 点
          </Link>
        </div>
      </div>
    </div>
  );
} 