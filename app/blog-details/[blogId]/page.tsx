import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import getData from "@utils/request";
import PostClient from "./post-client";

export const dynamicParams = false;

export async function generateStaticParams() {
  // 调用外部 API 获取内容
  const res = await getData({ type: "blog_List" });

  return res.data.map(({ id }) => ({ blogId: id.toString() }));
}

async function getPost(params) {
  return await getData({
    type: "blog_ClassifyDetail",
    params: { id: params.blogId },
  });
}

export default async function BlogDetails({ params }) {
  const { data = {} } = await getPost(params);

  const source = await serialize(data.content, {
    scope: {},
    mdxOptions: {
      development: true,
      remarkPlugins: [remarkMath, remarkGfm],
      rehypePlugins: [],
    },
  });
  return <PostClient data={data} source={source} />;
}
