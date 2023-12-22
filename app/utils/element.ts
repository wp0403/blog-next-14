/*
 * @Descripttion: 此utils存放元素通用的utils方法
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-13 11:42:16
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-05-25 10:39:59
 */

import raf from 'rc-util/lib/raf';
import { easeInOutCubic } from './classicUtils';

interface ScrollToOptions {
  /** Scroll container, default as window */
  getContainer?: () => HTMLElement | Window | Document;
  /** Scroll end callback */
  callback?: () => any;
  /** Animation duration, default as 450 */
  duration?: number;
}

/**
 * 判断是否为window对象
 * @param {any} obj
 * @returns {boolean}
 */
export const isWindow = (obj: any) => {
  return obj !== null && obj !== undefined && obj === obj.window;
};

/**
 * 获取滚动元素距离顶部/左侧的距离
 * @param {HTMLElement | Window | Document | null} target 当前滚动的元素
 * @param {boolean} top 是否为纵向滚动，否则为横向滚动
 * @returns {number} 返回距离顶部/左侧的距离
 */
export const getScroll = (
  target: HTMLElement | Window | Document | null,
  top: boolean,
): number => {
  if (typeof window === 'undefined') {
    return 0;
  }
  const method = top ? 'scrollTop' : 'scrollLeft';
  let result = 0;
  if (isWindow(target)) {
    result = (target as Window)[top ? 'pageYOffset' : 'pageXOffset'];
  } else if (target instanceof Document) {
    result = target.documentElement[method];
  } else if (target) {
    result = (target as HTMLElement)[method];
  }
  if (target && !isWindow(target) && typeof result !== 'number') {
    result = ((target as HTMLElement).ownerDocument || (target as Document))
      .documentElement?.[method];
  }
  return result;
};

/**
 * 回到顶部事件 还可以滚动到指定位置
 * @param {number} y
 * @param options
 */
export const scrollTo = (y: number, options: ScrollToOptions = {}) => {
  const { getContainer = () => window, callback, duration = 450 } = options;
  const container = getContainer();
  const scrollTop = getScroll(container, true);
  const startTime = Date.now();

  const frameFunc = () => {
    const timestamp = Date.now();
    const time = timestamp - startTime;
    const nextScrollTop = easeInOutCubic(
      time > duration ? duration : time,
      scrollTop,
      y,
      duration,
    );
    if (isWindow(container)) {
      (container as Window).scrollTo(window.pageXOffset, nextScrollTop);
    } else if (
      container instanceof HTMLDocument ||
      container.constructor.name === 'HTMLDocument'
    ) {
      (container as HTMLDocument).documentElement.scrollTop = nextScrollTop;
    } else {
      (container as HTMLElement).scrollTop = nextScrollTop;
    }
    if (time < duration) {
      raf(frameFunc);
    } else if (typeof callback === 'function') {
      callback();
    }
  };
  raf(frameFunc);
};
