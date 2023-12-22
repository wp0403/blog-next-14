/*
 * @Descripttion: 此utils存放数据操作的方法
 * @version:
 * @Author: WangPeng
 * @Date: 2022-01-13 11:42:16
 * @LastEditors: WangPeng
 * @LastEditTime: 2023-12-22 10:59:59
 */
import Fingerprint2 from "fingerprintjs2";
import crypto from "crypto";
import { localGet } from "./local";

// 歌词数组的类型
export type ParsedLyrics = {
  time: number;
  text: string;
};

/**
 * 阻止冒泡
 * @param {any} e
 */
export const stopPropagation = (e: any) => {
  e = e || window.event;
  if (e.stopPropagation) {
    // W3C阻止冒泡方法
    e.stopPropagation();
  } else {
    e.cancelBubble = true; // IE阻止冒泡方法
  }
};

/**
 * 数组对象去重
 */
export const distinctObjectMap = (arr: any[], type: string) => {
  const res = new Map();
  // 使用map记录下每个item的id，已存在的id将不会被筛选入内
  return arr.filter(
    (item: any) => !res.has(item[type]) && res.set(item[type], 1)
  );
};

// 计算方法，num为当前的数  rate为进率  digit为保留的小数位
export const calculation = (num: number, rate: number, digit: number) => {
  return parseFloat(`${(Math.trunc(num) / rate).toFixed(digit)}`);
};

// 格式化时间
export const formatDate = (date: any, format: string) => {
  if (!date) return;
  if (!format) format = "yyyy-MM-dd";
  switch (typeof date) {
    case "string":
      date = new Date(date);
      break;
    case "number":
      date = new Date(date);
      break;
  }
  if (!(date instanceof Date)) return;
  const dict: any = {
    yyyy: date.getFullYear(),
    M: date.getMonth() + 1,
    d: date.getDate(),
    H: date.getHours(),
    m: date.getMinutes(),
    s: date.getSeconds(),
    MM: ("" + (date.getMonth() + 101)).substr(1),
    dd: ("" + (date.getDate() + 100)).substr(1),
    HH: ("" + (date.getHours() + 100)).substr(1),
    mm: ("" + (date.getMinutes() + 100)).substr(1),
    ss: ("" + (date.getSeconds() + 100)).substr(1),
  };
  return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
    return dict[arguments[0]];
  });
};

// 下载图片到本地
export const downloadImg = (blob: Blob | MediaSource, filename: string) => {
  const a = document.createElement("a"); // 创建一个a节点插入的document
  a.href = window.URL.createObjectURL(blob);
  a.download = filename.split("*-*")[1] || filename;
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(a.href);
};

// 判断路径是否包含https或http  true包含 false不包含
export const IncludeHttp = (url: string) => {
  const reg = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
  return reg.test(url);
};

/**
 * 导出 json 数据为 Excle 表格
 * @param {json} data 要导出的 json 数据
 * @param {String} head 表头, 可选 参数示例：'名字,邮箱,电话'
 * @param {*} name 导出的文件名, 可选
 */
export const jsonToExcel = (
  data: any[],
  head: string,
  name: any = "导出的文件名"
) => {
  let str = head ? head + "\n" : "";
  data.forEach((item) => {
    // 拼接json数据, 增加 \t 为了不让表格显示科学计数法或者其他格式
    for (let key in item) {
      str = `${str + item[key] + "\t"},`;
    }
    str += "\n";
  });
  // encodeURIComponent解决中文乱码
  const uri = "data:text/csv;charset=utf-8,\ufeff" + encodeURIComponent(str);
  // 通过创建a标签实现
  const link = document.createElement("a");
  link.href = uri;
  // 对下载的文件命名
  link.download = `${name + ".csv"}`;
  link.click();
};

// 读取上传文件的内容
export const handleUpload: any = (
  file: Blob,
  callback?: (arg0: string | ArrayBuffer | null | undefined) => any
) => {
  // 新建一个FileReader
  const reader = new FileReader();
  // 读取文件
  reader.readAsText(file, "UTF-8");
  // 读取完文件之后会回来这里
  reader.onload = function (e) {
    // 读取文件内容
    const fileString = e?.target?.result;
    // 接下来可对文件内容进行处理
    callback && callback(fileString);
  };
};

// XSS和转义符
export const XSS_encode_html = (str) => {
  return str
    ? str.replace(/[<">']/g, (a: string | number) => {
        return {
          "<": "&lt;",
          '"': "&quot;",
          ">": "&gt;",
          "'": "&#39;",
        }[a];
      })
    : "";
};

/**
 * 将图片转成base64压缩
 * @param file
 * @returns 图片对象
 */
export const getBase64 = (file) => {
  const { uid, name, lastModified, lastModifiedDate, fileType } = file;
  const reader = new FileReader();
  // 将文件读取为 DataURL
  reader.readAsDataURL(file);
  return new Promise<void>((resolve, reject) => {
    try {
      reader.onload = async () => {
        const compressedDataURL: any = await compress(
          reader.result as any,
          80,
          fileType
        );
        const compressedImageBlob: any = dataUrlToBlob(
          compressedDataURL,
          fileType
        );
        compressedImageBlob.uid = uid;
        compressedImageBlob.name = name;
        compressedImageBlob.lastModified = lastModified;
        compressedImageBlob.lastModifiedDate = lastModifiedDate;
        compressedImageBlob.fileType = fileType;
        resolve(compressedImageBlob);
      };
    } catch {
      reject();
    }
  });
};

/**
 * 处理base64数据，通过canvas(toDataURL)进行压缩绘制，然后输出压缩后的base64图片数据
 * @param base64 图片的base64编码
 * @param quality 图片质量 1-100，从低到高
 * @param mimeType 图片格式，默认为 image/png,可以是其他image/jpeg等
 * @returns 返回值是一个数据url，是base64组成的图片的源数据、可以直接赋值给图片的src属性
 */
export const compress = (
  base64: string,
  quality: number,
  mimeType: string | undefined
) => {
  let canvas = document.createElement("canvas");
  let img = document.createElement("img");
  // 是否开启cors,不开启使用canvas的toBlob()、toDataUrl()、getImageData()方法时会出现跨域问题。
  img.crossOrigin = "anonymous";
  return new Promise((resolve, reject) => {
    img.src = base64;
    img.onload = () => {
      let targetWidth, targetHeight;
      targetWidth = img.width;
      targetHeight = img.height;
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      let ctx = canvas.getContext("2d");
      ctx!.clearRect(0, 0, targetWidth, targetHeight); // 清除画布
      ctx!.drawImage(img, 0, 0, canvas.width, canvas.height);
      let imageData = canvas.toDataURL(mimeType, quality / 100);
      resolve(imageData);
    };
  });
};

/**
 * 将base64编码转成文件
 * @param base64
 * @param mimeType 文件类型
 * @returns 输出对应文件
 */
export const dataUrlToBlob = (base64: string, mimeType: string) => {
  let bytes = window.atob(base64.split(",")[1]);
  let ab = new ArrayBuffer(bytes.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeType });
};

/**
 * 自动生成id
 */
export const createUid = (prefix) => {
  const aurhorId = localGet("user")?.uid;
  return `${prefix}-${aurhorId}-${Date.now()}-${Math.random()
    .toString()
    .substring(2, 6)}`;
};
// 判断字符串是否包含Unicode字符
export const hasUnicode = (str: string) => {
  const unicodeRegexp = /\\u\{([0-9a-fA-F]+)\}/;
  return unicodeRegexp.test(str);
};

// 将字符串中Unicode字符转回原样
export const unicodeToEmoji = (str: string) => {
  return str.replace(/\\u\{([0-9a-fA-F]+)\}/g, (match, p1) =>
    String.fromCodePoint(parseInt(p1, 16))
  );
};

/**
 * 对树洞数据做处理
 * @param list
 * @returns
 */
export const changeTreeData = (list: any[]) => {
  const newList1: any[] = [];
  const newList2: any[] = [];
  const topList = list.filter((v) => v.isTop);
  const normalList = list.filter((v) => !v.isTop);

  topList.forEach((v) => {
    const ind = newList1.findIndex((v1) => v1.year === v.year);
    if (ind >= 0) {
      newList1[ind].children.push(v);
    } else {
      newList1.push({
        year: v.year,
        children: [v],
      });
    }
  });

  normalList.forEach((v) => {
    const ind = newList2.findIndex((v1) => v1.year === v.year);
    if (ind >= 0) {
      newList2[ind].children.push(v);
    } else {
      newList2.push({
        year: v.year,
        children: [v],
      });
    }
  });

  return [...newList1, ...newList2];
};

/**
 * 主题切换
 * @returns
 */
export const handleThemeChange = (event: { matches: any }) => {
  if (event.matches) {
    // console.log('light')
    document.documentElement.classList.remove("dark");
    return 2;
  } else {
    // console.log('dark')
    document.documentElement.classList.add("dark");
    return 1;
  }
};

/**
 * 生成随机颜色
 * @returns
 */
export const getRandomColor = (start = 76, end = 180) => {
  var r = Math.floor(Math.random() * start) + end; //随机生成0-155的整数
  var g = Math.floor(Math.random() * start) + end;
  var b = Math.floor(Math.random() * start) + end;
  //设定颜色范围：0~155
  return "rgb(" + r + "," + g + "," + b + ")";
};

/**
 * 读取歌词文件
 */
export const readLyricFile = async (url: string) => {
  return await fetch(url)
    .then((res) => res.text())
    .then((data) => {
      // 将文件内容按行拆分为数组
      const lines = data.split("\r");
      const lyrList = data.split("\r");
      // 使用正则表达式提取歌曲的元数据
      const metadata = {
        title: "",
        artist: "",
        album: "",
      };

      while (lines.length > 0) {
        // 退出条件
        if (!lines[0].startsWith("[")) break;

        if (Array.isArray(lines) && lines.length > 0) {
          // 解析元数据
          const match = /^\[(ti|ar|al):(.*)\]$/.exec(lines.shift() as any);
          if (match) {
            const [, key, value] = match;
            if (key === "ti") metadata.title = `歌曲名：${value}`;
            if (key === "ar") metadata.artist = `歌手：${value}`;
            if (key === "al") metadata.album = `专辑：${value}`;
          }
        }
      }
      // 解析每行歌词数据
      const parsedLyrics: any[] = [];

      lyrList.forEach((line) => {
        const timestampRegex = /\[(\d{2}):(\d{2}\.\d{2})\]/g;
        const matches = line.match(timestampRegex);
        // 单行歌词时间数组
        const timeList: number[] = [];
        matches?.forEach((v) => {
          const regex = /\[(\d{2}):(\d{2}\.\d{2})\]/;
          const match = regex.exec(v) as any;
          const timeInMs =
            parseFloat(match[1]) * 60 * 1000 + parseFloat(match[2]) * 1000;
          timeList.push(timeInMs);
        });
        if (timeList.length) {
          parsedLyrics.push({
            timeList,
            text: line.replace(timestampRegex, ""),
          });
        }
      });

      let newParsedLyrics: any[] = [];

      parsedLyrics.forEach((v) => {
        if (v.timeList.length) {
          newParsedLyrics = [
            ...newParsedLyrics,
            ...v.timeList.map((v1) => ({ time: v1, text: v.text })),
          ];
        } else {
          newParsedLyrics.push({
            time: "",
            text: v.text,
          });
        }
      });

      newParsedLyrics.sort((a, b) => a.time - b.time);

      return [
        ...Object.values(metadata).map((v) => ({ time: "", text: v })),
        ...newParsedLyrics,
      ];
    });
};

// 生成浏览器指纹
export const getFingerprint = async () => {
  const components = await Promise.all([Fingerprint2.getPromise()]);
  const fingerprint = Fingerprint2.x64hash128(
    components
      .flat(Infinity)
      .map((component: any) => component.value)
      .join(""),
    64
  );
  return fingerprint;
};

// 加密数据
export function encrypt(
  data: string,
  key = "fed94ab3abf9a6bfc43ab2e857956c11"
) {
  // 加密模式为aes-256-cbc
  const cipher = crypto.createCipher("aes-256-cbc", key);
  // 将加密结果转为Hex编码
  return cipher.update(data, "utf8", "hex") + cipher.final("hex");
}

// 分享网页
export const shareWebPage = (data: {
  url: string;
  text: string;
  title: string;
}) => {
  if (typeof window !== "undefined" && typeof navigator.share !== "undefined") {
    navigator.share(data);
  } else {
    console.log("该浏览器不支持");
  }
};

/**
 * 将对象转为字符串请求的参数
 * @param obj
 * @returns
 */
export function objectToQueryString(obj) {
  return Object.keys(obj)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join("&");
}
