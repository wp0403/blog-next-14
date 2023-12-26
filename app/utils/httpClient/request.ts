import { objectToQueryString } from "@utils/dataUtils";
import apis from "./apis";

const BASE_URL = "https://shimmer.wp-boke.work/api";
const TEST_BASE_URL = "http://7001";

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
