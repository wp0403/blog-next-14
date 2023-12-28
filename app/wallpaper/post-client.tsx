"use client";
import React, { useEffect, useState } from "react";
import { Image as AntImage, Spin } from "antd";
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
  const [loading, setLoading] = useState<boolean>(true);

  const getData = async () => {
    setLoading(true);
    const { data } = await getDataApi({
      type: "apiRender_picture_list360",
      params: { page_size: 30, type_id: currentType, page },
    });
    setPictureList(data.data);
    setTotal(data.meta.total);
    setLoading(false);
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
            onClick={() => {
              setCurrentType(item.id);
              setPage(1);
              setTotal(0);
            }}
          >
            {item.title}
          </div>
        ))}
      </div>
      <div
        className={loading ? styles.picture_box_loading : styles.picture_box}
      >
        {loading ? (
          <Spin size="large" />
        ) : (
          <AntImage.PreviewGroup>
            {pictureList?.map((item: any) => (
              <AntImage
                className={styles.picture_item}
                key={item.id}
                src={item.url}
                alt={item.tag}
                preview={{ maskClassName: styles.picture_item }}
                placeholder={true}
              />
            ))}
          </AntImage.PreviewGroup>
        )}
      </div>
      {Boolean(total) && (
        <div className={styles.pager_box}>
          <PagerComponent
            total={total}
            current={page}
            pageSize={30}
            onChange={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default PostClient;
