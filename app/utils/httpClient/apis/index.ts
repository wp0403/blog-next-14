import blogApi from "./blog";
import secretApi from "./secret";
import userApi from "./user";
import photographyApi from "./photography";
import wallpaperApi from "./wallpaper";
import newsApi from "./news";

export default {
  ...blogApi,
  ...secretApi,
  ...userApi,
  ...photographyApi,
  ...wallpaperApi,
  ...newsApi,
};
