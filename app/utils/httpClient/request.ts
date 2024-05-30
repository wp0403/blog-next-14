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
}: // config = { cache: "force-cache" },
{
  type: ApiKey;
  params?: { [key: string]: any } | null | undefined;
  config?: RequestInit | undefined;
}) => {
  try {
    const BASE_URL = baseObj[type.split("_")[0]];
    const queryString = params ? `?${objectToQueryString(params)}` : "";
    const url = `${BASE_URL}${apis[type]}${queryString}`;
    const response = await fetch(url, config);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // re-throw the error to propagate it to the caller
  }
};

export default getData;
