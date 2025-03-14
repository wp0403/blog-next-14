import { timeAixsList } from "@utils/dict";
import styles from "@styles/home.module.css";

export default function TimelineSection() {
  return (
    <div className={styles.timeAixs_box}>
      <div className={styles.timeAixs_title}>GROWTH RECORD</div>
      <div className={styles.timeAixs_desc}>「 左右滑动查看 」</div>
      <div className={styles.timeAixs}>
        <div className={styles.timeAixs_left} />
        <div className={styles.timeAixs_content}>
          {timeAixsList?.map((v) => (
            <div 
              className={styles.timeAixs_item} 
              key={v.id}
              role="listitem"
              aria-label={`${v.time}: ${v.title}`}
            >
              <div className={styles.timeAixs_item_time}>{v.time}</div>
              <div className={styles.timeAixs_item_title}>{v.title}</div>
            </div>
          ))}
          <div className={styles.timeAixs_item}>
            <div className={styles.timeAixs_item_desc}>GROWING...</div>
            <div className={styles.timeAixs_item_desc}>COMING SOON</div>
          </div>
        </div>
        <div className={styles.timeAixs_right} />
      </div>
    </div>
  );
} 