import fs from "fs";
import RSS from "rss";

export async function GET(req: Request, res: Response) {
  const feed = new RSS({
    title: "Shimmer RSS",
    description: "shimmer博客的rss",
    feed_url: "https://wp-boke.work/rss.xml",
    site_url: "https://wp-boke.work",
    language: "zh-CN",
    pubDate: new Date(),
  });

  // 调用外部 API 获取内容
  const classifyObj = await fetch(
    `https://shimmer.wp-boke.work/api/getClassifyList?page=`
  );
  const classifyList = (await classifyObj.json()).data;

  classifyList?.map((v) => {
    feed.item({
      title: v.title,
      description: v.desc,
      url: `https://wp-boke.work/blog-details/${v.id}`,
      author: v.userInfo?.name,
      date: v.time_str,
    });
  });

  const rssContent = feed.xml();

  const serverName = process.env.SERVER_NAME;
  if (serverName !== "vercel") {
    const sitemapPath = "./public/rss.xml";
    fs.writeFileSync(sitemapPath, rssContent);
  }

  // Write the XML to the response
  let myResponse = new Response(rssContent, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=0.1, must-revalidate",
    },
  });

  return myResponse;
}
