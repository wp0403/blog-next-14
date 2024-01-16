import PostClient from "./post-client";
import styles from "./archive.module.css";

export default async function Archive() {
  return <PostClient styles={styles} />;
}
