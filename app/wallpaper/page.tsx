import React from "react";
import getDataApi from "@utils/httpClient/request";
import PostClient from "./post-client";

// 获取360壁纸类别
async function getType360() {
  const { data } = await getDataApi({ type: "apiRender_picture_type360" });

  return data;
}

const Wallpaper = async () => {
  const typeList = await getType360();

  return <PostClient typeList={typeList} />;
};

export default Wallpaper;
