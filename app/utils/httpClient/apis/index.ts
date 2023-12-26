import blogApi from "./blog";
import secretApi from "./secret";
import userApi from "./user";
import photography from "./photography";
import wallpaper from "./wallpaper";

export default {
  ...blogApi,
  ...secretApi,
  ...userApi,
  ...photography,
  ...wallpaper,
};
