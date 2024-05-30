import { useEffect } from "react";
import { sessionSet, sessionGet } from "@utils/local";

const useChangeLoading = (props) => {
  useEffect(() => {
    const isCache = sessionGet(`${props.name}_cache`);

    // 模拟一个异步加载过程
    const timer = setTimeout(
      () => {
        props.onLoaded();
        sessionSet(`${props.name}_cache`, true);
      },
      isCache ? 1000 : 1500
    ); // 最少加载时间

    return () => clearTimeout(timer);
  }, []);

  return null;
};

export default useChangeLoading;
