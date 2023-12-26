import { objectToQueryString } from "@utils/dataUtils";
import apis from "./apis";

const baseObj = {
  all: "https://shimmer.wp-boke.work/api",
  apiRender: "https://api-render.wp-boke.work",
};

type ApiKey = keyof typeof apis;

/**
 * 请求数据
 */
const getData = async ({
  type,
  params = null,
  config = { next: { revalidate: 3600 } },
}: {
  type: ApiKey;
  params?: { [key: string]: any } | null | undefined;
  config?: RequestInit | undefined;
}) => {
  const BASE_URL = baseObj[type.split("_")[0]];
  // 最终请求
  const res = await fetch(
    `${BASE_URL}${apis[type]}${
      params ? `?${objectToQueryString(params)}` : ""
    }`,
    config
  );
  const data = await res.json();
  return data;
};

export default getData;
