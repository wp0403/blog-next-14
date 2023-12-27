"use client";
import React, { useEffect, useState } from "react";
import { Image as AntImage, Pagination } from "antd";
import {
  addNavItemStyle,
  bindHandleScroll,
  removeNavItemStyle,
  removeScroll,
} from "@utils/elementUtils";
import getDataApi from "@utils/httpClient/request";
import PagerComponent from "@components/PagerComponent";
import styles from "./wallpaper.module.css";

const PostClient = (props) => {
  const { typeList } = props;
  const [pictureList, setPictureList] = useState([]);
  const [currentType, setCurrentType] = useState<string | number>(
    typeList[0].id
  );
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  const getData = async () => {
    const { data } = await getDataApi({
      type: "apiRender_picture_list360",
      params: { page_size: 30, type_id: currentType, page },
    });
    setPictureList(data.data);
    setTotal(data.meta.total);
  };

  useEffect(() => {
    getData();
  }, [currentType, page]);

  useEffect(() => {
    addNavItemStyle();
    bindHandleScroll();

    return () => {
      removeNavItemStyle();
      removeScroll();
    };
  }, []);

  return (
    <div className={styles.wallpaper}>
      <div className={styles.type_box}>
        {typeList?.map((item) => (
          <div
            className={`${styles.type_item} ${
              item.id === currentType ? styles.type_item_active : ""
            }`}
            key={item.id}
            onClick={() => setCurrentType(item.id)}
          >
            {item.title}
          </div>
        ))}
      </div>
      <div className={styles.picture_box}>
        <AntImage.PreviewGroup>
          {pictureList?.map((item: any) => (
            <AntImage
              className={styles.picture_item}
              key={item.id}
              src={item.url}
              alt={item.tag}
              preview={{ maskClassName: styles.picture_item }}
              placeholder={true}
              fallback=""
            />
          ))}
        </AntImage.PreviewGroup>
      </div>
      <div className={styles.pager_box}>
        <PagerComponent
          total={total}
          current={page}
          pageSize={30}
          onChange={setPage}
        />
      </div>
    </div>
  );
};

export default PostClient;
