"use client";
import React, { useContext, useEffect, useState } from "react";
import { useDebounceEffect, useGetState, useMount } from "ahooks";
import { Spin } from "antd";
import { LayoutContext } from "@/store/layoutStore";
import {
  addNavItemStyle,
  bindHandleScroll,
  removeNavItemStyle,
  removeScroll,
  routeChangeComplete,
} from "@/utils/elementUtils";
import { formatDate } from "@/utils/dataUtils";
import { getRandomColor } from "@utils/dataUtils";
import getDataApi from "@/utils/httpClient/request";
import PagerComponent from "@components/PagerComponent";
import withLoading from "@components/WithLoading";
import useChangeLoading from "@components/WithLoading/useChangeLoading";
import style from "./visitor.module.css";

const Visitor = (props) => {
  const { theme } = useContext(LayoutContext);
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage, getPage] = useGetState<number>(1);
  const [total, setTotal] = useState<number>(0);

  const getData = async () => {
    setLoading(true);
    const posts = await getDataApi({
      type: "all_user_visitor_List",
      params: { page: getPage() },
    });

    setList(posts.data);
    setTotal(posts.meta.total);
    setLoading(false);
  };

  useMount(() => {
    getData();
  });

  // 获取列表数据
  useDebounceEffect(
    () => {
      getData();
    },
    [page],
    {
      wait: 800,
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

  useChangeLoading({ ...props, name: "visitor" });

  return (
    <div className={`${style.visitor} ${props.loading && "all-page-loading"}`}>
      <div className={style.title}>访客列表</div>
      <div className={style.content}>
        <Spin spinning={loading}>
          {list?.map((v: any) => (
            <div
              key={v.id}
              className={style.item}
              style={{
                backgroundColor:
                  theme === 2
                    ? getRandomColor(36, 220)
                    : getRandomColor(30, 30),
              }}
            >
              <div className={style.item_header}>
                <div className={style.item_time}>
                  {formatDate(v.last_visited_time, "yyyy.MM.dd HH:mm")}
                </div>
                <div className={style.item_ip}>IP：{v.visitor_ip}</div>
              </div>
              <div className={style.item_content}>
                <div className={style.item_con_item}>来访次数：{v.visits}</div>
                <div className={style.item_con_item}>
                  首次来访时间：{formatDate(v.create_time, "yyyy.MM.dd HH:mm")}
                </div>
                <div className={style.item_con_item}>
                  设备类型：{v.device_type}
                </div>
                <div className={style.item_con_item}>设备名称：{v.os_name}</div>
                <div className={style.item_con_item}>
                  设备版本：{v.os_version}
                </div>
              </div>
            </div>
          ))}
        </Spin>
      </div>
      {Boolean(total) && (
        <div className={style.pagination}>
          <PagerComponent
            total={total}
            pageSize={15}
            current={page}
            onChange={(v) => {
              setPage(v);
              routeChangeComplete();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default withLoading(Visitor);
