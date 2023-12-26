import blogApi from "./blog";
import secretApi from "./secret";
import userApi from "./user";

export default {
  ...blogApi,
  ...secretApi,
  ...userApi,
};
