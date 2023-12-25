import { objectToQueryString } from "@utils/dataUtils";

const BASE_URL = "https://shimmer.wp-boke.work/api";
const TEST_BASE_URL = "http://7001";

const apiObj = {
  // 文章列表
  blog_List: "/getClassifyList",
  // 文章页码列表
  blog_PageList: "/getClassifyListPage",
  // 文章分类数量
  blog_ClassifyNum: "/getClassifyNum",
  // 获取文章详情
  blog_ClassifyDetail: "/getClassifyDetails",
  // 获取上一篇和下一篇
  blog_NextOrPrev: "/getClassifyDetailsFooter",
  // 关键字获取列表
  blog_KeyworkList: "/getSearchClassifyList",
  // 获取文归档列表
  archive_list: "/getArchive",
  // 获取友情链接列表
  friendly_Links: "/getFriendlyLinks",
  // 获取摄影列表
  photography_List: "/getPhotographyList",
  // 获取树洞列表
  secret_List: "/getSecretList",
  // 获取访客列表
  visitor_List: "/getVisitorList",
};

type ApiKey = keyof typeof apiObj;

/**
 * 请求数据
 */
const getData = async ({
  type,
  params = null,
  config = undefined,
}: {
  type: ApiKey;
  params?: { [key: string]: any } | null | undefined;
  config?: RequestInit | undefined;
}) => {
  const res = await fetch(
    `${BASE_URL}${apiObj[type]}${
      params ? `?${objectToQueryString(params)}` : ""
    }`,
    config
  );
  const data = await res.json();
  return data;
};

export default getData;
