// import getDataApi from "@/utils/httpClient/request";
import PostClient from "./post-client";

export const dynamicParams = false;

export default async function Page({ params }) {
  return <PostClient />;
}
