/*
 * @Descripttion: 此utils存放经典的utils方法函数
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-13 11:29:46
 * @LastEditors: WangPeng
 * @LastEditTime: 2022-01-13 14:06:05
 */

/**
 * @desc 用于进行三次缓动。
 * @param {number} t 此参数保存动画开始的指定时间。例如，如果t的值为0，则表示动画刚刚开始。
 * @param {number} b 该参数保存对象在x轴上的指定起始位置。例如，如果b的值为10，则表示对象在x坐标上的起始位置为10。
 * @param {number} c 此参数保存对象的指定值更改。例如，如果c的值为30，则意味着对象必须向右移动30，以40结尾。
 * @param {number} d 此参数保留整个过程的指定持续时间。例如，如果d的值为2，则表示对象有2秒的时间来执行从10到40的运动。
 * @returns 此方法返回对象的缓和位置，即对象在特定时间的位置。
 */
export const easeInOutCubic = (t: number, b: number, c: number, d: number) => {
  const cc = c - b;
  t /= d / 2;
  if (t < 1) {
    return (cc / 2) * t * t * t + b;
  }
  // eslint-disable-next-line no-return-assign
  return (cc / 2) * ((t -= 2) * t * t + 2) + b;
};
