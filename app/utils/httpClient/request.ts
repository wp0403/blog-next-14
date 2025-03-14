import { objectToQueryString } from "@utils/dataUtils";
import apis from "./apis";

const baseObj = {
  all: "https://shimmer.wp-boke.work/api",
  apiRender: "https://api-render.wp-boke.work",
};

type ApiKey = keyof typeof apis;

const TIMEOUT_DURATION = 10000; // 10 seconds timeout

/**
 * 请求数据
 */
const getData = async ({
  type,
  params = null,
  config = { 
    next: { 
      revalidate: 3600 // Cache for 1 hour
    }
  },
}: {
  type: ApiKey;
  params?: { [key: string]: any } | null | undefined;
  config?: RequestInit | undefined;
}) => {
  try {
    const BASE_URL = baseObj[type.split("_")[0]];
    const queryString = params ? `?${objectToQueryString(params)}` : "";
    const url = `${BASE_URL}${apis[type]}${queryString}`;

    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_DURATION);

    const response = await fetch(url, {
      ...config,
      signal: controller.signal,
      headers: {
        ...config?.headers,
        'Content-Type': 'application/json',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error(`Request timeout after ${TIMEOUT_DURATION}ms`);
    }
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default getData;
