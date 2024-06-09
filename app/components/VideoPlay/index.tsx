import React, { useEffect, useRef } from "react";
import Player from "xgplayer";
import styles from "./index.module.css";

type Props = {
  className?: string;
  url: string;
  keyId?: string | number;
  current?: string | number;
  isShow?: Function;
};

const VideoPlay = (props: Props) => {
  const { className, url, keyId, current, isShow } = props;

  const playerRef = useRef<any>(null);

  const init = () => {
    if (current !== keyId) return;
    if (playerRef.current) {
      playerRef.current.destroy();
    }
    playerRef.current = new Player({
      id: `video-play-${keyId}`,
      url: url,
      autoplay: false,
      volume: 1,
      muted: false,
      fluid: true,
      ignores: ["fullscreen"],
      cssFullscreen: true,
      rotateFullscreen: true,
      // 倍速播放
      playbackRate: [0.5, 0.75, 1, 1.5, 2],
      defaultPlaybackRate: 1,
    });
  };

  useEffect(() => {
    init();
  }, [url, keyId, current]);

  return (
    <div className={`${styles.video_item} ${className}`}>
      {(!isShow || (isShow && isShow(current, keyId))) && (
        <div className={styles.player} id={`video-play-${keyId}`}></div>
      )}
    </div>
  );
};

export default VideoPlay;
