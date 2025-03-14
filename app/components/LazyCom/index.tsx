"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Image as AntImage } from "antd";
import { useInViewport } from "ahooks";
import { getRandomColor } from "@utils/dataUtils";
import style from "./index.module.css";

type Props = {
  imgSrc: string;
  domKey?: number | string;
  width: number | string;
  className?: string;
  reset?: object;
  onError?: () => void;
};

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f6f7f8" offset="0%" />
      <stop stop-color="#edeef1" offset="20%" />
      <stop stop-color="#f6f7f8" offset="40%" />
      <stop stop-color="#f6f7f8" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f6f7f8" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

const LazyCom = (props: Props) => {
  const { className, imgSrc, domKey, width, reset = {}, onError } = props;
  const ref = useRef(null);
  const backgroundColor = useRef<string>(getRandomColor());
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [isAntdLoad, setIsAntdLoad] = useState<boolean>(false);
  const [isBrowser, setIsBrowser] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [inViewport] = useInViewport(ref);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const numericWidth = typeof width === "string" ? parseInt(width) : width;

  return (
    <span
      className={`${className} ${style.lazyImg}`}
      ref={ref}
      key={domKey}
      style={{
        width: width,
        height: width,
      }}
    >
      {inViewport && !hasError && (
        <>
          <Image
            className={`${className} ${style.photography_image}`}
            width={numericWidth}
            height={numericWidth}
            alt=""
            onLoad={() => {
              !isLoad && setIsLoad(true);
            }}
            onError={handleError}
            src={imgSrc}
            quality={100}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(numericWidth, numericWidth)
            )}`}
            priority={inViewport}
            {...reset}
          />
          {isLoad && (
            <AntImage
              className={`${className} ${style.photography_image_antd}`}
              width={width}
              height={width}
              onLoad={() => {
                setIsAntdLoad(true);
              }}
              onError={handleError}
              preview={{
                toolbarRender: () => null,
                imageRender: () => (
                  <img
                    src={imgSrc}
                    style={{
                      maxWidth: 'none',
                      maxHeight: 'none',
                      objectFit: 'contain',
                    }}
                    alt=""
                  />
                ),
              }}
              alt=""
              src={imgSrc}
              rootClassName={`${className}`}
              fallback="/images/image-error.png"
            />
          )}
        </>
      )}
      {(!isLoad || hasError) && (
        <div
          className={`${className} ${style.photography_image_div} ${
            inViewport && !hasError && style.photography_image_pa
          } ${hasError && style.photography_image_error}`}
          style={
            isBrowser
              ? {
                  backgroundColor: hasError ? "#fafafa" : backgroundColor.current,
                  width: width,
                  height: width,
                }
              : {}
          }
        >
          {hasError && (
            <div className={style.error_message}>
              图片加载失败
              <button
                onClick={() => {
                  setHasError(false);
                  setIsLoad(false);
                  setIsAntdLoad(false);
                }}
                className={style.retry_button}
              >
                重试
              </button>
            </div>
          )}
        </div>
      )}
    </span>
  );
};

export default LazyCom;
