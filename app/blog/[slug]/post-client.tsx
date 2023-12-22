"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Pagination, Input, Spin } from "antd";
import { useDebounceFn, useGetState } from "ahooks";
import SysIcon from "@components/SysIcon";
import {
  addNavItemStyle,
  bindHandleScroll,
  removeNavItemStyle,
  removeScroll,
} from "@utils/elementUtils";
import { useRouter } from "next/navigation";
import { formatDate, hasUnicode, unicodeToEmoji } from "@utils/dataUtils";
import style from "../blog.module.css";

export default function BlogDetails({ post }) {
  const router = useRouter();
  const {
    data,
    totalPage,
    type = null,
    page,
    isType = false,
    classifyNum: { classifyNum },
  } = post;

  const [keyword, setKeyword, getKeyword] = useGetState<string>("");
  const [searchList, setSearchList] = useState<any[]>([]);
  const [searchTotal, setSearchTotal] = useState<number>(0);
  const [searchPage, setSearchPage, getSearchPage] = useGetState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const getDate = async () => {
    if (!keyword || loading) return;
    setLoading(true);
    const res = await fetch(
      `https://shimmer.wp-boke.work/api/getSearchClassifyList?page=${getSearchPage()}&keyword=${getKeyword()}`
      // `http://localhost:7001/getSearchClassifyList?page=${getSearchPage()}&keyword=${getKeyword()}`
    );
    const res1 = await fetch(
      `https://shimmer.wp-boke.work/api/getClassifyListPage?keyword=${getKeyword()}`
      // `http://localhost:7001/getClassifyListPage?keyword=${getKeyword()}`
    );

    const posts = await res.json();
    const posts1 = await res1.json();
    setSearchList(posts.data);
    setSearchPage(posts1.data);
    setLoading(false);
  };

  const { run } = useDebounceFn(
    () => {
      getDate();
    },
    {
      wait: 500,
    }
  );

  useEffect(() => {
    addNavItemStyle();
    bindHandleScroll();

    return () => {
      removeNavItemStyle();
      removeScroll();
    };
  }, []);

  // 渲染单项的样式
  const renderItem = (item) => {
    return (
      <div className={style.blog_item} key={item.id}>
        <div className={style.blog_item_content}>
          <Link
            className={style.blog_item_title}
            href={`/blog-details/${item.id}`}
          >
            {item.title}
          </Link>
          <div className={style.blog_item_desc}>{item.desc}</div>
          <div className={style.blog_item_footer}>
            <div className={style.blog_item_class}>
              <span>{item.classify}</span>
              <span className={style.blog_item_class_border}>|</span>
              <span>{item.classify_sub}</span>
            </div>
            <div className={style.blog_item_time}>
              {formatDate(item.time_str, "yyyy-MM-dd")}
            </div>
            <div className={style.blog_item_data}>
              <div className={style.blog_item_browse}>
                <SysIcon
                  className={style.blog_item_icon}
                  type="icon-yanjing-kai"
                />
                {item.views}
              </div>
              <div className={style.blog_item_follow}>
                <SysIcon className={style.blog_item_icon} type="icon-guanzhu" />
                {item.likes}
              </div>
            </div>
            <div className={style.blog_item_user}>
              {hasUnicode(item?.userInfo?.name)
                ? unicodeToEmoji(item?.userInfo?.name)
                : item?.userInfo?.name}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const changeKeyword = (e) => {
    setKeyword(e.target.value);
    setSearchTotal(0);
    setSearchPage(1);
    run();
  };

  const newData = keyword ? searchList : data;

  return (
    <div className={style.blog}>
      <div className={style.blog_con}>
        {/* <div className={style.blog_left}></div> */}
        <div className={style.blog_list}>
          <div className={style.blog_content}>
            <Spin spinning={loading}>
              {newData &&
                Boolean(newData?.length) &&
                newData?.map((v) => renderItem(v))}
              {(!newData || !newData?.length) && "暂无数据"}
            </Spin>
          </div>
          <div className={style.blog_Pagination}>
            <Pagination
              hideOnSinglePage
              showLessItems
              showSizeChanger={false}
              defaultCurrent={page}
              total={(keyword ? searchTotal : totalPage) * 10}
              onChange={(v) =>
                keyword
                  ? setSearchPage(v)
                  : router.push(
                      isType ? `/blog-type/${type}/${v}` : `/blog/${v}`
                    )
              }
            />
          </div>
        </div>
        <div className={style.blog_right}>
          <div className={style.blog_right_content}>
            <div className={style.blog_search}>
              <Input
                className={style.blog_search_input}
                placeholder="搜索博文"
                value={keyword}
                onChange={changeKeyword}
              />
            </div>
            <div className={style.blog_class}>
              <div className={style.blog_class_title}>文章分类</div>
              <div className={style.blog_class_content}>
                {classifyNum?.map((v) => (
                  <div
                    className={`${style.blog_class_item} ${
                      v.type == type && style.blog_class_item_active
                    }`}
                    key={v?.type}
                  >
                    <div
                      className={style.blog_class_item_name}
                      onClick={() => router.push(`/blog-type/${v?.type}/1`)}
                    >
                      {v?.label}
                    </div>
                    <div className={style.blog_class_item_num}>{v?.count}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
