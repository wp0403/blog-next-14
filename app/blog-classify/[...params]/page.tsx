import getData from "@/utils/httpClient/request";
import PostClient from "../../blog/[slug]/post-client";

export const dynamicParams = false;

// 动态路由
export async function generateStaticParams() {
  // 调用外部 API 获取内容
  const classifyNum = await getData({ type: "blog_ClassifyNum" });

  const arr = [] as any[];
  classifyNum.data?.classifyNum?.forEach((v) => {
    const totalPage = Math.ceil(v.count / 10);
    const pageList = [] as string[];
    for (let i = 1; i <= totalPage; i++) {
      pageList.push(i.toString());
    }
    pageList.forEach((v1) => {
      arr.push({ type: v.type, page: v1 });
    });
  });

  return arr.map((v) => [v.type, v.page]);
}

// 获取数据
async function getPost({ params }) {
  const [type, page] = params;
  // 获取页码
  const post1 = await getData({
    type: "blog_PageList",
    params: { id: type },
  });

  const pageList = [] as string[];
  for (let i = 1; i <= post1.data; i++) {
    pageList.push(i.toString());
  }
  // 调用外部 API 获取内容
  const posts2 = await getData({
    type: "blog_List",
    params: { id: type, page: page },
  });
  const classifyNum = await getData({ type: "blog_ClassifyNum" });

  return {
    page: page,
    totalPage: post1.data,
    pageList,
    type: type,
    classifyNum: classifyNum.data,
    isType: true,
    ...posts2,
  };
}

export default async function BlogList({ params }) {
  const post = await getPost(params);

  return <PostClient post={post} />;
}
